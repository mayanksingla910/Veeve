"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MasonryGrid({ children, className }: Props) {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1280) setColumns(5); 
      else if (width >= 1024) setColumns(4); 
      else if (width >= 640) setColumns(3); 
      else setColumns(2);                   
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const getColumns = () => {
    const columnWrapper: React.ReactNode[][] = Array.from(
      { length: columns },
      () => []
    );
    
    React.Children.forEach(children, (child, index) => {
      columnWrapper[index % columns].push(child);
    });

    return columnWrapper;
  };

  return (
    <div
      className={cn(
        "flex w-full gap-1 md:gap-2 lg:gap-4 mb-16 px-1 md:px-4 items-start",
        className
      )}
    >
      {getColumns().map((col, index) => (
        <div
          key={index}
          className="flex flex-col md:gap-4 flex-1"
        >
          {col.map((item, i) => (
            <div key={i} className="w-full">
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}