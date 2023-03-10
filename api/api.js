const express = require('express');
const mongoose = require('mongoose');
const Device = require('./models/device');
const username = ""
const pass = ""

mongoose.connect(`mongodb+srv://${username}:${pass}@cluster0.stg8k1w.mongodb.net/mydb`, {useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const port = 5000;

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    // console.log(devices);
   return err
     ? res.send(err)
     : res.send(devices);
  });
});

app.post('/api/devices', (req, res) => {
  const { name, user, sensorData } = req.body;
  const newDevice = new Device({
    name,
    user,
    sensorData
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });});
  
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
