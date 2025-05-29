import React, { FC } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { imgPath } from "@/utils/utils";

interface ProductActiveImageListProps {
  productImages: string[];
  activeImage: number;
  setActiveImage: (index: number) => void;
}

const ProductActiveImageList: FC<ProductActiveImageListProps> = ({
  productImages,
  activeImage,
  setActiveImage,
}) => {
  return (
    <>
      {productImages.map((image, index) => (
        <button
          key={index}
          className={`relative aspect-square overflow-hidden rounded-md border ${
            activeImage === index ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => setActiveImage(index)}
        >
          <Image
            src={imgPath(image ?? "placeholder.svg")}
            alt={`Product image ${index + 1}`}
            fill
            className="object-cover"
          />
        </button>
      ))}
    </>
  );
};

export default ProductActiveImageList;

