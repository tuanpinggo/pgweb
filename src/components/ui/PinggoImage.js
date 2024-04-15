import React, { useState } from "react";
import Image from "next/image";

const PinggoImage = ({ src, width = 230, height = 230, cover, ...props }) => {
  const [imageURL, setImageURL] = useState(src);
  return (
    <Image
      {...(!!cover && {
        style: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
        },
      })}
      src={imageURL}
      alt={props?.alt || "Pinggo Image"}
      width={width}
      height={height}
      onError={() => {
        setImageURL("/icons/icon-192x192.png");
      }}
      quality={100}
      {...props}
    />
  );
};

export default PinggoImage;
