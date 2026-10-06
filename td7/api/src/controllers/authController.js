import User from '../models/userModel.js';

import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

export async function registerUser(email, password) {
    try {
        if (!email || !password) {
            return { success: false, message: 'Email and password are required' };
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, message: 'User already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        return { success: true, message: 'User registered successfully' };
    } catch (err) {
        return { success: false, message: 'Error registering user: ' + err.message };
    }
}

export async function loginUser(email, password) {
    try {
        if (!email || !password) {
            return { success: false, message: 'Email and password are required' };
        }

        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: 'Incorrect password' };
        }
        const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return {
            success: true,
            message: 'Login successful',
            user: { id: user._id, email: user.email },
            token,
        };
    } catch (err) {
        return { success: false, message: 'Error logging in user: ' + err.message };
    }
}
