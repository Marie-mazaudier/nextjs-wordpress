import { BodyText } from "@jstemplate/ecommerce-ui";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { SearchCard } from "../search/SearchCard";

interface CategorySubMenuProps {
  setsearchOpen?: any;
  searchOpen?: any;
}
const SearchNavMenu = ({ setsearchOpen, searchOpen }: CategorySubMenuProps) => {
  const [search, setSearch] = React.useState<string>("");

  return (
    <div className="relative h-full">
      <nav className="py-7">
        <div className="relative flex flex-col gap-5">
          <div className="flex items-center justify-between px-6">
            <BodyText size="lg" intent="semibold" className=" text-themeSecondary800">
              Search
            </BodyText>
            <RxCross2
              className="text-themeSecondary400 font-bold text-2xl cursor-pointer transition hover:text-themePrimary600  hover:duration-700"
              onClick={() => {
                setsearchOpen(!searchOpen);
                setSearch("");
              }}
            />
          </div>
        </div>
        <div className="mt-6 px-7">
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="focus:outline-none bg-themWhite w-full px-5 h-14 rounded-l-lg"
              placeholder="Search product here......"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="bg-themePrimary600 p-[19px] rounded-lg">
              <FiSearch className="text-white text-xl" />
            </button>
          </div>
        </div>
      </nav>
      {searchOpen && <SearchCard search={search} />}
    </div>
  );
};

export default SearchNavMenu;
