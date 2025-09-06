"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Loader } from "@/components/common/Loader";
import { ImageUpload } from "./Image-upload";
import Image from "next/image";

// ✅ Schema (no need for deletedFileIds if deletes happen via API)
const InteriorGallerySchema = z.object({
  imageGallery: z
    .array(
      z.union([
        z.instanceof(File),
        z.object({
          url: z.string().url(),
          fileId: z.string(),
        }),
      ])
    )
    .optional(),
});

export default function InteriorGalleryManager() {
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [galleryImages, setGalleryImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(InteriorGallerySchema),
    defaultValues: { imageGallery: [] },
  });

  // ✅ Fetch gallery images
  const fetchGallery = async () => {
    try {
      setLoadingList(true);
      const res = await fetch("/api/interior-gallery");
      if (!res.ok) throw new Error("Failed to fetch interior gallery");
      const data = await res.json();

      setGalleryImages(data[0]?.images ?? []);
      form.reset({
        imageGallery: (data?.images ?? []).map((img) => ({
          url: img.url,
          fileId: img.fileId,
        })),
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Failed to fetch gallery", "error");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ✅ Handle form submit (upload new files only)
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // append only new Files
      values.imageGallery?.forEach((item) => {
        if (item instanceof File) {
          formData.append("imageGallery", item);
        }
      });

      const res = await fetch("/api/interior-gallery", {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save gallery");
      }

      form.reset({ imageGallery: [] });

      await fetchGallery();
      Swal.fire(
        "Updated!",
        "Interior gallery updated successfully.",
        "success"
      );
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle delete API call
  const handleDelete = async (fileId) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This image will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!confirm.isConfirmed) return;

      const res = await fetch(`/api/interior-gallery/${fileId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete image");

      Swal.fire("Deleted!", "Image deleted successfully.", "success");
      await fetchGallery();
    } catch (err) {
      Swal.fire("Error", err.message || "Delete failed", "error");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle>Interior Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <ImageUpload name="imageGallery" multiple />

              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : form.formState.isSubmitting ? (
                <Loader />
              ) : (
                <Button type="submit" className="flex-1">
                  Save Gallery
                </Button>
              )}
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      {/* Display Images */}
      <div>
        {loadingList ? (
          <p>Loading...</p>
        ) : galleryImages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No images uploaded.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryImages.map((data, idx) => (
              <div
                key={idx}
                className="relative group h-40 bg-white rounded-lg overflow-hidden"
              >
                <Image
                  src={data.url}
                  alt="Interior"
                  fill
                  className="object-contain"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                  onClick={() => handleDelete(data.fileId)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
