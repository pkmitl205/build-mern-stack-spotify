const express = require('express');
const {
  signUp,
  login,
  isLoggedIn,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  deleteMe,
} = require('../controllers/auth');

const {
  uploadPhoto,
  resizeUserImg,
  updateMe,
  getArtist,
  followArtist,
  unfollowArtist,
  becomeArtist,
  likeSong,
  dislikeSong,
} = require('../controllers/user');

const { protect } = require('../controllers/auth');

const router = express.Router();

// Authentication
router.post('/signup', signUp);
router.post('/login', login);
router.get('/isLoggedIn', isLoggedIn);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:resetToken', resetPassword);

// User profile
router.patch('/updatePassword', protect, updatePassword);
router.patch('/updateMe', protect, uploadPhoto, resizeUserImg, updateMe);
router.delete('/deleteMe', protect, deleteMe);

// Artist
router.get('/:id', protect, getArtist);
router.post('/follow/:id', protect, followArtist);
router.post('/unfollow/:id', protect, unfollowArtist);
router.patch('/becomeArtist', protect, becomeArtist);

// Likes
router.post('/likes/add', protect, likeSong);
router.post('/likes/remove', protect, dislikeSong);

module.exports = router;
