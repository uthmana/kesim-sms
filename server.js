const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = __dirname + "/views/";

const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(express.static(path));
var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

// simple route
app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

app.post("/api/kesim/:id", (req, res) => {
  https
    .get(
      `https://mectest.ngcloudmedia.com/handler/GetKesimPageWise.ashx?type=${req.params.id}&pagesize=20&itemcount=20`,
      (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          console.log(JSON.parse(data));
          res.json(JSON.parse(data));
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });

  // res.json({
  //   status: "OK",
  //   message: "Welcome to Uthman application.",
  //   id: req.params.id,
  // });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
