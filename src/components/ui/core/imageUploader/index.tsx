import { ChangeEvent, useState } from "react";
import { Input } from "../../input";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TImageUploaderProps = {
  setImagePreviews: React.Dispatch<React.SetStateAction<[] | string[]>>;
  setImageFiles: React.Dispatch<React.SetStateAction<File[] | []>>;
  isMultiple?: boolean;
  className?: string;
};

const ImageUploader = ({
  setImagePreviews,
  setImageFiles,
  isMultiple = false,
  className
}: TImageUploaderProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setImageFiles((prevFiles) => [...prevFiles, ...files!]);

    if (files) {
      // Convert FileList to an array so we can iterate over it
      const filesArray = Array.from(files);

      // Add all new file and create a New FileReader for it
      setImageFiles((prev) => [...prev, ...filesArray]);

      // Load through each file and create a new fileReader for it
      filesArray.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }

    // Reset the input value so the same files can be selected again if needed
    event.target.value = "";
  };

  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        id="image-upload"
        type="file"
        multiple={isMultiple}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="image-upload"
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
      >
        Upload Images
      </label>
    </div>
  );
};

export default ImageUploader;
