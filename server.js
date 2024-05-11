const express = require("express");
const app = express();
const port = process.env.PORT;
const body_parser = require("body-parser");
app.use(body_parser.json());
//
//
//
//
const mongoose = require("mongoose");
//
//
//
//
//
//
//
//
const dotEnv = require("dotenv");
dotEnv.config();
//
//
//
//
const cors = require("cors");
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
//
//
//
//
app.use("/api", require("./routes/routes"));
//
//
//
//
app.get("/sizan", (req, res) => {
	res.send("Hello Sizan");
});
app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
