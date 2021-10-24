const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

PORT = process.env.PORT || 3050;


app.listen(PORT, () => {
  console.log(`Inicializado en PORT: ${PORT}`);
});

let db_config = {
    host: "162.241.2.34",
    user: "saxevilc_kruby",
    password: "Trixter20*",
    database: "saxevilc_zaurio",
}



var mysql = require("mysql");


var connection = mysql.createConnection(db_config);

//routes
app.get("/numbers", (req, res) => {
  const sql = "SELECT * FROM tbl_counter_web";

  connection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No hubo resultados");
    }
  });
});

app.post("/add", (req, res) => {

  const {counter} = req.body;

  const sql = `UPDATE tbl_counter_web SET COUNTER = ${counter} WHERE ID = 1`;

  connection.query(sql, (error) => {
    if (error) throw error; 
    res.send("Sended!");
    console.log(counter);
  });
});

connection.connect((error) => {
  if (error) throw error;
  console.log("DB Server Running.");
});


setInterval(function () {
    connection.query('SELECT 1');
}, 3000);
