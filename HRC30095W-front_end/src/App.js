import React, { useState } from "react";
import "./styles/main.css";
import Header from "./components/header/Header";
import DataTable from "./components/table/DataTable";
import ControlBar from "./components/control-bar/ControlBar";
import Footer from "./components/footer/Footer";
import ActionState from "./context/action/ActionState";
import AdvancedSearchState from "./context/advanced-search/AdvancedSearchState";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchValue = (value) => {
    setSearchValue(value);
  };
  return (
    <AdvancedSearchState>
      <ActionState>
        <Header />
        <ControlBar handleSearchValue={handleSearchValue} />
        <DataTable searchValue={searchValue} />
        <Footer />
      </ActionState>
    </AdvancedSearchState>
  );
}

export default App;
