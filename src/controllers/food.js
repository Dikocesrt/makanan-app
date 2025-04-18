const Food = require("../models/food");
const uploadCloudinary = require("../helper/uploadCloudinary");
const getURL = require("../helper/getCloudinary");

const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.findAll({
            order: [["createdAt", "ASC"]],
        });
        const plainFoods = foods.map((food) => food.get({ plain: true }));
        plainFoods.map((food) => {
            if (food.image) {
                food.image = getURL(food.image, 340, 220);
            }
        });
        res.render("index", { foods: plainFoods });
    } catch (error) {
        console.error("❌ Unable to fetch foods:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getFoodById = async (req, res) => {
    try {
        const food = await Food.findByPk(req.params.id);
        if (!food) {
            return res.status(404).json({ error: "Food not found" });
        }

        if (food.image) {
            food.image = getURL(food.image, 340, 220);
        }
        res.render("detail", { food: food });
    } catch (error) {
        console.error("❌ Unable to fetch food:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createFood = async (req, res) => {
    try {
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const rating = parseInt(req.body.rating);

        if (!name || !price || !description) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        let uploadResult;
        try {
            uploadResult = await uploadCloudinary(req.file);
        } catch (error) {
            console.log(error);
        }

        const food = new Food({
            name: name,
            price: price,
            description: description,
            rating: rating,
            image: uploadResult.public_id,
        });

        await food.save();

        res.redirect("/foods");
    } catch (error) {
        console.error("❌ Unable to create food:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateFood = async (req, res) => {
    try {
        const food = await Food.findByPk(req.params.id);
        if (!food) {
            return res.status(404).json({ error: "Food not found" });
        }

        if (req.file) {
            let uploadResult;
            try {
                uploadResult = await uploadCloudinary(req.file);
            } catch (error) {
                console.log(error);
            }
            food.image = uploadResult.public_id;
        }

        food.name = req.body.name;
        food.price = req.body.price;
        food.description = req.body.description;
        food.rating = parseInt(req.body.rating);
        await food.save();
        res.redirect("/foods/" + req.params.id);
    } catch (error) {
        console.error("❌ Unable to update food:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByPk(req.params.id);
        if (!food) {
            return res.status(404).json({ error: "Food not found" });
        }
        await food.destroy();
        res.redirect("/foods");
    } catch (error) {
        console.error("❌ Unable to delete food:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getAllFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood,
};
