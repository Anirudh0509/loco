'use strict';
import express from 'express';
import mongoose from 'mongoose';
import transactions from '../models/transactions_model';
import uuidV4 from 'uuid/v4';

let router = express.Router();

//HOME
router.get('/', async (req, res) => {
  res.render('transaction');
});

//CREATING NEW TRANSACTIONS IN THE SYSTEM
router.post('/transactionService/createTransaction', async (req, res) => {

  try {
    
    let { amount, transaction_type, parent_id } = req.body;
    
    await transactions.create({
      transaction_id : uuidV4(),
      amount, 
      transaction_type,
      parent_id,
      status : 'success'
    });

    res.send('Success');

  } catch (error) {
    console.log(error);
    res.send(error).status(400);
  }
});

//FETCHING TRANSACTION WRT transaction_id
router.get('/transactionService/transaction/:transaction_id', async (req, res) => {

  try {
    let { transaction_id } = req.params;
    
    let response = await transactions.find({ transaction_id });
    
    let { amount, transaction_type, parent_id } = response[0];

    res.send({ amount, transaction_type, parent_id });

  } catch (error) {
    console.log("The error", error);
    res.send(error).status(400);
  }
});

//FETCHING TRANSACTION WRT transaction_type
router.get('/transactionService/types/:transaction_type', async (req, res) => {

  try {
    let { transaction_type } = req.params;
    
    let response = await transactions.find({ transaction_type });
    
    let data = response.map(r => r.transaction_id);
    
    res.send(data);

  } catch (error) {
    console.log("The error", error);
    res.send(error).status(400);
  }
});

//FETCHING TRANSACTION WRT parent_id
router.get('/transactionService/parent/:parent_id', async (req, res) => {

  try {
    let { parent_id } = req.params;
    
    let response = await transactions.find({ parent_id });

    let sum = response.map(r => r.amount).reduce((sum, a) => sum + a);
    
    res.send(`The sum of transactions under parent ID - ${parent_id} is ${sum}`);

  } catch (error) {
    console.log("The error", error);
    res.send(error).status(400);
  }
});

//UPDATE TRANSACTION
router.post('/transactionService/transaction/:transaction_id/update', async (req, res) => {

  try {

    let { transaction_id } = req.params;
    let { amount } = req.body;
    
    let response = await transactions.find({ transaction_id });

    await transactions.update({ transaction_id }, { $set : { amount }});

    res.send('Updated Successfully');

  } catch (error) {
    console.log("The error", error);
    res.send(error).status(400);
  }
});


module.exports = router;