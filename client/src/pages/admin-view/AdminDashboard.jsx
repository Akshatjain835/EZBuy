import ProductImageUpload from '@/components/admin-view/ProductImageUpload'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AdminDashboard = () => {

  const [imageFile, setImageFile] = useState(null);

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  // console.log(uploadedImageUrl, "uploadedImageUrl");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const dispatch = useDispatch();



  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {
        featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null
          }
      </div>
    </div>
  )
}

export default AdminDashboard