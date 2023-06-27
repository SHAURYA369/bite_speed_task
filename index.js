const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes, Op } = require('sequelize');
require('dotenv').config();
// Create an instance of Express
const app = express();
app.use(bodyParser.json());

// // Create a Sequelize instance to connect to the database
const sequelize = new Sequelize(process.env.YOUR_DB_URI);
// Sync the models with the database and start the server
sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  });