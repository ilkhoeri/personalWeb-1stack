"use client";

import PureModal from "@/components/assets/modals/pure-modal";
import type { PureModalProps } from "@/components/assets/modals/pure-modal";

import ImageUploadProfile from "./image-upload-profile";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Control } from "react-hook-form";
import { useState } from "react";

export type FormImageUploadProfileModalType = {
  control?: Control<{
    image?: string | undefined;
  }>;
};

interface ImageUploadProfileModalProps extends PureModalProps, FormImageUploadProfileModalType {
  loading?: boolean;
}

const ImageUploadProfileModal: React.FC<ImageUploadProfileModalProps> = ({ isOpen, onClose, loading, control }) => {
  const [onDesc, setOnDesc] = useState(false);
  return (
    <PureModal
      isOpen={isOpen}
      onClose={onClose}
      loading={loading}
      title="Avatar"
      description="Update your avatar to display publicly."
    >
      <FormField
        control={control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel></FormLabel>
            <FormControl>
              <ImageUploadProfile
                button="upload"
                name="image"
                loading={loading}
                value={field.value ? field.value : ""}
                onChange={(url) => field.onChange(url)}
                onRemove={() => {
                  field.onChange("");
                  setOnDesc(true);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="truncate">Avatar url - contains image url</FormLabel>
            <FormControl aria-disabled={loading}>
              <Input aria-disabled={loading} placeholder="https://..." {...field} />
            </FormControl>
            <FormDescription>
              This is your public display image. It can be your real pict or a pseudonym.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-x-0 flex flex-nowrap flex-col sm:flex-row sm:items-center justify-between w-full mt-1 mb-6">
        {onDesc && (
          <p className="text-sm leading-tight text-[#f44235]">
            If you remove image and then cancel, refresh the page to see the changes.
          </p>
        )}

        <div className="max-sm:mt-4 gap-4 flex flex-nowrap flex-row items-center !ml-auto !mr-0">
          <Button disabled={loading} variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={loading} variant="destructive" className="min-w-[94px]">
            {loading ? "Load..." : "Continue"}
          </Button>
        </div>
      </div>
    </PureModal>
  );
};

export default ImageUploadProfileModal;
