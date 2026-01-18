"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dot, EllipsisVertical, MapPin } from "lucide-react";

function Userdetail() {
  return (
    <div className="md:px-8 lg:px-16 sm:px-4 px-2 w-full">
      <div className="lg:w-1/2">
        <div className="flex gap-4 relative">
          <Avatar className="min-w-20 size-20 sm:size-28 mt-auto sm:mt-0 transition-all font-extrabold text-2xl">
            <AvatarImage src="" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col justify-center gap-0.5">
            <div className="mr-10 md:mr-0">
              <h2 className="font-bold text-xl sm:text-2xl line-clamp-2 sm:block hidden">
                Mayank Singla
              </h2>
            </div>
            <div className="text-muted-foreground text-sm flex items-center">
              <p className="line-clamp-1 break-all">@mayanksingla</p>
              <Dot className="hidden sm:block" />
              <div className="sm:flex text-sm hidden text-muted-foreground ">
                <MapPin className="size-4" />
                <p>India</p>
              </div>
            </div>
            <div className="flex text-sm items-center p-1 gap-8 sm:gap-0 sm:bg-muted w-fit sm:px-3 rounded-md">
              <div className="flex flex-col sm:flex-row sm:gap-1">
                <p>4</p>
                <p>Videos</p>
              </div>
              <Dot className="text-muted-foreground sm:block hidden" />
              <div className="flex flex-col sm:flex-row sm:gap-1">
                <p>12</p>
                <p>Following</p>
              </div>
              <Dot className="text-muted-foreground sm:block hidden" />
              <div className="flex flex-col sm:flex-row sm:gap-1">
                <p>16</p>
                <p>Followers</p>
              </div>
            </div>
          </div>
          <div className="absolute right-3 md:hidden block rounded-lg p-2 hover:bg-muted active:bg-muted active:scale-85 transition-all ease-in-out duration-200">
            <EllipsisVertical className="h-5 w-5" />
          </div>
        </div>
        <div className="pt-4 md:pr-0 px-1 md:pl-3 gap-2 flex flex-col">
          <p className="text-sm text-muted-foreground line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="flex gap-2 w-full">
            <Button size="lg" className="sm:w-52 w-1/2">
              Contact
            </Button>
            <Button size="lg" variant="outline" className="sm:w-52 w-1/2">
              Follow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userdetail;
