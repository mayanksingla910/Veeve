"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

function Searchbar() {

  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (search: string) => {
    if(search) router.push(`/search?q=${search}`);
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => {setSearch(e.target.value)}}
        className="bg-muted focus:bg-muted/50 shadow-none rounded-xl pl-10 md:!text-lg h-12 md:placeholder:text-lg placeholder:text-muted-foreground "
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
    </div>
  );
}

export default Searchbar;
