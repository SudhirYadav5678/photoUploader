import {v2 as cloudinary} from 'cloudinary';
import fs from "fs" // node files System https://nodejs.org/api/fs.html used for files propertes delete, rename, etc.

          
cloudinary.config({ 
  cloud_name: 'drpycshga', 
  api_key: '392286212332692', 
  api_secret:'P68EkfHQoFvJghz0-JCP15FaOas' 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}