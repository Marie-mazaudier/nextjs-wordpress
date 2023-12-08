import React from "react";
import { BodyText, Button } from "@jstemplate/ecommerce-ui";
import { SearchCard } from "../search/SearchCard";

const NavSearch = () => {
  const [search, setSearch] = React.useState<string>("");

  const bodyRef = React.useRef(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // @ts-ignore
      if (bodyRef.current && !(event.target instanceof Node && bodyRef.current.contains(event.target))) {
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bodyRef]);

  return (
    <div ref={bodyRef}>
      <div className="hidden lg:block">
        <div className="flex gap-0 items-center">
          <input
            className="pr-24 placeholder:text-themeSecondary400 text-themeSecondary800 outline-none text-base leading-6 px-5 py-3 bg-themeSecondary100 rounded-l-full w-full"
            placeholder="Search product here..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div>
            <Button color="dark" size="xl" className=" rounded-r-full py-4">
              <BodyText size="xs" intent="semibold" className="blanc">
                Search
              </BodyText>
            </Button>
          </div>
        </div>
      </div>
      <SearchCard search={search} />
    </div>
  );
};

export default NavSearch;
