const express = require('express');
const { body } = require('express-validator');
const feedcontroler = require('../controler/feed')
const router = express.Router()
router.get('/posts', feedcontroler.getPosts)
router.post(
    '/post',
    [
        body('name')
            .trim()
            .isLength({ min: 4 }),
        body('acno')
            .trim()
            .isLength(12),
        body('phoneno')
            .trim()
            .isLength(10),
        body('initialbalance')
            .trim()
            .isLength(3)
    ],
    feedcontroler.createPost
)
router.get('/post', feedcontroler.getPost)
router.put('/post/:postId', [
    body('name')
        .trim()
        .isLength({ min: 1 }),
    body('acno')
        .trim()
        .isLength(12),
    body('phoneno')
        .trim()
        .isLength(10),
    body('initialbalance')
        .trim()
        .isLength(3)

], feedcontroler.updatePost)
router.delete('/post/:postId', feedcontroler.deletePost)

module.exports = router;

exports.router = router;