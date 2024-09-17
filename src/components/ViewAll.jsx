import React from "react";

const ViewAll = ({ text, showButton }) => {
  return (
    <div className="flex justify-between items-center p-4">
      <p className="font-bold">{text}</p>
      {showButton && (
        <button className="text-primarycolor px-4">View All</button>
      )}
    </div>
  );
};
export default ViewAll;
