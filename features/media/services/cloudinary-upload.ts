import { envVars } from "@/lib/env";

export type UploadPurpose =
  | "profile"
  | "product"
  | "review"
  | "trace"
  | "kyc"
  | "dispute";

type ResourceType = "image" | "video" | "raw";

type ApiEnvelope<T> = {
  data: T;
  message?: string;
};

type UploadAuthorization = {
  uploadUrl: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  publicId: string;
  assetPublicId: string;
  folder: string;
  uploadType: string;
  allowedFormats: string;
  transformation?: string;
  maxBytes: number;
};

type CompletedUpload = {
  publicId: string;
  url: string;
};

export type UploadedMedia = {
  url: string;
  publicId: string;
};

async function readApiResponse<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => null)) as
    | ApiEnvelope<T>
    | null;

  if (!response.ok || !body?.data) {
    throw new Error(body?.message || "Media upload request failed");
  }

  return body.data;
}

const getResourceType = (file: File): ResourceType => {
  if (["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return "image";
  }
  if (file.type === "video/mp4") return "video";
  if (file.type === "application/pdf") return "raw";
  throw new Error("Unsupported media format");
};

export async function uploadMedia(
  file: File,
  purpose: UploadPurpose,
): Promise<UploadedMedia> {
  const resourceType = getResourceType(file);
  const signResponse = await fetch(
    `${envVars.API_URL}/v1/uploads/signature`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        purpose,
        resourceType,
        mimeType: file.type,
        bytes: file.size,
      }),
    },
  );
  const authorization =
    await readApiResponse<UploadAuthorization>(signResponse);

  if (file.size <= 0 || file.size > authorization.maxBytes) {
    throw new Error("File does not satisfy the allowed upload size");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", authorization.apiKey);
  formData.append("timestamp", String(authorization.timestamp));
  formData.append("signature", authorization.signature);
  formData.append("public_id", authorization.publicId);
  formData.append("folder", authorization.folder);
  formData.append("type", authorization.uploadType);
  formData.append("allowed_formats", authorization.allowedFormats);
  if (authorization.transformation) {
    formData.append("transformation", authorization.transformation);
  }

  const cloudinaryResponse = await fetch(authorization.uploadUrl, {
    method: "POST",
    body: formData,
  });
  const cloudinaryBody = (await cloudinaryResponse.json().catch(() => null)) as
    | { secure_url?: string; error?: { message?: string } }
    | null;

  if (!cloudinaryResponse.ok || !cloudinaryBody?.secure_url) {
    throw new Error(
      cloudinaryBody?.error?.message || "Cloudinary media upload failed",
    );
  }

  const completeResponse = await fetch(
    `${envVars.API_URL}/v1/uploads/complete`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId: authorization.assetPublicId }),
    },
  );
  const completed = await readApiResponse<CompletedUpload>(completeResponse);

  return { url: completed.url, publicId: completed.publicId };
}

export async function deleteUnattachedMedia(publicId: string) {
  await fetch(`${envVars.API_URL}/v1/uploads/assets`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keys: [publicId] }),
  });
}
