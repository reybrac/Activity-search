const express = require("express");
const request = require("request");
const path = require("path");
const axios = require("axios");

const app = express();

app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*");
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/active/:city", (req, res) => {
  console.log("hit active");

  axios
    .get(
      `https://api.amp.active.com/v2/search/?city=${req.params.city}&state=CA&current_page=1&per_page=200&sort=distance&query=running&exclude_children=false&api_key=2ts6ryqrzkb8ccq9ay7wnurq`
    )
    .then((body) => {
      // console.log(body.data);
      return res.json({ data: body.data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ type: "error", message: error.message });
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
