import User from '../models/userModel.js';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatars/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('File upload only supports the following filetypes - ' + filetypes));
    }
}).single('avatar');

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate({
                path: 'videos',
                options: {
                    limit: 5,
                    sort: { createdAt: -1 } // Assuming videos have a 'createdAt' field
                }
            });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        // destructure fields 
        const { bio, firstname, lastname, email, mobileNumber } = req.body;

        const updateFields = { bio };
        if (firstname) updateFields.firstname = firstname;
        if (lastname) updateFields.lastname = lastname;
        if (email) updateFields.email = email;
        if (mobileNumber) updateFields.mobileNumber = mobileNumber;
        if (req.file) {
            // prepend the base URL
            const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}/`;
            const filePath = req.file.path.replace(/\\/g, '/');
            updateFields.avatar = baseUrl + filePath;
        }

        try {
            const user = await User.findByIdAndUpdate(req.user.id, updateFields, { new: true });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};
