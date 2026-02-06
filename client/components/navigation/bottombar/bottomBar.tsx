import { BriefcaseBusiness, Compass, HomeIcon, SquarePlus } from "lucide-react";
import ProfileIcon from "../profileIcon";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const data = [
  { title: "Home", icon: <HomeIcon className="" />, href: "/" },
  {
    title: "Explore",
    icon: <Compass className="" />,
    href: "/explore",
  },
  {
    title: "Create",
    icon: <SquarePlus className="" />,
    href: "/create",
  },
  {
    title: "Jobs",
    icon: <BriefcaseBusiness className="" />,
    href: "/jobs",
  },
  //   { title: "Messages", icon: <MessageCircle className="w-full h-full" />, href: "/chats" },
  //   { title: "Notifications", icon: <Bell className="w-full h-full" />, href: "#" },
  //   { title: "Settings", icon: <Settings className="w-full h-full" />, href: "#" },
];

function BottomBar() {
  return (
    <div className="flex items-center md:hidden justify-between fixed bottom-0 bg-sidebar w-full h-12 px-6 p-2 transition-all ease-in-out duration-200">
      {data.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className=" rounded-lg p-2 hover:bg-muted active:bg-muted active:scale-85 transition-all ease-in-out duration-200"
        >
          {item.icon}
        </Link>
      ))}
      <Link href={"/me"} className="active:scale-85 transition-transform">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}

export default BottomBar;
