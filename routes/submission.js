var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const database = require('../knex')
let artistArray = undefined;
let ids = []
let festID = undefined
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('submission', {
    title: 'Submit New Festival'
  });
});

router.post('/', (req, res, next) => {
  // console.log('heehe');
  let name = req.body.fest_name
  artistArray = req.body.artist_names.split(', ')
  // console.log(typeof artistArray);
  validateSubmisson(req, res, artistArray, name)
  addFestival(name)
    .then(handleArtists)
})


let validateSubmisson = (req, res, artistArray, name) => {
  if (!artistArray || !name || artistArray.length < 15) {
    res.sendStatus(400)
  }
  console.log('----------------------------');
  database('festivals').where('name', name.toLowerCase()).select()
    .then((results) => {
      if (results) {
        // console.log(results);
        res.sendStatus(400)
      }
    })
}


const addFestival = (name) => database('festivals').returning('id').insert({
  'name': name.toLowerCase()
})

const handleArtists = (results) => {
  festID = results[0]
  let pArray = []

  pArray = artistArray.map(artist => [checkArtist(artist), artist]).map((artistPromise) => {
    // console.log('FFFFFFFFFFFFFFFFFF', artistPromise[0]);

    artistPromise[0]
      .then(res => {
        // console.log('---------------------', typeof res, res, res === []);
        if (!res.length) {
          // console.log('eeeeeeeeeeeeeeeee');
          addArtist(artistPromise[1])
            .then((id) => {
              ids.push(id[0]);
              // console.log('gimmieID-LATER', id[0]);
            })
            .then(handleAAF)
            .then((data) => {
              Promise.all(data)
                .then(data => {

                })
            })
        } else {
          ids.push(res[0].id);
          // console.log('gimmieID-NOW', res[0].id);
        }
      })
  })




}
// console.log(artistArray);
let count = 0
const handleAAF = (data) => {
  count++

  console.log('iv been heer ' + count + ' manytimes');
  console.log(count, '----------------', ids.length);
  // console.log('fest', festID, 'artist', ids);
  let somePromises = []
  for (anID of ids) {
    // console.log('-------THIS IS ANID FESTID-------[]', anID, festID);
    somePromises.push(addAAF(festID, anID))
  }
  // return somePromises

}
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
