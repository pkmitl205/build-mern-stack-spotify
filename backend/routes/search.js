const express = require('express');
const {
  searchSong,
  searchPlaylist,
  searchArtist
} = require('../controllers/search');

const router = express.Router();

router.get('/song', searchSong);
router.get('/playlist', searchPlaylist);
router.get('/artist', searchArtist);

module.exports = router;