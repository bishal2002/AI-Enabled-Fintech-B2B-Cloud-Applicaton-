import React, { useState } from "react";
import AdvancedSearchContext from "./AdvancedSearchContext";

const AdvancedSearchState = ({ children }) => {
  const [advancedSearchValue, setAdvancedSearchValue] = useState({
    document_id: "",
    invoice_id: "",
    customer_number: "",
    business_year: "",
  });
  return (
    <AdvancedSearchContext.Provider
      value={{ advancedSearchValue, setAdvancedSearchValue }}
    >
      {children}
    </AdvancedSearchContext.Provider>
  );
};

export default AdvancedSearchState;
