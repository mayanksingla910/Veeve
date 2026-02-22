import { LogOut, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

function AccountPopover() {
  return (
    <div className="flex flex-col gap-3 font-medium min-w-3xs">
      <Link href="/@me" className="p-2 flex gap-2 items-center hover:bg-muted/80 active:bg-muted/60 active:scale-95 transition-transform cursor-pointer rounded-lg">
        <Avatar className="size-16 text-xl">
          <AvatarImage src="" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <div>
          <p className="">Mayank Singla</p>
          <p className="text-sm text-muted-foreground">mayanksingla</p>
        </div>
      </Link>
      <div>
        <div className="flex gap-2 rounded-lg items-center p-2 px-3 hover:bg-muted active:bg-muted/80 active:scale-95 transition-transform cursor-pointer">
          <UserPlus className="size-5" />
          <span>Add Account</span>
        </div>
        <div className="flex gap-2 items-center rounded-lg text-destructive hover:bg-muted active:bg-muted/80 active:scale-95 p-2 px-3 transition-transform cursor-pointer">
          <LogOut className="size-5" />
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}

export default AccountPopover;
