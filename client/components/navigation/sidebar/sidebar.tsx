import {
  Bell,
  BriefcaseBusiness,
  Compass,
  HomeIcon,
  MessageCircle,
  Settings,
  SquarePlus,
} from "lucide-react";
import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
} from "@/components/ui/shadcn-io/dock";

const data = [
  { title: "Home", icon: <HomeIcon className="w-full h-full" />, href: "/" },
  { title: "Explore", icon: <Compass className="w-full h-full" />, href: "/explore" },
  { title: "Jobs", icon: <BriefcaseBusiness className="w-full h-full" />, href: "/jobs" },
  { title: "Create", icon: <SquarePlus className="w-full h-full" />, href: "#" },
  { title: "Messages", icon: <MessageCircle className="w-full h-full" />, href: "/chats" },
  { title: "Notifications", icon: <Bell className="w-full h-full" />, href: "#" },
  { title: "Settings", icon: <Settings className="w-full h-full" />, href: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-18 bg-sidebar hidden md:flex justify-center border-r border-sidebar-border z-50">
      <Dock className="top-1/6 absolute">
        {data.map((item) => (
          <DockItem
            key={item.title}
            href={item.href}
            className="aspect-square rounded-full hover:bg-muted active:bg-sidebar-primary active:text-sidebar-primary-foreground"
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon className="fill-sidebar-accent-foreground">
              {item.icon}
            </DockIcon>
          </DockItem>
        ))}
      </Dock>
    </aside>
  );
}