"use client";

import Image from "next/image";
import { useRef, useState, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Text, Title } from "./typography";

export default function ImageDropzone({
  label,
  name,
  setValue,
  className,
  initialImageUrl = "",
}: {
  label: string;
  name: string;
  setValue: (name: string, file: File) => void;
  className?: string;
  initialImageUrl?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initialImageUrl || null
  );
  const [isDragging, setIsDragging] = useState(false);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setValue(name, file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    // Optionally, reset the form value for this field
    setValue(name, null as unknown as File); // cast to satisfy TS
  };

  return (
    <div className="space-y-2">
      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {/* Dropzone */}
      <div
        onClick={openFilePicker}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative w-full h-60 px-8 rounded-xl border border-dashed cursor-pointer dark:border-white/20 border-gray-200 overflow-hidden",
          "flex items-center justify-center text-sm text-muted-foreground",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          preview && "border-none",
          className
        )}
      >
        {/* Empty state */}
        {!preview && (
          <div className="text-center space-y-2 pointer-events-none">
            <Title variant="xs">{label}</Title>
            <Text variant="xs" className="max-w-[240px] !text-xs">
              Drag & Drop or Click to Upload from your Device
            </Text>
          </div>
        )}

        {/* Preview */}
        {preview && (
          <>
            <Image
              src={preview}
              alt="Featured image preview"
              fill
              className="object-cover"
            />

            {/* Overlay buttons */}
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  openFilePicker();
                }}
              >
                Change
              </Button>

              <Button
                type="button"
                size="sm"
                variant="destroy"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                Remove
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
