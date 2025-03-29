const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Food = sequelize.define(
    "Food",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "foods",
        timestamps: true,
        paranoid: true,
    }
);

const initializeTable = async () => {
    try {
        await Food.sync({ alter: true });
        console.log("✅ Model 'Food' synchronized with database!");
    } catch (error) {
        console.error(
            "❌ Unable to synchronize model 'Food' with database:",
            error
        );
    }
};

initializeTable();

module.exports = Food;
