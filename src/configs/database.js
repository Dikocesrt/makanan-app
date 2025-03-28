const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("makanan_db", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    port: 8889,
});

// Cek koneksi ke database
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
};

// Jalankan pengecekan koneksi
testConnection();

module.exports = sequelize;
