"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import MiniProfile from "./_components/miniProfile";
import Userdetail from "./_components/userdetail";
import ProfileTabs from "./_components/profileTabs";

function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const userDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-250px 0px 0px 0px",
      },
    );

    if (userDetailRef.current) {
      observer.observe(userDetailRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className=" transition-all">
      <motion.div
        initial={false}
        animate={{
          y: isScrolled ? 0 : "-120%",
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.1,
        }}
        className={`sticky top-14 md:top-17 left-0 right-0 z-40 bg-background `}
      >
        <MiniProfile />
      </motion.div>

      <div className={`p-2 -translate-y-14`}>
        <div ref={userDetailRef}>
          <Userdetail />
        </div>

        <ProfileTabs />
      </div>
    </div>
  );
}

export default Page;
