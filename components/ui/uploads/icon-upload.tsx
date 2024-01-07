"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import ImagePlaceholder from "./image-placeholder";
import type { ClassImagePlaceholderType, buttonImagePlaceholderType } from "./image-placeholder";
import { LuBan } from "react-icons/lu";
import { Cloudinary_UploadPreset } from "./image-upload";
import type { ExtendedCldUploadWidget } from "@/types";

interface IconUploadProps extends buttonImagePlaceholderType, ClassImagePlaceholderType, ExtendedCldUploadWidget {
  onChange: (value: string) => void;
  openModal?: () => void;
  value: string;
  name: string;
}

export const IconUpload: React.FC<IconUploadProps> = ({
  onChange,
  openModal,
  value,
  name,
  button,
  onRemove,
  classNames,
  maxFiles = 1,
  maxFileSize = 1597152,
  sources,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={Cloudinary_UploadPreset}
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
              value={value}
              onClick={() => (openModal ? openModal() : open())}
              classNames={classNames}
              childrens={{ imageIcon: <LuBan className="w-full h-full min-w-[28px] min-h-[28px]" /> }}
            />
          );
        }}
      </CldUploadWidget>
    </>
  );
};
