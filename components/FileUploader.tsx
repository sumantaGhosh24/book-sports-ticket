"use client";

import {useCallback, Dispatch, SetStateAction} from "react";
import Image from "next/image";
import type {FileWithPath} from "@uploadthing/react";
import {generateClientDropzoneAccept} from "uploadthing/client";
import {Upload} from "lucide-react";
import {useDropzone} from "@uploadthing/react/hooks";

import {Button} from "@/components/ui/button";
import {convertFileToUrl} from "@/lib/utils";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-gray-200"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col py-5 text-grey-500">
          <Upload size={48} />
          <h3 className="mb-2 mt-2 text-sm font-bold">Drag photo here</h3>
          <p className="mb-4 text-base">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from device
          </Button>
        </div>
      )}
    </div>
  );
}
