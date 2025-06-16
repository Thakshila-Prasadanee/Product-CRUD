import User from '../models/user.model.js';
import bcrypt from "bcryptjs";

export const getUsers = async(req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
}

export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if(!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const updates = req.body;

        // Prevent password update here unless hashed again
        if (updates.password) delete updates.password;

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        }).select('-password');

        if (!updatedUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};