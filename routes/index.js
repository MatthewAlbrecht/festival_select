const express = require('express');
let router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const festPath = path.join(__dirname, '../festivals.json')
const artistPath = path.join(__dirname, '../artists.json')
const database = require('../knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Festival Select'
  });
})

router.get('/db/:table', (req, res, next) => {
  let tableName = req.params.table
  database(tableName).select().orderBy('id', 'desc')
    .then(function(table) {
      res.status(200).json(table);
    })
    .catch(function(error) {
      console.error('somethings wrong with db')
    });
})

router.post('/reset', (req, res, next) => {
  fs.readFile(artistPath, 'utf8', (err, data) => {
    if (err) throw error;
    let bigAssArtistArray = JSON.parse(data)
    createAritstAndAAFTables(bigAssArtistArray, res, req)
  })
})

const createFestivalObject = (festivalArray) => {
  let festCheckID = {}
  for (festivalObj of festivalArray) {
    festCheckID[festivalObj.name] = festivalObj.id
  }
  return festCheckID
}

const updateArtistsTable = (artistObj) => {
  // console.log('in updateArtistsTable');
  return database('artists').returning('id').insert({
    name: artistObj.name
  })
}

const updateFestivalsTable = (festival) => {
  return database('festivals').returning('id').insert({
    name: festival.toLowerCase()
  })
}

const updateArtistAtFestivalsTable = (festival, id, festCheckID) => {
  id = JSON.parse(JSON.stringify(id))[0]
  return database('artist_at_festivals').returning('id').insert({
    artist_id: id,
    festival_id: festCheckID[festival]
  })
}

const getFestivalsTable = () => {
  return database('festivals').select()
}

const createAritstAndAAFTables = (bigAssArtistArray, res, req) => {
  let gimmiePromises = {
    promises: [],
    festivals: []
  }
  let festCheckID = []

  getFestivalsTable()
    .then((festivals) => {
      festCheckID = createFestivalObject(JSON.parse(JSON.stringify(festivals)))
      for (let i = 0; i < bigAssArtistArray.length; i++) {
        let artistToPlayWith = bigAssArtistArray[i]
        // console.log('Im here----------------', i);
        gimmiePromises.promises.push(updateArtistsTable(artistToPlayWith))
        gimmiePromises.festivals.push(artistToPlayWith.festivals)
      }
      return (gimmiePromises)

    })
    .then((theePromises) => {
      // console.log(theePromises.length);
      Promise.all(theePromises.promises)
        .then((results) => {

          console.log(results);
          let gimmmieMorePromises = [];
          for (let i = 0; i < results.length; i++) {
            let id = results[i]
            for (festival of gimmiePromises.festivals[i]) {
              gimmmieMorePromises.push(updateArtistAtFestivalsTable(festival, id, festCheckID, req, res))
            }
          }
          Promise.all(gimmmieMorePromises)
            .then((results) => {
              console.log('happyness', results);
            })


        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500)
        })



    })
  // console.log(gimmiePromises.length);

}
module.exports = router;
