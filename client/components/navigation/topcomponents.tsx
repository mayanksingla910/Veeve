"use client";

import { Bell, Send } from "lucide-react";

const data = [
  { title: "Notifications", icon: <Bell className="" />, href: "#" },
  { title: "Messages", icon: <Send className="" />, href: "/chats" },
];

function TopComponents() {
  return (
    <div className="flex md:hidden items-center gap-1 p-1">
      {data.map((item) => (
        <div
          key={item.title}
          className="rounded-lg p-1 active:scale-85 transition-transform ease-in-out duration-200"
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}

export default TopComponents;
