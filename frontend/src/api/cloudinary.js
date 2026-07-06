import axios from "axios";

const CLOUD_NAME = "pline4qe"; 
const UPLOAD_PRESET = "ncr_upload";

export const uploadImage = async (file) => {

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData
  );

  return res.data.secure_url;
};