const express = require('express');
let router = express.Router();

const bodyParser = require('body-parser');



const database = require('../knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  let array
  database('festivals').select()
    .then((data) => {
      res.render('lineup', {
        festivals: data
      })
    })
  console.log(array);

})

router.get('/:id', (req, res, next) => {
  console.log('got here');
  let fest = req.params.id
  let result = undefined;
  database('artist_at_festivals')
    .where('festivals.id', fest)
    .innerJoin('festivals', 'festivals.id', 'artist_at_festivals.festival_id')
    .innerJoin('artists', 'artist_at_festivals.artist_id', 'artists.id').select('artists.name', 'artists.id')
    .orderBy('artist_at_festivals.id')
    .then((q) => {
      res.json(q)
    })

})
module.exports = router;
