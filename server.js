// set up starts
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const app = express();

require('dotenv').config();

const port = process.env.PORT;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

app.use(async function(req, res, next) {
  try {
    req.db = await pool.getConnection();
    req.db.connection.config.namedPlaceholders = true;

    await req.db.query(`SET SESSION sql_mode = "TRADITIONAL"`);
    await req.db.query(`SET time_zone = '-8:00'`);

    await next();

    req.db.release();
  } catch (err) {
    console.log(err);

    if (req.db) req.db.release();
    throw err;
  }
});

app.use(cors());

app.use(express.json());
// set up ends


// creates and sends new user to database when someone registers
app.post('/register', async function(req, res) {
  try {
    const { username, password } = req.body;

    const query = await req.db.query(
      `INSERT INTO users (username, password)
       VALUES (:username, :password);`, { username, password });
  
    res.send({status: "registered"});
  } catch (err) {
    res.json({ success: false, message: err, data: null });
  }
});


// checks login and calls generate access token function
app.post('/login', async function(req, res) {
  try {
    const { username, password } = req.body;
    const user = { name: username };
  
    const login = await req.db.query('SELECT * FROM users WHERE username = :username AND password = :password;', {username, password});

    if (login[0].length > 0) {
      const accessToken = generateAccessToken(user);
      res.send({status: "success", accessToken: accessToken});
    } else {
      res.send({status: "user not found"});
    }

  } catch (err) {
    res.json({ success: false, message: err, data: null });
  }
});


// makes a jwt token
function generateAccessToken(user) {
  return jwt.sign(user, "changeLater", { expiresIn: '5m' });
};


// transfers funds out of available funds into buying power
app.put('/depositFunds/:deposit/:username/:password', async function(req, res) {
  try {
    const deposit = req.params.deposit;
    const username = req.params.username;
    const password = req.params.password;

    const update = await req.db.query(
      `UPDATE users
       SET buying_power = buying_power + :deposit, available_funds = available_funds - :deposit
       WHERE password = :password AND username = :username;`, {deposit, password, username}); 

    const query = await req.db.query(
      `SELECT buying_power, available_funds FROM users
       WHERE password = :password AND username = :username;`, {password, username});

    res.send({deposited: query[0][0].buying_power, remaining: query[0][0].available_funds});
  } catch (err) {
    res.json({ success: false, message: err, data: null });
  }
});


// transfers funds into available funds from buying power
app.put('/withdrawFunds/:withdraw/:username/:password', async function(req, res) {
  try {
    const withdraw = req.params.withdraw;
    const username = req.params.username;
    const password = req.params.password;

    const update = await req.db.query(
      `UPDATE users
       SET buying_power = buying_power - :withdraw, available_funds = available_funds + :withdraw
       WHERE password = :password AND username = :username;`, {withdraw, password, username});

    const query = await req.db.query(
      `SELECT available_funds, buying_power FROM users
       WHERE password = :password AND username = :username;`, {password, username});

    res.send({withdrawn: query[0][0].available_funds, remaining: query[0][0].buying_power});
  } catch (err) {
    res.json({ success: false, message: err, data: null });
  }
});


// gets balances when page renders with useEffect
app.get('/balances/:username/:password', async function(req, res) {
  try {
    const username = req.params.username;
    const password = req.params.password;

    const query = await req.db.query(
      `SELECT available_funds, buying_power FROM users
       WHERE username = :username AND password = :password;`, {username, password});

    res.send({available: query[0][0].available_funds, power: query[0][0].buying_power});
  } catch {
    res.json({ success: false, message: err, data: null });
  }
});


// deletes the user off the database with params
app.delete('/deleteAccount/:username/:password', async function(req, res) {
  try {
    const username = req.params.username;
    const password = req.params.password;

    const query = await req.db.query(
      `DELETE FROM users
       WHERE username = :username AND password = :password;`, {username, password});

    res.json({ success: true, message: "deletion success", data: null });
  } catch {
    res.json({ success: false, message: err, data: null });
  }
});

app.listen(port, () => console.log(`212 API Example listening on http://localhost:${port}`));