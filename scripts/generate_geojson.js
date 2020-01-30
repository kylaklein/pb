const fs = require("fs");
const querystring = require("querystring");
const fastcsv = require("fast-csv");
const csvParser = require("csv-parser");
const fetch = require("node-fetch");

const API_KEY = "AIzaSyDxQCUeog2L2Z30hXIm3HK2BsPLI8djR4o";
const geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?";
const inputFilename = "../src/data/addresses5.csv";
// const inputFilename = "../src/data/test.csv";
const outputFilename = "../src/data/latlong.csv";
const outputJSON = "../src/data/latlong.json";

const rs = fs.createReadStream(inputFilename);
const ws = fs.createWriteStream(outputFilename);

const addresses = [];

const parseFile = async () => {
  rs.on("error", () => {
    console.log("error reading address file");
  })
    .pipe(csvParser())
    .on("data", row => {
      const sanitizedAddress = row.address
        .replace(/[&\/\\,+()$~%.'":*?<>{}]/gi, "")
        .replace(/ /gi, "+");
      // console.log(sanitizedAddress);
      addresses.push(sanitizedAddress);
    })
    .on("end", () => {
      // console.log(addresses);
      saveLatLong(addresses);
    });
};

const geoCode = async address => {
  const query = querystring.stringify({ address: address, key: API_KEY });
  const url = `${geocode_url}${query}`;
  // console.log(url);
  const results = await fetch(url);
  return await results.json();
};

const geoCodes = addresses => {
  return Promise.all(
    addresses.map(address => {
      const latLong = geoCode(address);
      // console.log(latLong);
      return latLong;
    })
  );
};

const saveLatLong = addresses =>
  geoCodes(addresses)
    .then(results => {
      const latLongValues = results.map(row => {
        if (row && row.results && row.results[0] && row.results[0].geometry) {
          return row.results[0].geometry.location;
        }
      });
      writeToCSV(latLongValues);
      writeToJSON(latLongValues);
    })
    .catch(err => console.error("error", err));

const writeToCSV = rows => {
  fastcsv
    .write(rows, { headers: false })
    .pipe(ws)
    .on("finish", () => console.log("END CSV"));
};

const writeToJSON = data => {
  fs.writeFile(outputJSON, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("END JSON");
  });
};

parseFile();
