"use client";

import * as React from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionHighlightContextType = {
  activeValue: string;
  registerItem: (value: string, node: HTMLElement | null) => void;
};

const MotionHighlightContext = React.createContext<
  MotionHighlightContextType | undefined
>(undefined);

function useMotionHighlight(): MotionHighlightContextType {
  const context = React.useContext(MotionHighlightContext);
  if (!context) {
    throw new Error("useMotionHighlight must be used within a MotionHighlight");
  }
  return context;
}

type MotionHighlightProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
  value: string;
  controlledItems?: boolean;
  transition?: Transition;
};

function MotionHighlight({
  children,
  value,
  controlledItems = false,
  transition = { type: "spring", stiffness: 200, damping: 25 },
  className,
  ...props
}: MotionHighlightProps) {
  const registeredItems = React.useRef(new Map<string, HTMLElement>());
  const highlightRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [highlightStyle, setHighlightStyle] = React.useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  const registerItem = React.useCallback(
    (val: string, node: HTMLElement | null) => {
      if (node) {
        registeredItems.current.set(val, node);
      } else {
        registeredItems.current.delete(val);
      }
    },
    []
  );

  const updateHighlight = React.useCallback(() => {
    const activeItem = registeredItems.current.get(value);

    if (activeItem && highlightRef.current?.parentElement) {
      const parentRect =
        highlightRef.current.parentElement.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      setHighlightStyle({
        left: itemRect.left - parentRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    } else {
      setHighlightStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [value]);

  React.useEffect(() => {
    updateHighlight();
  }, [value, updateHighlight]);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updateHighlight();
    });

    resizeObserver.observe(containerRef.current);

    const activeItem = registeredItems.current.get(value);
    if (activeItem) {
      resizeObserver.observe(activeItem);
    }

    return () => resizeObserver.disconnect();
  }, [value, updateHighlight]);

  return (
    <MotionHighlightContext.Provider
      value={{
        activeValue: value,
        registerItem,
      }}
    >
      <div ref={containerRef} className={cn("relative", className)} {...props}>
        <motion.div
          ref={highlightRef}
          className="absolute top-0 bottom-0 bg-muted rounded-sm pointer-events-none z-0"
          initial={false}
          animate={{
            left: highlightStyle.left,
            width: highlightStyle.width,
            opacity: highlightStyle.opacity,
          }}
          transition={transition}
        />
        {children}
      </div>
    </MotionHighlightContext.Provider>
  );
}

type MotionHighlightItemProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  value: string;
};

const MotionHighlightItem = React.forwardRef<
  HTMLDivElement,
  MotionHighlightItemProps
>(({ children, value, className, ...props }, forwardedRef) => {
  const { registerItem } = useMotionHighlight();
  const localRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(
    forwardedRef,
    () => localRef.current as HTMLDivElement
  );

  React.useEffect(() => {
    registerItem(value, localRef.current);
    return () => registerItem(value, null);
  }, [value, registerItem]);

  return (
    // Added relative and z-10 to ensure items sit above the highlight
    <div ref={localRef} className={cn("relative z-10", className)} {...props}>
      {children}
    </div>
  );
});
MotionHighlightItem.displayName = "MotionHighlightItem";

export { MotionHighlight, MotionHighlightItem, useMotionHighlight };
