const axios = require('axios');
const Dev = require('./../models/dev');
const parseStringAsArray = require('./../utils/parseStringAsArray');

module.exports = {
    index(req, res) {
        Dev.find().then(result => {
            res.json(result);
        });
    },

    store(req, res) {
        const { github_username, techs, lat, lon } = req.body;

        Dev.findOne({github_username}).then(result => {
            console.log(result)
            if (!result) {
                axios.get(`https://api.github.com/users/${github_username}`).then((response => {
                    const { name = login, avatar_url, bio } = response.data;
                    const techsArray = parseStringAsArray(techs);
                    const location = {
                        type: 'Point',
                        coordinates: [lon, lat]
                    }
        
                    Dev.create({
                        github_username,
                        name,
                        avatar_url,
                        bio,
                        techs: techsArray,
                        location
                    }).then(dev => {
                        res.json(dev);
                    });
                }));
            } else {
                res.json(result);
            }
        });

    }
}