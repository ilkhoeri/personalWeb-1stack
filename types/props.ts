export type ExtendedCldUploadWidget = {
  maxFiles?: number;
  maxFileSize?: number;
  sources?:
    | (
        | "camera"
        | "dropbox"
        | "facebook"
        | "gettyimages"
        | "google_drive"
        | "image_search"
        | "instagram"
        | "istock"
        | "local"
        | "shutterstock"
        | "unsplash"
        | "url"
      )[]
    | undefined;
};
