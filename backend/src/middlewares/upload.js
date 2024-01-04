const multer = require("multer");
const path = require('path');
const fs = require('fs');

const maxSize = 2 * 1024 * 1024;

const destinationStorage = path.resolve(__dirname, 'uploads/');

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destinationStorage)) {
    try {
        fs.mkdirSync(destinationStorage, { recursive: true });
        console.log(`Directory '${destinationStorage}' created.`);
    } catch (err) {
        console.error('Error creating directory:', err);
    }
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, destinationStorage);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'companyLogin-' + uniqueSuffix + path.extname(file.originalname));
    },
});

let upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("companyLogo"); // Match this field name with the one used in your client-side code

const handleImageFile = (file, req) => {
    const uploadedImage = {
        fileName: file.filename,
        filePath: path.join(destinationStorage, file.filename),
    };

    console.log('Image uploaded and saved at:', uploadedImage.filePath);

    // Check if the file exists
    if (fs.existsSync(uploadedImage.filePath)) {
        console.log('File exists.');
    } else {
        console.log('File does not exist.');
    }

    return uploadedImage;
};

module.exports = {
    upload,
    handleImageFile
};
