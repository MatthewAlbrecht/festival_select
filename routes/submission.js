var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const database = require('../knex')
let artistArray = undefined;
let ids = []
let festID = undefined

router.get('/', function(req, res, next) {
  res.render('submission', {
    title: 'Submit New Festival'
  });
});

router.post('/', (req, res, next) => {
  let name = req.body.fest_name
  artistArray = req.body.artist_names.split(', ')
  validateSubmisson(req, res, artistArray, name)
  res.render('added', {
    title: `SUCCESSFULLY ADDED ${name.toUpperCase()}`
  })
})


let validateSubmisson = (req, res, artistArray, name) => {
  if (!artistArray || !name || artistArray.length < 15) {
    console.log('going wrong in first');
    res.sendStatus(400)
  }
  console.log('----------------------------');
  database('festivals').where('name', name.toLowerCase()).select()
    .then((results) => {
      if (results.length) {
        console.log('going wrong in second');
        res.sendStatus(400)
      } else {
        addFestival(name)
          .then(handleArtists)
      }
    })
}

const handleArtists = (results) => {
  festID = results[0]
  let pArray = []
  let count = 0
  let numOfArtists = artistArray.length
  pArray = artistArray.map(artist => [checkArtist(artist), artist]).map((artistPromise) => {

    artistPromise[0]
      .then(res => {
        if (!res.length) {
          addArtist(artistPromise[1])
            .then((id) => {
              addAAF(festID, id[0])
                .then((rez) => {
                  count++
                })
            })

        } else {
          ids.push(res[0].id);
          addAAF(festID, res[0].id)
            .then((rez) => {
              count++
            })
        }
      })
  })
}
const addFestival = (name) => database('festivals').returning('id').insert({
  'name': name.toLowerCase()
})

const addAAF = (fest, artist) => database('artist_at_festivals').insert({
  artist_id: artist,
  festival_id: fest
})
const addArtist = (artist) => database('artists').returning('id').insert({
  name: artist.toLowerCase()
})
const checkArtist = (artist) =>
  database('artists').where('name', artist.toLowerCase()).select()

module.exports = router;
