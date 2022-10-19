const express = require('express');
const { body } = require('express-validator');
const transactioncontroler = require('../controler/transaction')
const p=require("../controler/feed")
const router = express.Router()

router.put('/credit/:postId', function (req, res) {
    [
        body('accountholdername')
            .trim()
            .isLength({ min: 0 }),
        body('amount')
            .trim()
            .isLength({ min: 3 }),
        body('acno')
            .trim()
            .isLength(12),
        body('type')
            .trim()
            .isLength({ min: 4 })
    ],
        transactioncontroler.credit
})
router.put('/debit/:postId', function (req, res) {
    [
        body('accountholdername')
            .trim()
            .isLength({ min: 0 }),
        body('amount')
            .trim()
            .isLength({ min: 3 }),
        body('acno')
            .trim()
            .isLength(12),
        body('type')
            .trim()
            .isLength({ min: 4 })
    ],
        transactioncontroler.debit
})
router.get('/balance/:postId', transactioncontroler.getbalance)

module.exports = router;

