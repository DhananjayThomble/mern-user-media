import User from '../models/userModel.js';
import generatePassword from '../utils/generatePassword.js';
import sendEmail from '../utils/emailService.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export const createAccount = async (req, res) => {
    const { firstname, lastname, email, mobileNumber } = req.body;
    const { simplePassword, encryptedPassword } = generatePassword(firstname, lastname, mobileNumber);
    console.log(`Simple password: ${simplePassword} Encrypted password: ${encryptedPassword}`);
    try {
        const newUser = new User({ firstname, lastname, email, mobileNumber, password: encryptedPassword });
        await newUser.save();

        sendEmail(email, 'Thank you for creating your account', `Your password is ${simplePassword}`);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { firstname, password } = req.body;

    try {
        const user = await User.findOne({ firstname });
        // console.log(`User: ${user}`);
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(`Password match: ${isMatch}`);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '48h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
