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
console.log(body);
  const insert = 'Insert into item VALUES ($1, $2)';
  const insertQuery = {
    text: insert,
    values: [req.user.id, body],
  };

  const {rows} = await pool.query(insertQuery);
  if (rows.length != 1) {
    return res.status(400).json('Bad request');
  }

  return res.status(201).json('Item has been created');
};
