import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
import Bootcamp from './models/Bootcamp.js';

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {});

// Read JSON files
const filePath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    'devcamper_project_resources/_data/bootcamps.json'
);
const bootcamps = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Import into DB
const importData = async()=> {
    try {
        await Bootcamp.create(bootcamps);
        console.log("Data imported..");
    } catch(err) {
        console.error(err);
    }
}

// Delete data
const deleteData = async()=> {
    try {
        await Bootcamp.deleteMany();
        console.log("Data deleted..");
    } catch(err) {
        console.error(err);
    }
}

if(process.argv[2] === '-d') {
    deleteData();
} else if(process.argv[2] === '-i'){
    importData();
}