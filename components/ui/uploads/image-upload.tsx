"use client";

import { CldUploadWidget } from "next-cloudinary";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import type { ExtendedCldUploadWidget } from "@/types";

// cloudinary upload preset - beta
export const Cloudinary_UploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

interface ImageUploadProps extends ExtendedCldUploadWidget {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string | string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  maxFiles,
  maxFileSize = 2097152,
  sources,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  const lengthValue = (value && typeof value === "string") || (Array.isArray(value) && value.length > 0);

  const classBox = twMerge(
    "h-[94px] mt-4 flex justify-center items-center relative hover:bg-muted/40 border-2 border-dashed border-[#ced4da] dark:border-[#373A40] select-none cursor-pointer box-border [transition:all_0.5s_ease]",
    lengthValue ? "w-[94px] rounded-full" : "px-4 w-full rounded-lg",
  );

  return (
    <div className="mb-4 flex items-center justify-center gap-4 [transition:all_0.5s_ease]">
      {Array.isArray(value) &&
        value.map((url) => (
          <figure key={url} className={classBox}>
            <Button
              type="button"
              onClick={() => onRemove(url)}
              variant="destructive"
              size="sm"
              className="z-10 absolute -top-2 -right-2 !p-0 h-8 w-8 rounded-full"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </Button>
            <Image fill sizes="100" className="object-cover rounded-full overflow-hidden" alt="Image" src={url} />
          </figure>
        ))}

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
          const onClick = () => {
            open();
          };

          return (
            <figure onClick={onClick} className={classBox}>
              {value && typeof value === "string" && (
                <Image fill sizes="100" className="object-cover rounded-full overflow-hidden" alt="Image" src={value} />
              )}

              {value && typeof value === "string" ? null : (
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.65"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="56"
                  width="56"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z" />
                  <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                  <path d="M6 20.05v-.05a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v.05" />
                </svg>
              )}

              {!lengthValue && (
                <div className="w-max flex flex-col flex-nowrap text-center gap-2">
                  <span className="text-[16px] leading-none font-medium">Click to select files</span>
                  <span className="text-[#909296] text-[12px] leading-none">
                    Attach files as you like, should not exceed 2mb
                  </span>
                </div>
              )}
            </figure>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
