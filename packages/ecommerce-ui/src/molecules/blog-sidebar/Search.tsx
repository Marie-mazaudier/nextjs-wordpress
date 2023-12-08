import React from "react";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";

export const Search = () => {
  const router = useRouter();

  const [search, setSearch] = React.useState("");
 

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: "/blog/search",
      query: { query: search },
    });
    setSearch("");
  };
  return (
    <div className="border rounded-2xl p-7">
      <BodyText size="xl" intent="medium" className="text-thmeBlackLight mb-6">
        Search
      </BodyText>
      <form action="">
        <div className="flex items-center">
          <input
            type="text"
            className="focus:outline-none bg-themWhite w-full px-5 h-14 rounded-l-lg"
            placeholder="Search Post..."
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
          <button onClick={handleClick} type="submit" className="bg-themePrimary600 h-14 w-14 rounded-r-lg">
            <FiSearch className="w-5 h-5 text-white mx-auto" />
          </button>
        </div>
      </form>
    </div>
  );
};
