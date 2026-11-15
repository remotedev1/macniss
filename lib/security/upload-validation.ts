const DEFAULT_MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

type ImageValidationResult =
  | { ok: true }
  | { ok: false; error: string };

export function validateImageFile(
  file: unknown,
  { maxBytes = DEFAULT_MAX_IMAGE_BYTES }: { maxBytes?: number } = {},
): ImageValidationResult {
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "A valid image file is required." };
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return { ok: false, error: "Only JPEG, PNG, WebP, and AVIF images are supported." };
  }
  if (file.size > maxBytes) {
    return { ok: false, error: `Image must be ${Math.floor(maxBytes / 1024 / 1024)}MB or smaller.` };
  }
  return { ok: true };
}
