const db = require("../models");
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
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Tutorial with id " + id});
            else {
                let resultMe = [];
                data.forEach(async function (e) {
                    let ID = e.WatchmodeID
                    let url = 'https://api.watchmode.com/v1/title/' + ID + '';
                    await axios.get(url)
                        .then(function (response) {
                            console.log(response);
                            resultMe.push(response);
                        })
                })
                res.send(JSON.stringify(resultMe));
            }
        })
};


