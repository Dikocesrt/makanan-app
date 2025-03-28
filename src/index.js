const express = require("express");
const path = require("path");
const hbs = require("hbs");
const foodRouter = require("./routes/food");
require("./configs/database");
require("./models/food");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(publicDirectoryPath));

app.use(express.json());

app.use(foodRouter);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
