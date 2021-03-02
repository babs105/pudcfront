import React from "react";

function Pagination({ nombrePerPage, nombreTotal, paginate }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(nombreTotal / nombrePerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <ul className="flex flex-row space-x-2">
      <li
        className=" text-white cursor-pointer rounded-lg px-2 bg-green-300"
        onClick={() => {
          paginate(1);
        }}
      >
        {"<<"}
      </li>
      {pageNumber.map((number) => (
        <li
          key={number}
          className="px-2 py-1 cursor-pointer rounded-md text-white border-green-400 hover:bg-green-300 hover:text-white"
          onClick={() => {
            paginate(number);
          }}
        >
          {number}
        </li>
      ))}
      <li
        className=" text-white cursor-pointer  rounded-md px-2 bg-green-300"
        onClick={() => {
          paginate(pageNumber.length);
        }}
      >
        {">>"}
      </li>
    </ul>
  );
}

export default Pagination;
