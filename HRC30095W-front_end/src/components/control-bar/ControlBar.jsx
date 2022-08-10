import React from "react";
import ActionButton from "../control-options/ActionButton";
import ViewSelect from "../control-options/ViewSelect";


const ControlBar = ({ handleSearchValue }) => {
  return (
    <div className="control-bar">
      <ViewSelect />
      <div>
        <input
          type="text"
          placeholder="Search Customer Id"
          className="search-bar"
          // value={searchValue}
          onChange={(e) => {
            handleSearchValue(e.target.value);
            console.log(handleSearchValue);
          }}
        />
      </div>
   
      <ActionButton />
    </div>
  );
};

export default ControlBar;
