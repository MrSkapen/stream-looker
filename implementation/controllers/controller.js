const db = require("../models");
const dbConfig = require("../config/db.config.js");
const Tutorial = db.tutorials;
const axios = require('axios').default;

exports.hello = (req, res) => {
    res.status(200).send({
        message: "SIEMA"
    });
};

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


