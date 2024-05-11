const express = require("express");
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const dotEnv = require("dotenv");
dotEnv.config();

const app = express();
const port = process.env.PORT;

app.get("/sizan", (req, res) => {
	res.send("Hello Sizan");
});
app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
