import mongoose, {Schema} from "mongoose";

const applicantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        education: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        availability: {
            type: String,
            required: true,
        },
        appliedAt: {
            type: Date,
            default: Date.now
        },
        appliedPosition: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    })

export const Applicant = mongoose.model("Applicant", applicantSchema)

    /*
    name: String,
    email: String,
    phone: String,
    address: String,
    education: String,
    skills: [String],
    experience: String,
    avaliability: String,
    appliedat: Date,
    appliedPosition: String,
    occupation: String,
    */