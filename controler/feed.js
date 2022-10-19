
const { validationResult } = require('express-validator')

const Post = require('../models/post')
const { default: mongoose } = require('mongoose')
const post = require('../models/post')

exports.getPosts = (req, res, next) => {
    Post.find().then(posts => {
        res.status(200).json({ message: "posts fetched successfully.", posts: posts })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
    // dummy data
    // res.status(200).json({
    //     post:[
    //         {
    //         _id:new Date().toISOString(),
    //         name:"name",
    //         acno:"acno",
    //         phoneno:"phoneno",
    //         creator:{name:'praveen' },
    //         createdAt:new Date()
    //         }
    //     ]
    //     //posts:[{title:'first post',content:'this is the first post!'}]
    // })

}
exports.createPost = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('validation failed, entered data is incorrect.')
        error.statusCode = 200;
        throw error;

    }
    const name = req.body.name;
    const acno = req.body.acno;
    const phoneno = req.body.phoneno;
    const initialbalance = req.body.initialbalance;
    const post = new Post({
        name: name,
        acno: acno,
        phoneno: phoneno,
        initialbalance: initialbalance,
        creator: { name: 'praveen' },
    })
    post.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Account created successufully",
                account: result
            })
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}
exports.getPost = (req, res, next) => {
    //const postId = req.params.postId;
    Post.find()
        .then(post => {
            // if (!post) {
            //     const error = new Error("could not find post.")
            //     error.statusCode = 404;
            //     throw error;
            // }
            res.status(200).json({ message: "Account fetched successfully.", post: post })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('validation failed, entered data is incorrect.')
        error.statusCode = 200;
        throw error;

    }
    const name = req.body.name;
    const acno = req.body.acno;
    const phoneno = req.body.phoneno;
    const initialbalance = req.body.initialbalance;
    if (req.file) {
        name = req.file.path;
        acno = req.file.path;
        phoneno = req.file.path;
        initialbalance = req.file.path;
    }
    if (!name) {
        const error = new Error("name is not updated")
        error.statusCode = 422;
        throw error;
    }
    if (!acno) {
        const error = new Error("acno is not updated")
        error.statusCode = 422;
        throw error;
    }
    if (!phoneno) {
        const error = new Error("phoneno is not updated")
        error.statusCode = 422;
        throw error;
    }
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error("could not find Account.")
                error.statusCode = 404;
                throw error;
            }

            post.name = name;
            post.acno = acno;
            post.phoneno = phoneno;
            post.initialbalance = initialbalance;
            return post.save();
        })
        .then(result => {
            res.status(200).json({ message: "Account updated successfully.", post: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findByIdAndDelete(postId)
        .then(post => {
            if (!post) {
                const error = new Error("could not delete Account.")
                error.statusCode = 404;
                throw error;
            }
            //check loged in users
            // clearpost(post.name)
            // return Post.findByIdAndRemove(postId)
        })
        .then(result => {
            console.log(result)
            res.status(200).json({ message: "Account deleted successfully." })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
