type CompanyLogoProps = {
  sm?: boolean;
  src?: string;
};

import { Image } from "@mantine/core";

export default function CompanyLogo(props: CompanyLogoProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-sm border-2 border-gray-150 self-center ${
        props.sm ? "w-10 h-10" : "w-20 h-20"
      }`}
    >
      <Image
        src={props.src}
        fallbackSrc="https://placehold.co/600x400?text=No+Image"
        alt="Ảnh công ty"
      />
    </div>
  );
}
