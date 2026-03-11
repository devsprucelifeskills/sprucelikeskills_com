import v2 from 'cloudinary';
import dotenv from 'dotenv'

dotenv.config()

v2.config({
    cloud_name: process.env.CLOUDINARYPRO_CLOUD_NAME_PROFILE,
    api_key: process.env.CLOUDINARYPRO_KEY_PROFILE,
    api_secret: process.env.CLOUDINARYPRO_SECRET_PROFILE
});

export default v2;