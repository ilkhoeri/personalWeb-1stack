import Image from "next/image";
import { LuPencilLine, LuSmile, LuTrash2, LuUserCircle } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

export type buttonImagePlaceholderType = {
  button?: "edit" | "upload";
  loading?: boolean;
  onRemove?: () => void;
};

export type ChildImagePlaceholderType = {
  childrens?: {
    imageIcon?: React.ReactNode;
    onRemove?: React.ReactNode;
    button?: React.ReactNode;
  };
};

export type ClassImagePlaceholderType = {
  classNames?: {
    root?: string;
    wrapper?: string;
    inner?: string;
    image?: string;
    imageIcon?: string;
    onRemove?: string;
    button?: string;
  };
};

export type ImagePlaceholderProps = {
  name: string;
  value: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & buttonImagePlaceholderType &
  ChildImagePlaceholderType &
  ClassImagePlaceholderType;

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  name,
  value,
  onClick,
  loading,
  button,
  onRemove,
  childrens,
  classNames,
}) => {
  return (
    <div
      className={twMerge(
        "_root_ relative flex items-center justify-center [--padding:12px] h-[calc(220px_+_var(--padding))] w-[calc(220px_+_var(--padding))] mt-4 ",
        loading && "cursor-not-allowed pointer-events-none",
        classNames?.root,
      )}
    >
      <div
        id={name}
        onClick={onClick}
        role="presentation"
        title={`${value ? "Edit" : "Upload"} icon`}
        tabIndex={0}
        data-idle="true"
        aria-controls={name}
        className={twMerge(
          "_wrapper_ w-full h-full flex items-center justify-center relative bg-background hover:bg-muted border border-dashed border-color select-none cursor-pointer box-border p-4 rounded-full transition-colors duration-300",
          loading && "cursor-not-allowed pointer-events-none",
          classNames?.wrapper,
        )}
      >
        <div
          className={twMerge(
            "_inner_ p-[var(--padding)] h-full w-full relative z-10 rounded-full flex items-center justify-center flex-nowrap overflow-hidden select-none pointer-events-none text-border",
            loading && "cursor-not-allowed pointer-events-none",
            classNames?.inner,
          )}
        >
          {value ? (
            <Image
              fill
              sizes="200"
              src={value}
              alt="images"
              aria-disabled={loading}
              style={{ objectFit: "cover" }}
              className={twMerge("bg-theme", classNames?.image)}
            />
          ) : (
            childrens?.imageIcon || (
              <LuUserCircle strokeWidth={1} className={twMerge("_imageIcon_ h-full w-full", classNames?.imageIcon)} />
            )
          )}
        </div>
      </div>

      {onRemove && value && (
        <Button
          type="button"
          onClick={onRemove}
          variant="destructive"
          disabled={loading}
          size="sm"
          className={twMerge(
            "_onRemove_ absolute bottom-1 left-0 z-20 h-8 min-h-[32px] gap-2 px-2 py-1 !mt-0 !mb-0",
            classNames?.onRemove,
          )}
        >
          {childrens?.onRemove || (
            <>
              <LuTrash2 size={16} /> Remove
            </>
          )}
        </Button>
      )}

      {button && (
        <Button
          type="button"
          onClick={onClick}
          disabled={loading}
          className={twMerge(
            "_button_ h-8 min-h-[32px] flex flex-row flex-nowrap items-center gap-2 absolute z-20 bg-background hover:bg-muted rounded-md text-foreground text-[14px] px-2 py-1 right-0 bottom-1 border border-color/50 cursor-pointer",
            classNames?.button,
          )}
        >
          {button === "edit" && (
            <>
              {childrens?.button || (
                <>
                  <LuPencilLine size={16} />
                  Edit
                </>
              )}
            </>
          )}
          {button === "upload" && (
            <>
              {childrens?.button || (
                <>
                  <LuSmile size={16} />
                  Upload
                </>
              )}
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default ImagePlaceholder;
