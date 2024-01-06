'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { twMerge } from 'tailwind-merge';

export type ClassModal = {
  classNames?: {
    content?: string;
    header?: string;
    headerWrap?: string;
    title?: string;
    description?: string;
    body?: string;
  };
};

interface ModalProps extends ClassModal {
  icon?: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  icon,
  title,
  description,
  isOpen,
  onClose,
  disabled,
  children,
  classNames,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent disabled={disabled} aria-disabled={disabled} className={classNames?.content}>
        <DialogHeader className={classNames?.header}>
          {icon}
          <div className={twMerge('grid', classNames?.headerWrap)}>
            <DialogTitle className={twMerge('text-[#b91c1c]', classNames?.title)}>
              {title}
            </DialogTitle>
            <DialogDescription className={classNames?.description}>{description}</DialogDescription>
          </div>
        </DialogHeader>
        <div className={classNames?.body}>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
