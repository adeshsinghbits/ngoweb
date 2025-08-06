import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
import { Admin } from "./models/admin.model.js";
dotenv.config({
    path: './.env'
})

const createInitialAdmin = async () => {
    try {
        const email = process.env.DEFAULT_ADMIN_EMAIL;
        const password = process.env.DEFAULT_ADMIN_PASSWORD;
        
        if (!email || !password) {
            console.error("❌ DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PASSWORD must be set in .env");
            return;
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return;

        await Admin.create({ email, password });
        console.log(`✅ Default admin created: ${email}`);
    } catch (error) {
        console.error("❌ Failed to create default admin:", error.message);
    }
};

connectDB()
.then(  async  () => {
    await createInitialAdmin();
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
