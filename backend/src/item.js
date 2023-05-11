const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});


exports.uploadItem = async (req, res) => {
  const body = req.body;
  // console.log(req.files[0]);
  // console.log(body);

  const image = {
    'originalname': req.files[0].originalname,
    'buffer': req.files[0].buffer,
  };
  body.fileImage = image;


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
  console.log('in get items');

  const select = 'Select * from item';
  const selectQuery = {
    text: select,
  };
  const {rows} = await pool.query(selectQuery);
  console.log(rows);
  return res.status(200).json(rows);
};
