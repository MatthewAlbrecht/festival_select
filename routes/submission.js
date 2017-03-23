var express = require('express');
var router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const festPath = path.join(__dirname, '../festivals.json')
const artistPath = path.join(__dirname, '../artists.json')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('submission', {
    title: 'Submit New Festival'
  });
});
fs.readFile(festPath, 'utf8', (err, festsJSON) => {
  if (err) throw error;
  let fests = JSON.parse(festsJSON)

  router.post('/', (req, res, next) => {

    let artistArray = req.body.artist_names.split(', ')
    let name = req.body.fest_name
    if (!artistArray || !name || artistArray.length < 15) {
      res.sendStatus(400)
    }
    for (fest of fests) {
      if (fest.name == name) {
        res.sendStatus(400)
      }
    }
    let newFest = {
      "name": name,
      "artists": artistArray
    }

    fests.push(newFest)
    fs.writeFile(festPath, JSON.stringify(fests), (err) => {
      if (err) throw error;
    })

    fs.readFile(artistPath, 'utf8', (err, artistJSON) => {
      if (err) throw error;
      let artists = JSON.parse(artistJSON)

      for (artistFromSbumission of artistArray) {
        let artistExists = false
        for (artist of artists) {
          if (artistFromSbumission.toLowerCase() === artist.name.toLowerCase()) {
            console.log('artist is old', artist.name);
            artistExists = true
            artist.festivals.push(newFest.name.toLowerCase())
          }

        }
        if (!artistExists) {
          console.log('artist is new', artistFromSbumission);
          let newArtistObj = {
            name: artistFromSbumission.toLowerCase(),
            festivals: [],
            spotify_uri: ''
          }
          newArtistObj.festivals.push(newFest.name.toLowerCase())
          artists.push(newArtistObj)
        }
      }
      fs.writeFile(artistPath, JSON.stringify(artists), (err) => {
        if (err) throw error;
      })


    })
    res.render('added', {
      title: 'Added ' + newFest.name + ' Successfully'
    })
  })

})
module.exports = router;
