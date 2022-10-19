
const { validationResult } = require('express-validator')
const Post = require('../models/transaction')
const { default: mongoose } = require('mongoose')
const post = require('../models/post')

exports.creditbalance = (req, res, next) => {
    const postId = req.body.postId
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('validation failed, entered data is incorrect.')
        error.statusCode = 200;
        throw error;

    }
    const accountholdername = req.body.accountholdername;
    const acno = req.body.acno;
    const amount = req.body.amount;
    const type = req.body.type;
    const post = new Post({
        accountholdername: accountholdername,
        acno: acno,
        amount: amount,
        type: type,
    })
    post.save();
    if (req.file) {
        accountholdername = req.file.path;
        acno = req.file.path;
        amount = req.file.path;
        type = req.file.path;
    }
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error("could not find Account.")
                error.statusCode = 404;
                throw error;
            }

            post.accountholdername = accountholdername;
            post.acno = acno;
            post.amount = initialbalance + amount;
            post.type = type;
            return post.save();
        })
        .then(result => {
            res.status(200).json({ message: `Amount ${amount} credited successfully.`, post: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    exports.debit = (req, res, next) => {
        const postId = req.body.postId;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new Error('validation failed, entered data is incorrect.')
            error.statusCode = 200;
            throw error;

        }
        const accountholdername = req.body.accountholdername;
        const acno = req.body.acno;
        const amount = req.body.amount;
        const type = req.body.type;
        const post = new Post({
            accountholdername: accountholdername,
            acno: acno,
            amount: amount,
            type: type,
        })
        post.save();
        if (req.file) {
            accountholdername = req.file.path;
            acno = req.file.path;
            amount = req.file.path;
            type = req.file.path;
        }
        Post.findById(postId)
            .then(post => {
                if (!post) {
                    const error = new Error("could not find Account.")
                    error.statusCode = 404;
                    throw error;
                }

                post.accountholdername = accountholdername;
                post.acno = acno;
                post.amount = initialbalance - amount;
                post.type = type;
                return post.save();
            })
            .then(result => {
                res.status(200).json({ message: `Amount ${amount} Debited successfully.`, post: result })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            })
    }
}
exports.getbalance = (req, res, next) => {
    const postId = req.params.postId;
    const amount = req.params.amount;
    Post.findById(postId)
        .then(post => {
            
            res.status(200).json({ message: `current balance is ${amount}`, post: post })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}