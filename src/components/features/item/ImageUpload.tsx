"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  imageUrl: string;
  onImageChange: (imageUrl: string, file: File | null) => void;
}

export function ImageUpload({ imageUrl, onImageChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    // 파일 유효성 검사
    // 이미지 파일이 아니면 에러 처리
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 선택할 수 있습니다.");
      return;
    }
    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("파일 크기는 5MB 이하로 제한됩니다.");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange(result, file); // 미리보기 URL + File 객체 전달
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative lg:w-[384px] h-[311px]`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {imageUrl ? (
        <div className="relative w-full h-full overflow-hidden rounded-[22px]">
          <Image
            src={imageUrl}
            alt="업로드된 이미지"
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div
          className={`w-full h-full flex flex-col items-center 
            justify-center text-gray-500 border-2 border-dashed cursor-pointer
            rounded-[24px] bg-slate-50 transition-colors ${
              dragActive
                ? "border-violet-600 bg-violet-100"
                : "border-slate-300 hover:border-violet-600"
            }`}
        >
          <Image
            src="/images/image_input.png"
            alt="이미지 업로드 아이콘"
            width={64}
            height={64}
          />
        </div>
      )}
      {error && (
        <p className="absolute left-2 bottom-2 text-red-500">{error}</p>
      )}
    </div>
  );
}
