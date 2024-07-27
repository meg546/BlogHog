import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


ReactDOM.render(<App />, document.getElementById("root"));
