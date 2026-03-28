import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Enrollment from './models/Enrollment.js';

dotenv.config();

async function fix() {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("Connected to DB");

        const enrollments = await Enrollment.find({ 
            status: 'awaiting-payment'
        });

        console.log(`Found ${enrollments.length} awaiting-payment enrollments`);

        let fixedCount = 0;
        for (const e of enrollments) {
            const hasPaid = e.installments.some(inst => inst.status === 'paid');
            if (hasPaid) {
                e.status = 'active';
                await e.save();
                fixedCount++;
                console.log(`Activated enrollment for course: ${e.courseTitle} (User: ${e.userId})`);
            }
        }

        console.log(`Fixed ${fixedCount} enrollments`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fix();
