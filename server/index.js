const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlInsert = "SELECT * FROM car_reviews";
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const carName = req.body.carName;
  const carDescription = req.body.carDescription;

  const sqlInsert =
    "INSERT INTO car_reviews (carName, carDescription) VALUES (?, ?)";
  db.query(sqlInsert, [carName, carDescription], (err, result) => {});
});

app.delete("/api/delete/:carName", (req, res) => {
  const name = req.params.carName;
  const sqlDelete = "DELETE FROM car_reviews WHERE carName = ?";
  db.query(sqlDelete, name);
});

/*app.put("/api/update", (req, res) => {
  const name = req.body.carName;
  const desc = req.body.carDescription;

  const sqlUpdate =
    "UPDATE car_reviews SET carDescription = ? WHERE carName = ?";
  db.query(sqlUpdate, [desc, name]);
});*/

app.listen(8000, () => {
  console.log("running on port 8000");
});
