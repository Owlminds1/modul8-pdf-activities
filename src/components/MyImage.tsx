"use client";
import Image from "next/image";
import { useState } from "react";

type MyImageProps = {
  path: string;
  fill?: boolean;
  className?: string;
  height?: number;
  width?: number;
};
const MyImage = ({
  path,
  fill = false,
  width,
  height,
  className = "",
}: MyImageProps) => {
  const [imgUrl, setImageUrl] = useState(path);
  const [loading, setLoading] = useState(false);
  return (
    <Image
      src={imgUrl}
      {...(!fill && {
        width: width ? width : 400,
        height: height ? height : 100,
      })}
      alt="Image Not Found"
      fill={fill}
      {...(fill && {
        style: { width: "100%", height: "100%", objectFit: "contain" },
      })}
      onError={() => setImageUrl("/placeholder_image.jpg")}
      onLoad={() => setLoading(true)}
      className={`${
        loading ? " blur-0" : "blur-sm"
      } transition-all duration-500 ease-in-out  rounded-lg object-contain ${className} `}
    />
  );
};

export default MyImage;
