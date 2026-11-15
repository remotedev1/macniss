"use client";

import { useEffect, useId, useState } from "react";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type Asset = File | { url: string; fileId?: string };

function Preview({ asset, index, remove }: { asset: Asset; index: number; remove: () => void }) {
  const [localUrl, setLocalUrl] = useState("");
  useEffect(() => {
    if (!(asset instanceof File)) return;
    const url = URL.createObjectURL(asset);
    setLocalUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [asset]);
  const src = asset instanceof File ? localUrl : asset.url;

  return (
    <div className="cms-upload-preview">
      {src && <Image src={src} alt={`Photo ${index + 1}`} fill sizes="180px" className="object-cover" unoptimized={asset instanceof File} />}
      <Button type="button" size="icon" variant="destructive" aria-label={`Remove photo ${index + 1}`} onClick={remove}>
        <X size={15} aria-hidden="true" />
      </Button>
    </div>
  );
}

export function ImageUpload({ name, multiple = true, }) {
  const { setValue, watch, getValues } = useFormContext();
  const currentValue = watch(name) || [];
  const inputId = useId();

  const handleFiles = (files) => {
    if (!files) return;
    const fileArray = Array.from(files);
    if (multiple) {
      setValue(name, [...currentValue, ...fileArray], { shouldValidate: true });
    } else {
      setValue(name, fileArray[0] ? [fileArray[0]] : [], {
        shouldValidate: true,
      });
    }
  };

  const removeImage = (index) => {
    const list = getValues(name) || [];
    const target = list[index];
    const updated = list.filter((_, i) => i !== index);

    if (!(target instanceof File) && target?.fileId) {
      const deletedNow = getValues("deletedFileIds") || [];
      if (!deletedNow.includes(target.fileId)) {
        setValue("deletedFileIds", [...deletedNow, target.fileId], {
          shouldValidate: true,
        });
      }
    }

    setValue(name, updated, { shouldValidate: true });
  };

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-semibold">Project photos</label>
      <Input
        id={inputId}
        type="file"
        accept="image/png, image/jpeg"
        multiple={multiple}
        onChange={(event) => {
          handleFiles(event.currentTarget.files);
          event.currentTarget.value = "";
        }}
      />

      <div className="cms-upload-previews">
        {currentValue.map((item, i) => {
          return (
            <Preview key={item instanceof File ? `${item.name}-${item.lastModified}-${i}` : item.fileId ?? i}
              asset={item} index={i} remove={() => removeImage(i)} />
          );
        })}
      </div>
    </div>
  );
}
