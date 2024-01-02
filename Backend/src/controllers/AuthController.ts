import User from "../models/userModel";
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from "../utils/verifyToken";

const jwt = jsonwebtoken;



export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // const user = User.findOne({ email: email })
        // if (user) {
        //     return res.status(400).json({ message: "The user already exists" })
        // }
        const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, parseInt(salt));
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const user: any = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "The user does not exist" });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "The password is not valid" });
        }
        const token = jwt.sign({ _id: user._id, user: user.username, email: user.email }, JWT_SECRET, { expiresIn: '3d' });
        const { password, ...info } = user._doc;
        res.cookie('token', token,).status(200).json({ ...info, token });
        // res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', { sameSite: 'none', secure: true }).status(200).json({ message: "Logged out" })
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
}

export const refetch = async (req, res) => {
    const token = req.cookies.token
    jwt.verify(token, JWT_SECRET, {}, async (err, data) => {
        if (err) {
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
}

