const express = require('express');
const {
  getAllPlaylists,
  createPlaylist,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSong,
  removeSong,
  likePlaylist,
  dislikePlaylist,
  uploadPlaylistImg,
  resizePlaylistImg
} = require('../controllers/playlist');

const { protect } = require('../controllers/auth');

const router = express.Router({ mergeParams: true });

// Playlist routes
router.get('/', protect, getAllPlaylists);
router.post('/', protect, createPlaylist);

router.get('/:id', protect, getPlaylist);
router.patch('/:id', protect, uploadPlaylistImg, resizePlaylistImg, updatePlaylist);
router.delete('/:id', protect, deletePlaylist);

// Song in playlist routes
router.post('/:id/song/:songId', protect, addSong);
router.delete('/:id/song/:songId', protect, removeSong);

// Playlist likes/dislikes
router.post('/likes/add', protect, likePlaylist);
router.post('/likes/remove', protect, dislikePlaylist);

module.exports = router;