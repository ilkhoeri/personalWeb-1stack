"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import ImagePlaceholder from "./image-placeholder";
import type { buttonImagePlaceholderType } from "./image-placeholder";

import { Cloudinary_UploadPreset } from "./image-upload";
import { ExtendedCldUploadWidget } from "@/types";

interface ImageUploadProfileProps extends buttonImagePlaceholderType, ExtendedCldUploadWidget {
  onChange: (value: string) => void;
  openModal?: () => void;
  value: string;
  name: string;
}

const ImageUploadProfile: React.FC<ImageUploadProfileProps> = ({
  onChange,
  openModal,
  value,
  name,
  button,
  onRemove,
  loading,
  maxFiles = 1,
  maxFileSize = 2097152,
  sources,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={Cloudinary_UploadPreset}
        // signatureEndpoint="/api/sign-cloudinary-params"
        options={{
          maxFiles,
          maxFileSize,
          sources,
        }}
      >
        {({ open }) => {
          return (
            <ImagePlaceholder
              button={button}
              onRemove={onRemove}
              name={name}
              loading={loading || !isMounted}
              value={value}
              onClick={() => (isMounted && openModal ? openModal() : open())}
            />
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageUploadProfile;
