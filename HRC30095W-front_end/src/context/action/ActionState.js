import React, { useState } from "react";
import ActionContext from "./ActionContext";

const ActionState = ({ children }) => {
  const [actionData, setActionData] = useState({
    edit: {
      editActive: false,
      editData: null,
    },
    delete: {
      deleteActive: false,
      deleteId: "",
    },
    refresh: 1,
  });

  return (
    <ActionContext.Provider value={{ actionData, setActionData }}>
      {children}
    </ActionContext.Provider>
  );
};

export default ActionState;
