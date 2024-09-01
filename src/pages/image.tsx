"use client";

import { useState } from "react";
import { supabase } from "./supabaseClient";
import Image from "next/image";

export default function ImageUploadPage() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const file = e.target.files[0];
      const { data: image, error: uploadError } = await supabase.storage
        .from("image_upload_kodaschool")
        .upload(`${file.name}`, file);
      if (uploadError) {
        throw uploadError;
      }

      if (image) {
        const { data: { publicUrl } } = supabase
          .storage
          .from("image_upload_kodaschool")
          .getPublicUrl(image.path);
        setImageUrls((prev) => [...prev, publicUrl]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col items-center bg-gray-800 text-gray-200 p-24 min-h-screen">
      <h1 className="text-5xl font-bold mb-10">Image Upload & Display</h1>

      <div className="mb-10">
        <input
          type="file"
          onChange={uploadImage}
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`Uploaded Image ${index + 1}`}
            width={300}
            height={300}
            className="rounded-lg border border-gray-300"
          />
        ))}
      </div>
    </main>
  );
}
