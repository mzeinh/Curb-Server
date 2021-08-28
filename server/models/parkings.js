const { db } = require('../database/index.js');

module.exports = {
  getParkingsGivenLocation: ({lat, lng}, callback) => {
    const q = `SELECT
      Parkings.id, parking_type,
      listing_name, summary,
      address, price,
      photos.id as photoid, image_file_name,
      latitude, longitude, vacancies,
      (select SQRT(POW(69.1 * ($1::float -  latitude::float), 2) +
      POW(69.1 * (longitude::float - $2::float) * COS($1::float / 57.3), 2))) as distance
      FROM Parkings
      LEFT JOIN  photos
      ON photos.parking_id = Parkings.id
      WHERE (select SQRT(POW(69.1 * ($1::float -  latitude::float), 2) +
      POW(69.1 * (longitude::float - $2::float) * COS($1::float / 57.3), 2))) < 1
      AND active = true`;
    const values = [lat, lng]
    db.query(q, values, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    })
  }
}