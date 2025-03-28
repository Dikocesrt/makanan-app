const Food = require("../models/food");

const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.findAll();
        const plainFoods = foods.map((food) => food.get({ plain: true }));
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

        if (!name || !price) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const food = new Food({
            name: name,
            price: price,
            description: description,
        });

        await food.save();

        res.status(201).json();
    } catch (error) {
        console.error("❌ Unable to create food:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getAllFoods,
    getFoodById,
    createFood,
};
