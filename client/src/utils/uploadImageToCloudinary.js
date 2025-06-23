import axios from "axios";

export const uploadImageToCloudinary=async({ setUploadedImageUrl, setImageLoadingState,imageFile})=> {

    setImageLoadingState(true);

    const data = new FormData();

    data.append("image", imageFile);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      data
    );
    // console.log(response, "response");

    if (response?.data?.success) {

      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);

    }
  }