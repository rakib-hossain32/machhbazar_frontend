import {
  deleteUnattachedMedia,
  uploadMedia,
  type UploadedMedia,
} from "@/features/media/services/cloudinary-upload";

export type UploadedAvatar = UploadedMedia;

export const uploadAvatar = (file: File) => uploadMedia(file, "profile");

export const deleteUnattachedAvatar = (publicId: string) =>
  deleteUnattachedMedia(publicId);
