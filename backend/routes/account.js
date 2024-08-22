// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account, User } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    console.log("hi there from balance")
    const account = await Account.findOne({
        userId: req.userId
    });
    console.log(account.userId)
    res.json({
        balance: account.balance
    })
});


router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);
    const fromuser = await User.findOne({ _id: req.userId }).session(session);
   const fromusername = fromuser.firstName+''+fromuser.lastName
   const touser = await User.findOne({ _id: to }).session(session);
   const tousername= touser.firstName+' '+touser.lastName
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } , $push: {
        transactions: {
          userId: to,
          username:tousername,
          transaction: -amount, // Negative to indicate debit
          date: new Date()
        }
      }}).session(session);
    await Account.updateOne({ userId: to }, {  $inc: { balance: amount } , $push: {
        transactions: {
          userId: req.userId,
          username:fromusername,
          transaction: amount, // Negative to indicate debit
          date: new Date()
        }
      }}).session(session);
    
    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});


router.get('/transactions',authMiddleware, async (req, res) => {
  const userId = req.userId; // Assume userId is passed as a query parameter

  try {
    // Find the account by userId
    const account = await Account.findOne({ userId: userId })

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Map transactions to the desired structure
    const formattedTransactions = account.transactions.map(transaction => ({
      username: transaction.username,
      date: transaction.date,
      amount: transaction.transaction
    }));

    res.json(formattedTransactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

// router.post("/transfer", authMiddleware, async (req, res) => {
//     const { amount, to } = req.body;

//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     if (account.balance < amount) {
//         return res.status(400).json({
//             message: "Insufficient balance"
//         })
//     }

//     const toAccount = await Account.findOne({
//         userId: to
//     });

//     if (!toAccount) {
//         return res.status(400).json({
//             message: "Invalid account"
//         })
//     }

//     await Account.updateOne({
//         userId: req.userId
//     }, {
//         $inc: {
//             balance: -amount
//         }
//     })

//     await Account.updateOne({
//         userId: to
//     }, {
//         $inc: {
//             balance: amount
//         }
//     })

//     res.json({
//         message: "Transfer successful"
//     })
// });

module.exports = router;
