"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadImageButton({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/preview/generate-preview`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();

      router.push(`/preview?id=${data.data.id}`);
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
      alert("Не удалось загрузить изображение. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 text-white px-4">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6" />
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold mb-2">Please wait...</h2>
            <p className="text-sm text-gray-300">
              We are generating an image based on your photo. It usually takes 10
              to 30 seconds. Please do not close the page.
            </p>
          </div>
        </div>
      )}

      <label
        className={
          className
            ? className
            : "cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition relative"
        }
      >
        {loading ? "Loading..." : title ? title : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          disabled={loading}
        />
      </label>
    </>
  );
}
