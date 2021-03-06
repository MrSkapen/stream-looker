const db = require("../models");
const dbConfig = require("../config/db.config.js");
const e = require("express");
let {details} = require("./controller");
const Tutorial = db.tutorials;
const axios = require('axios').default;

exports.find = (req, res) => {
    const id = req.params.id;
    // const query = ({Title: id});
    Tutorial.find({Title: id})
        .then(async data => {
            if (!data)
                res.status(404).send({message: "Not found Tutorial with id " + id});
            else {
                let resultMe = [];
                for (const e of data) {
                    let ID = e.WatchmodeID
                    let url = 'https://api.watchmode.com/v1/title/' + ID + "/sources/?apiKey=" + dbConfig.key;
                    await axios.get(url)
                        .then(function (response) {
                            // resultMe.push(JSON.stringify(response.data));
                            resultMe.push((response.data));
                        })
                }
                resultMe.forEach((val) => {
                    console.log(val);
                })
                res.send(resultMe);
            }
        })
};

exports.suggestions = (req, res) => {

    let query = {};

    if (req.params.searchPhrase !== undefined) {
        query = {
            Title: new RegExp(req.params.searchPhrase, 'i')
        };
    }

    Tutorial.find(query, function (err, data) {
        if (err) {
            res.status(404).send({ error: true, message: "Error fetching data" });
        } else {
            res.status(200).send({ result: data });
        }
    });
};

exports.details = (req, res) => {

    const watchmodeId = req.params.watchmodeId;
    let watchmodeUrl = 'https://api.watchmode.com/v1/title/' + watchmodeId + '/details/?apiKey=' + dbConfig.key;

    const getDetails = async (url) => {
        try {
            return await axios.get(url)
        } catch (error) {
            console.error(error)
        }
    }

    getDetails(watchmodeUrl).then( result => {

        let promises = [];

        if (result && result.data && result.data.similar_titles) {
            result.data.similar_titles.forEach(similarTitleId => {
                let similarTitleUrl = 'https://api.watchmode.com/v1/title/' + similarTitleId + '/details/?apiKey=' + dbConfig.key;
                promises.push(getDetails(similarTitleUrl));
            })

            if (promises.length) {
                Promise.allSettled(promises).then(settledPromises => {
                    let similarTitles = [];

                    settledPromises.forEach(settledPromise => {
                        if (settledPromise && settledPromise.value && settledPromise.data) {
                            similarTitles.push(settledPromise.value.data);
                        }
                    })

                    result.data.similar_titles = similarTitles;
                    res.status(200).send(result.data);
                })
            } else {
                result.data.similar_titles = [];
                res.status(200).send(result.data);
            }
        } else if (result && result.data) {
            result.data.similar_titles = [];
            res.status(200).send(result.data);
        } else {
            res.status(200).send({error: true, message: "Error requesting data from API"})
        }
    })
};