"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import MorePopover from "./morePopover";
import { useRouter } from "next/navigation";

type Props = {
  url: string;
  width: number;
  height: number;
};

function Card({ url, width, height }: Props) {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/video/id");
  };

  return (
    <div className="rounded-sm sm:rounded-2xl break-inside-avoid overflow-hidden">
      <div
        onClick={handleSubmit}
        className="relative overflow-hidden rounded-2xl group cursor-pointer"
      >
        <Image
          src={url}
          alt="Masonry Item"
          width={width}
          height={height}
          className="rounded-2xl transition-transform duration-500 group-hover:scale-105"
          style={{ width: "100%", height: "auto" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="absolute md:flex hidden inset-0 
            bg-black/40
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 
            p-4 justify-between"
        >
          <Button variant={"secondary"} size="icon" className="rounded-full">
            M
          </Button>
          <Button className="rounded-xl font-semibold">Contact</Button>
        </div>
      </div>
      <div className="md:mt-1 w-fit ml-auto mr-1">
        <MorePopover />
      </div>
    </div>
  );
}

export default Card;
