import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { usePostsBySearch } from "../../../lib/swr-wordpress/getPosts";
import { Breadcrumb, CategoryCards, Spaces, BodyText } from "@jstemplate/ecommerce-ui";

const blogs = () => {
  const router = useRouter();
  const SearchQuery = router?.query?.query;
  const [pageData, setPageData] = React.useState<number>(9);

  // ==================Get all post data using search query=================
  const { data: postsBySearch, isLoading } = usePostsBySearch(SearchQuery, {
    per_page: pageData,
  });
  const handleClick = () => {
    setPageData(pageData + 9);
  };

  const searchTitle = SearchQuery || "Searching";
  return (
    <div>
      <Head>
        <title>{`${searchTitle} | MetaShop`}</title>
        <meta name="description" content={`${SearchQuery} Page description`} />
      </Head>
      <Breadcrumb name={`Search Result: ${searchTitle}`} />
      <Spaces />
      {postsBySearch?.length === 0 && !isLoading && (
        <div className="flex  justify-center my-32">
          <BodyText size="xl" className="text-themeSecondary800 mt-5">
            No Result Found
          </BodyText>
        </div>
      )}
      {!isLoading && postsBySearch?.length > 0 && <CategoryCards data={postsBySearch} handleClick={handleClick} />}

      {isLoading && (
        <div className="flex justify-center my-32">
          <svg
            className={`ml-2 h-7 w-7 animate-spin text-red-500`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default blogs;
