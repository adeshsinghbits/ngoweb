import { Applicant } from '../models/applicant.model.js';
import mongoose from "mongoose";

const createApplicant = async (req, res) => {
    try {
        const { name, email, phone, address, education, skills, experience, availability, appliedat, appliedPosition, occupation } = req.body;
        console.log("Applicant Data:", req.body);
        
        if (!name || !email || !phone || !address || !education || !skills || !experience || !availability || !appliedPosition || !occupation) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const registeredApplicant = await Applicant.findOne({ email });
        if (registeredApplicant) {
            return res.status(409).json({ message: "Applicant with this email already exists" });
        }

        const applicant = new Applicant({
            name,
            email,
            phone,
            address,
            education,
            skills,
            experience,
            availability,
            appliedAt: appliedat || Date.now(),
            appliedPosition,
            occupation
        });

        await applicant.save();
        res.status(201).json({ 
            data: applicant,
            message: "Applicant registered successfully" 
        });

    } catch (error) {
        console.error("Error creating applicant:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getApplicants = async (req, res) => {
    try {
        const applicants = await Applicant.find().sort({ appliedAt: -1 });

        if (!applicants || applicants.length === 0) {
            return res.status(404).json({ message: "No applicants found" });
        }

        res.status(200).json({
            message: "Applicants retrieved successfully",
            data: applicants
        });

    } catch (error) {
        console.error("Error fetching applicants:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getApplicant = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const applicant = await Applicant.findById(id);
        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }   
        res.status(200).json({
            message: "Applicant retrieved successfully",
            data: applicant
        }); 
    } catch (error) {
        console.error("Error fetching applicant:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteApplicant = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const applicant = await Applicant.findById(id);
        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }

        await Applicant.findByIdAndDelete(id);
        res.status(200).json({
            message: "Applicant deleted successfully",
            data: applicant
        });

    } catch (error) {
        console.error("Error deleting applicant:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export {
    createApplicant,
    getApplicants,
    getApplicant,
    deleteApplicant
}