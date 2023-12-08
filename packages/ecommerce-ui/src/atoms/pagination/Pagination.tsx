import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  totalCount?: any;
  showPerPage?: any;
  handlePageChange?: any;
}

export const Pagination = ({ totalCount, showPerPage, handlePageChange }: PaginationProps) => {
  const pages = Math.ceil(totalCount / showPerPage);

  const numberOfPages = [];
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  return (
    <>
      <div className="flex items-center justify-center gap-3 mt-20">
        <ReactPaginate
          pageCount={numberOfPages.length}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={(data) => {
            handlePageChange(data);
          }}
          breakLabel={
            <button className="flex items-center justify-center text-base bg-themePrimary600 hover:bg-themeSecondary800 transition duration-300 ease-in-out  text-white rounded-lg px-3 py-1">
              ...
            </button>
          }
          previousLabel={false}
          nextLabel={false}
          onPageActive={(data) => {
            handlePageChange(data);
          }}
          containerClassName={`flex flex-row flex-nowrap gap-3 justify-between md:justify-center items-center`}
          pageLinkClassName={`flex items-center justify-center text-base bg-themePrimary600 hover:bg-themeSecondary800 transition duration-300 ease-in-out text-white rounded-lg px-3 py-1`}
          breakLinkClassName={`flex items-center justify-center text-base bg-themePrimary600 hover:bg-themeSecondary800 transition duration-300 ease-in-out text-white rounded-lg`}
          activeLinkClassName={`flex items-center justify-center text-base bg-themeSecondary800 transition duration-300 ease-in-out  text-white rounded-lg px-3 py-1`}  
        />
      </div>
    </>
  );
};
