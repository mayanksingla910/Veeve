"use client";

import React, { useState, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  columnWidth?: number;
};

export default function MasonryGrid({
  children,
  className,
  columnWidth = 270,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(2);

  useLayoutEffect(() => {
    const updateColumns = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newCount = Math.max(2, Math.floor(containerWidth / columnWidth));
        setColumnCount(newCount);
      }
    };

    const observer = new ResizeObserver(updateColumns);
    if (containerRef.current) observer.observe(containerRef.current);

    updateColumns();
    return () => observer.disconnect();
  }, [columnWidth]);

  // Distribute children into columns while maintaining visual order
  const renderColumns = () => {
    const columns: React.ReactNode[][] = Array.from(
      { length: columnCount },
      () => [],
    );

    React.Children.forEach(children, (child, index) => {
      if (child) {
        // This logic puts item 1 in Col 1, item 2 in Col 2, etc.
        columns[index % columnCount].push(child);
      }
    });

    return columns.map((col, idx) => (
      <div key={idx} className="flex flex-col gap-0 md:gap-2 lg:gap-4 flex-1">
        {col.map((child, childIdx) => (
          <div key={childIdx} className="w-full">
            {child}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex w-full gap-1 md:gap-2 lg:gap-4 items-start md:p-4 p-1 py-3",
        className,
      )}
    >
      {renderColumns()}
    </div>
  );
}
