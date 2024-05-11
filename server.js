const express = require("express");
const mongoose = require("mongoose");

const dotEnv = require("dotenv");
dotEnv.config();
const cors = require("cors");
//
//
//
//
const app = express();
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
const body_parser = require("body-parser");
app.use(body_parser.json());
//
//
//
//
app.use("/api", require("./routes/routes"));
//
//
//
//
const db = async () => {
	try {
		await mongoose.connect(process.env.db_url);
		console.log("db connected");
	} catch (error) {}
};
db();
//
//
//
//
const port = process.env.PORT;
app.get("/", (req, res) => res.send("server is running"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
