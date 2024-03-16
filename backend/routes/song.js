const express = require('express');
const {
  getAllSongs,
  getSong,
  createSong,
  updateSong,
  deleteSong,
  uploadSongFiles,
  resizeSongImg,
  renameSongFile,
} = require('../controllers/song');

const { protect, restrictTo } = require('../controllers/auth');

const router = express.Router();

router.route('/').get(protect, getAllSongs);

router
  .route('/')
  .post(
    protect,
    restrictTo('artist'),
    uploadSongFiles,
    resizeSongImg,
    renameSongFile,
    createSong,
  );

router.route('/:id').get(protect, getSong);

router
  .route('/:id')
  .patch(
    protect,
    restrictTo('/artist'),
    uploadSongFiles,
    resizeSongImg,
    updateSong,
  );

router.route('/:id').delete(protect, restrictTo('artist', 'admin'), deleteSong);

module.exports = router;
