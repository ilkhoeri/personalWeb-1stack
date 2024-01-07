'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastIcon,
  ToastTitle,
  ToastViewport,
} from './toast';
import { ErrorToast, LoadingToast, SuccessToast } from './icons';
import { useToast } from './use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, icon, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            {icon && <IconToast icon={icon} />}
            <div className="grid [&_.toast-title]:pt-1 [&_.toast-description]:pb-1 only-of-type:[&_div]:py-2">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

const IconToast: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
  return (
    <>
      {typeof icon === 'string' && icon === 'success' && <SuccessToast />}
      {typeof icon === 'string' && icon === 'error' && <ErrorToast />}
      {typeof icon === 'string' && icon === 'loading' && <LoadingToast />}
      {!['success', 'error', 'loading'].includes(icon as string) && icon}
    </>
  );
};
