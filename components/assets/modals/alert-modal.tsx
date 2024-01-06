"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/assets/modals/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;

  title?: string;
  description?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title = "This action cannot be undone.",
  description = "Once you delete, there is no going back. Please be certain.",
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      disabled={loading}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
      classNames={{ content: "[--ring-focus:#b91c1c]" }}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" disabled={loading} variant="red" onClick={onConfirm} className="min-w-[96px] w-[96px]">
          {loading ? "Load..." : "Continue"}
        </Button>
      </div>
    </Modal>
  );
};
