const axios = require('axios');
const Dev = require('./../models/dev');
const parseStringAsArray = require('./../utils/parseStringAsArray');

module.exports = {
    index(req, res) {
        console.log(req.query);
        const { lat, lon, techs } = req.query;
        const techsArray = parseStringAsArray(techs);
        Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [lon, lat],
                    },
                    $maxDistance: 10000,
                }
            }
        }).then(result => {
            res.json({result});
        }).catch(error => {
            res.json(error);
        });
    }
}