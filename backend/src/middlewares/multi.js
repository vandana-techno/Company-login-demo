// fileUpload.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.resolve(__dirname, 'uploads/');
        // Ensure the 'uploads/' directory exists
        if (!fs.existsSync(destinationPath)) {
            try {
                fs.mkdirSync(destinationPath, { recursive: true });
            } catch (err) {
                console.error('Error creating directory:', err);
            }
        }
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });
const handleCompanyDocuments = (files, req) => {
    const uploadedDocuments = files.map((file, i) => {
        const companyDocument = req.body.companyDocuments && req.body.companyDocuments[i] ? req.body.companyDocuments[i] : {};
        const documentID = companyDocument.documentID;
        const documentTypeID = companyDocument.documentTypeID;
        const fileName = companyDocument.fileName;
        const filePath = path.join('uploads', file.filename);
        console.log('File uploaded and saved at:', filePath);
        return {
            documentID,
            documentTypeID,
            documentUrl: filePath,
            // documentUrl: fileName,
            fileName
        };
    });
    return uploadedDocuments;
};
const multipleFilesUpload = (req, res, next) => {
    const uploadedDocuments = handleCompanyDocuments(req.files['companyDocuments'], req);
    req.uploadedDocuments = uploadedDocuments; // Attach uploadedDocuments to req
    next();
};
module.exports = {
    upload,
    handleCompanyDocuments,
    multipleFilesUpload,
};