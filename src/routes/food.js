const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food");
const multer = require("multer");
const upload = multer({
    limits: {
        fileSize: 10000000,
    },
    fileFilter(req, file, cb) {
        if (
            !file.originalname.endsWith(".png") &&
            !file.originalname.endsWith(".jpg") &&
            !file.originalname.endsWith(".jpeg")
        ) {
            return cb(new Error("Please upload an image"));
        }

        cb(undefined, true);
    },
});

router.get("/dev", (req, res) => {
    res.render("detail");
});

router.get("/", foodController.getAllFoods);

router.get("/foods", foodController.getAllFoods);

router.get("/foods/:id", foodController.getFoodById);

router.post("/foods", upload.single("image"), foodController.createFood);

router.put("/foods/:id", upload.single("image"), foodController.updateFood);

router.delete("/foods/:id", foodController.deleteFood);

module.exports = router;
