"use client";

import Card from "@/components/feed/card";
import MasonryGrid from "@/components/feed/masonary";
import { Button } from "@/components/ui/button";
import exampleImages from "@/public/assets/example_images";
import { useEffect, useRef, useState } from "react";

function Page() {
  const [offset, setOffset] = useState(0);
  const leftDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (leftDivRef.current) {
        const divHeight = leftDivRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        const stickyPoint = divHeight - viewportHeight + 24;
        
        setOffset(stickyPoint > 0 ? stickyPoint : 0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="max-w-600 mx-auto p-2 py-3 sm:p-3 md:p-4 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        <div
          ref={leftDivRef}
          className="w-full h-fit lg:w-[60%] shrink-0 lg:sticky transition-[top] duration-300"
          style={{ 
            top: `-${offset}px` 
          }}
        >
          <div className="flex flex-col bg-background">
            <div className="aspect-4/3 bg-muted rounded-4xl overflow-hidden shadow-sm"></div>

            <div className="mt-6 px-2 pb-6">
              <h1 className="text-3xl font-bold tracking-tight">Title</h1>
              
              <div className="flex items-center gap-3 mt-4 border-b pb-6">
                <div className="size-10 rounded-full bg-muted shrink-0" />
                <p className="font-semibold text-lg">Creator Name</p>
                <div className="ml-auto flex gap-2">
                  <Button className="">Contact</Button>
                  <Button variant="outline" className="">Follow</Button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-muted-foreground">
                  Description
                </p>
                <div className="bg-muted/30 rounded-3xl p-6">
                  <h3 className="font-bold mb-2">Comments</h3>
                  <div className="space-y-4">
                    <p className="text-sm ">This is the end of the div.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full min-h-[200vh]">
          <h2 className="text-xl font-bold mb-4 px-2">More like this</h2>
          <MasonryGrid columnWidth={220} className="p-0 lg:p-1 md:p-1">
            {exampleImages.map((image, index) => (
              <Card
                key={`${image.url}-${index}`}
                url={image.url}
                width={image.width}
                height={image.height}
              />
            ))}
          </MasonryGrid>
        </div>
      </div>
    </div>
  );
}

export default Page;