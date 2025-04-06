import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary.js";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  imageLoadingState,
  setImageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  isEditMode,

}) => {

  const inputRef = useRef(null);
//   console.log(isEditMode, "isEditMode");

  const handleImageFileChange=(e)=>{
    // console.log(e)
    // console.log(e.target.files, "e.target.files");
    const selectedFile = e.target.files?.[0];
    // console.log(selectedFile);

    if (selectedFile){
        setImageFile(selectedFile);
    }

  }

  const handleDragOver=(e)=>{
    e.preventDefault();
  }

  const handleDrop=(e)=>{

    e.preventDefault();

    const droppedFile = e.dataTransfer.files?.[0];
    // console.log(droppedFile)

    if (droppedFile){
        setImageFile(droppedFile);
    }
  }

  const handleRemoveImage=()=>{

    setImageFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

  }
//   console.log(imageFile)



useEffect(() => {
    if (imageFile !== null) 
        uploadImageToCloudinary({ setUploadedImageUrl, setImageLoadingState});
  }, [imageFile]);

  
  return (
    <div
      className={`w-full  mt-4 `}
    >
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div

        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}

      >
        <Input

          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}

        />
        {
        !imageFile ? (

          <Label

            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}

          >

            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />

            <span>Drag & drop or click to upload image</span>

          </Label>

        ) : imageLoadingState ? (

          <Skeleton className="h-10 bg-gray-100" />

        ) : (

          <div className="flex items-center justify-between">

            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>

            <p className="text-sm font-medium">{imageFile.name}</p>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >

              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>

        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
