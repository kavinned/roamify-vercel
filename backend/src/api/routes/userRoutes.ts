import express from "express";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestWithUser, verifyJWT } from "../../middleware/protected";

const router = express.Router();

router.get("/", verifyJWT, async (_req, res) => {
    try {
        const users = await User.find().populate({ path: "itineraries" });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: `${error} Failed to fetch users` });
    }
});

router.post("/register", async (req, res): Promise<void> => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        res.status(400).json({ message: "Please fill in all fields" });
        return;
    }

    if (password !== confirmPassword) {
        res.status(400).json({ message: "Passwords do not match" });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email format" });
        return;
    }

    const uniqueEmail = await User.findOne({ email });

    if (uniqueEmail) {
        res.status(400).json({ message: "Email already exists" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.json({
        message: "User has been created",
        user,
    }).status(201);
    return;
});

router.post("/login", async (req, res) => {
    const jwtSecret = process.env.JWT_SECRET as string;
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!email || !password) {
        res.status(400).json({ message: "Please fill in all fields" });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email format" });
        return;
    }

    if (!user) {
        res.status(401).json({ message: "Invalid email" });
        return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ message: "Invalid password" });
        return;
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        jwtSecret,
        {
            expiresIn: process.env.JWT_EXPIRATION,
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600 * 1000,
        sameSite: "none",
        secure: true,
    })
        .status(200)
        .json({
            message: `${user?.name} logged in successfully`,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                itineraries: user.itineraries,
            },
        });
});

router.post("/logout", async (_req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    res.status(200).json({ message: "User logged out successfully" });
    return;
});

router.get("/verify", verifyJWT, async (req: RequestWithUser, res) => {
    try {
        const user = await User.findById(req.user?.id).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
        return;
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});

export default router;
