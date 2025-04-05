import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from 'dotenv'
dotenv.config()

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer memory storage
const storage =new multer.memoryStorage();

// Upload utility
export const imageUploadUtil=async(file)=>{

  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;

}

// Multer middleware
export const upload = multer({ 
    storage
 });
