const express = require('express')
const app = express()
const { getParkingsGivenLocation } = require('./models/parkings.js')

app.use(express.json());

app.get('/parkings', function (req, res) {
  const q = JSON.parse(req.query.locationData)
  getParkingsGivenLocation(q, (err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.send(result.rows);
    }
  })
})

app.listen(4000)




