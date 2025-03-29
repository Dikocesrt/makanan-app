const cloudinary = require("../configs/cloudinary");

const uploadCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "makanan-alterra", resource_type: "image" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        uploadStream.end(file.buffer); // Kirim buffer ke Cloudinary
    });
};

module.exports = uploadCloudinary;
