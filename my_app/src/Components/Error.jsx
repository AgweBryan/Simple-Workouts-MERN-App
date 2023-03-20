import React from "react";

const Error = ({ error }) => {
  return (
    <div className="w-full border border-red-500 bg-red-200 rounded-md mt-3 text-red-500 p-1">
      {error}
    </div>
  );
};

export default Error;
