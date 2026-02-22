import Searchbar from "../searchbar";
import ProfileIcon from "../profileIcon";
import TopComponents from "../topComponents";

function Topbar() {
  return (
    <div className="sticky top-0 z-50 flex w-full gap-1 md:gap-2 p-2 md:p-4 bg-background">
      <Searchbar />
      <div className="flex flex-1 justify-end">
        <ProfileIcon />
        <TopComponents />
      </div>
    </div>
  );
}

export default Topbar;
