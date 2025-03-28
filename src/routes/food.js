const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food");

router.get("/dev", (req, res) => {
    res.render("detail");
});

router.get("/foods", foodController.getAllFoods);

router.get("/foods/:id", foodController.getFoodById);

router.post("/foods", foodController.createFood);

module.exports = router;
