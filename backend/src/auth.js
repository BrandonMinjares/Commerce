const {Pool} = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../data/secrets');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});


exports.login = async (req, res) => {
  const {email, password} = req.body;

  const select = `SELECT userid, data FROM Person WHERE data->>'email' = $1`;
  const query = {
    text: select,
    values: [email],
  };

  const {rows} = await pool.query(query);
  if (rows.length == 0) {
    return res.status(401).send('Invalid credentials or user does not exist');
  }
  console.log(rows);

  const userid = (rows[0].userid);

  // check if email exists and passwords are same
  if (bcrypt.compareSync(password, rows[0].data.password)) {
    const accessToken = jwt.sign(
      {email: email, userid: userid},
      secrets.accessToken, {
        expiresIn: '60m',
        algorithm: 'HS256',
      });

    res.status(200).json({email: email, accessToken: accessToken,
      userid: userid});
  } else {
    res.status(401).send('Invalid credentials or user does not exist');
  }
};

exports.register = async (req, res) => {
  // Check if User with that email already exists
  const checkEmail =
  `SELECT userID, data FROM Person WHERE data->>'email' = $1`;
  const emailQuery = {
    text: checkEmail,
    values: [req.body.email],
  };
  const {rows} = await pool.query(emailQuery);
  if (rows.length != 0) {
    return res.status(409).send();
  }
  // Encrypt password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = {
    name: {first: req.body.name.first, last: req.body.name.last},
    email: req.body.email,
    password: hashedPassword,
  };

  const insert = 'INSERT INTO Person(data)' +
      'VALUES ($1) RETURNING userID';

  const insertQuery = {
    text: insert,
    values: [user],
  };

  const createUser = await pool.query(insertQuery);
  if (createUser.rows.length != 1) {
    return res.status(400).json('Bad request');
  }

  return res.status(201).json('User has been created');
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secrets.accessToken, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


exports.deleteAccount = async (req, res) => {
  const select = `DELETE from review WHERE `+
  `review.userid = $1`;

  const query = {
    text: select,
    values: [req.user.userid],
  };

  const {rows} = await pool.query(query);
  console.log(rows);

  const delNotif = `DELETE from Notifications WHERE `+
  `Notifications.userid = $1`;

  const deleteNotif = {
    text: delNotif,
    values: [req.user.userid],
  };

  const test = await pool.query(deleteNotif);
  console.log(test);

  const delPerson = `DELETE from Person WHERE `+
  `Person.userid = $1`;

  const deletePerson = {
    text: delPerson,
    values: [req.user.userid],
  };

  const test2 = await pool.query(deletePerson);
  console.log(test2);

  return res.status(200).json('good');
};
