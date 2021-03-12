import React, { useState }  from "react";

function Pagination({ nombrePerPage, nombreTotal, paginate }) {

  const [currentPage,setCurrentPage] = useState(1);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(nombreTotal / nombrePerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <ul className="flex flex-row space-x-2 my-1">
      <li
        className=" cursor-pointer rounded-lg px-2 bg-green-300  hover:bg-green-600"
        onClick={() => {
          paginate(1);
          setCurrentPage(1);
        }}
      >
        {"<<"}
      </li>
      {pageNumber.map((number) => (
        <li
          key={number}
          className={"px-2 py-1 w-2/3 cursor-pointer rounded-md border-green-600 hover:bg-green-600 hover:text-white"+(currentPage === number?" bg-green-600": " ")}
          onClick={() => {
            paginate(number);
            setCurrentPage(number)
          }}
        >
          {number}
        </li>
      ))}
      <li
        className=" cursor-pointer  rounded-md px-2 bg-green-300  hover:bg-green-600"
        onClick={() => {
          paginate(pageNumber.length);
          setCurrentPage(pageNumber.length)
        }}
      >
        {">>"}
      </li>
    </ul>
  );
}

export default Pagination;
