"use client";

import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

type HeadModals = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export type PureModalProps = {
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
};

const PureModal: React.FC<PureModalProps & HeadModals> = ({
  isOpen,
  loading,
  onClose,
  title = "This action cannot be undone.",
  description = "Once you delete, there is no going back. Please be certain.",
  children,
  footer,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("!overflow-hidden");
      document.querySelector("main")?.classList.add("z-[999]");
    } else {
      document.body.classList.remove("!overflow-hidden");
      document.querySelector("main")?.classList.remove("z-[999]");
    }

    return () => {
      document.body.classList.remove("!overflow-hidden");
      document.querySelector("main")?.classList.remove("z-[999]");
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div
        id="pure-modal"
        data-pure-modal="container"
        tabIndex={-1}
        aria-hidden="true"
        data-state={isOpen}
        className="flex items-center justify-center !overflow-hidden z-[999] fixed top-0 right-0 left-0 w-full h-screen max-h-full transition-all data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in !m-0"
      >
        <div
          data-pure-modal="overlay"
          onClick={onClose}
          className="w-full min-w-full h-full min-h-screen z-10 fixed top-0 left-0 right-0 bottom-0 md:inset-0 inset-0 bg-background/80 backdrop-blur-sm transition-all data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in !m-0 custom-cursor"
        />

        <div
          data-pure-modal="inner"
          className={twMerge(
            "flex flex-col flex-nowrap items-center relative w-full max-w-2xl h-[90%] max-h-[90%] z-50 rounded-lg border bg-background shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 data-[state=open]:sm:slide-in-from-bottom-0 sm:max-w-lg sm:zoom-in-90",
            loading && "cursor-not-allowed pointer-events-none opacity-75",
          )}
        >
          <div
            data-pure-modal="header"
            className="px-6 pt-4 pb-3 flex items-start justify-between w-full sticky top-0 h-[var(--size-head)]"
          >
            <div className="flex flex-col flex-nowrap justify-start">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={twMerge(
                "relative ml-auto text-gray-400 bg-transparent hover:bg-transparent hover:border rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
              )}
              data-modal-hide="pure-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div
            data-pure-modal="content"
            className="p-6 pt-4 w-full flex flex-col flex-nowrap gap-4 overflow-x-hidden overflow-y-auto [--scroll-size:0px]"
          >
            {children}
          </div>

          {footer && (
            <div
              data-pure-modal="footer"
              className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default PureModal;
