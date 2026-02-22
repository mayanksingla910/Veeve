import BottomBar from "@/components/navigation/bottombar/bottomBar";
import Sidebar from "@/components/navigation/sidebar/sidebar";
import Topbar from "@/components/navigation/topbar/topbar";
import React from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 md:pl-18">
        <Topbar />

        <main className="flex-1 md:mb-0 mb-12 p-1 md:p-2 lg:p-4">{children}</main>
      </div>
      <BottomBar />
    </div>
  );
}
