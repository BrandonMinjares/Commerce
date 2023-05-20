const {Pool} = require('pg');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});
// const express = require('express');
// const fileUpload = require('express-fileupload');
// const app = express();

// app.use(fileUpload());


exports.uploadItem = async (req, res) => {
  console.log('test');
  const body = req.body;
  // console.log(req.body);
  // console.log(req.files);
  body.fileImage = req.files[0];

  const insert = `Insert into item(userId, data) VALUES ($1, $2) ` +
    'RETURNING itemID';
  const insertQuery = {
    text: insert,
    values: [req.user.userid, body],
  };

  const {rows} = await pool.query(insertQuery);

  if (rows.length != 1) {
    return res.status(400).json('Bad request');
  }
  // console.log(rows);

  return res.status(201).json('Item has been created');
};

exports.getItems = async (req, res) => {
  //  ('in get items');

  const select = 'Select * from item';
  const selectQuery = {
    text: select,
  };
  const {rows} = await pool.query(selectQuery);
  // console.log(rows);
  return res.status(200).json(rows);
};


exports.getItem = async (req, res) => {
  // console.log(req.params);
  const id = req.params.itemID;
  // console.log(id);
  const select = 'Select * from item where itemID = $1';
  const selectQuery = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(selectQuery);
  // console.log(rows[0]);
  return res.status(200).json(rows);
};

exports.getAllUsersItems = async (req, res) => {
  const select = `SELECT shoppingcart from Person `+
  `where userid = $1`;

  const selectQuery = {
    text: select,
    values: [req.user.userid],
  };
  const {rows} = await pool.query(selectQuery);
  const itemIdArray = rows[0].shoppingcart;
  // console.log(itemIdArray);
  const itemsArray = [];

  for (const itemID of itemIdArray) {
    const selectItem = 'Select * from item where itemID = $1';
    const selectItemQuery = {
      text: selectItem,
      values: [itemID],
    };
    const {rows} = await pool.query(selectItemQuery);
    itemsArray.push(rows[0]);
    // console.log(itemsArray);
  }

  return res.status(200).json(itemsArray);
};

exports.addToCart = async (req, res) => {
//  console.log(req.params.id);
  const select = 'UPDATE person ' +
  `SET shoppingCart = array_append(shoppingCart, $1) ` +
  'WHERE userid = $2 ';
  const selectQuery = {
    text: select,
    values: [req.params.id, req.user.userid],
  };
  await pool.query(selectQuery);
  // console.log(rows);
  return res.status(200).json('good');
};


exports.checkout = async (req, res) => {
  const select = `SELECT shoppingcart from Person `+
  `where userid = $1`;

  const selectQuery = {
    text: select,
    values: [req.user.userid],
  };
  await pool.query(selectQuery);
  // console.log(rows[0].shoppingcart);


  const storeItems = new Map([
    [1, {priceInCents: 10000, name: 'learnreac'}],
    [2, {priceInCents: 20000, name: 'learn css'}],
  ]);

  const test = [
    {id: 1, quantity: 1},
    {id: 2, quantity: 1},
  ];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: test.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });
    // console.log(session.url);
    res.status(200).json({url: session.url});
  } catch (e) {
    res.status(500).json({error: e.message});
  }
};
