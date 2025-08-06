import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateRefreshTokens = async (admin) => {
    try {
        const refreshToken = admin.generateRefreshToken();
        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });
        return refreshToken;
    } catch (error) {
        throw new Error("Failed to generate refresh token");
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password, "loginAdmin called");

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin does not exist" });
        }

        const isPasswordValid = await admin.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const refreshToken = await generateRefreshTokens(admin);
        const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .json({
                status: 200,
                data: { admin: loggedInAdmin, refreshToken },
                message: "Admin logged in successfully"
            });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const getAdmin = async (req, res) => {
    try {
        const adminRefreshToken = req.cookies.refreshToken;
        const admin = await Admin.findById(req.admin._id).select("-password -refreshToken");
        return res.status(200).json({
            status: 200,
            data: admin,
            message: "Admin fetched successfully"
        });
    } catch (error) {
        console.error("Get admin error:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
        
    }
}
const logoutAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndUpdate(
            req.admin._id,
            { $set: { refreshToken: null } },
            { new: true }
        );

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .clearCookie("refreshToken", options)
            .json({
                status: 200,
                data: {},
                message: "Admin logged out"
            });

    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export {
    loginAdmin,
    getAdmin,
    logoutAdmin
};