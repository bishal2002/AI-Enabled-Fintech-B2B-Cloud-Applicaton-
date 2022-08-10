import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ActionContext from "../../context/action/ActionContext";
import AdvancedSearchContext from "../../context/advanced-search/AdvancedSearchContext";

const columns = [
  {field: "sl_no", headerName: "Sl No.", width: 90 },
  {field: "business_code",headerName: "Business Code",width: 150,editable: true,},
  {field: "cust_number",headerName: "Customer Number",width: 150,editable: true,},
  {field: "clear_date",headerName: "Clear Date",width: 150,editable: true,},
  {field: "buisness_year",headerName: "Business Year",width: 150,editable: true,},
  {field: "doc_id",headerName: "Document Id",width: 150,editable: true,},
  {field: "posting_date",headerName: "Posting Date",width: 150,editable: true,},
  {field: "document_create_date",headerName: "Document Create Date",width: 200,editable: true,},
  {field: "due_in_date",headerName: "Due In Date",width: 150,editable: true,},
  {field: "invoice_currency",headerName: "Invoice Currency",width: 150,editable: true,},
  {field: "document_type",headerName: "Document Type",width: 150,editable: true,},
  {field: "posting_id",headerName: "Posting Id",type: "number",width: 150,editable: true,},
  {field: "total_open_amount",headerName: "Total Open Amount",type: "number",width: 150,editable: true,},
  {field: "baseline_create_date",headerName: "Baseline Create Date",width: 180,editable: true,},
  {field: "cust_payment_terms",headerName: "Customer Payment Terms",width: 190,editable: true,},
  {field: "invoice_id",headerName: "Invoice ID",width: 150,editable: true,},
  {field: "aging_bucket",headerName: "Aging Bucket",width: 150,editable: true,},
];

const DataTable = ({ searchValue }) => {
  const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [apiData, setApiData] = useState([]);
  // console.log("coming from parent", searchValue);

  const { actionData, setActionData } = useContext(ActionContext);
  const { advancedSearchValue } = useContext(AdvancedSearchContext);

  // console.log("advanced searach values", advancedSearchValue);
  // console.log("action data", actionData);

  //to initially load api data

  useEffect(() => {
    fetch(`http://localhost:8080/High/GetData`)
      .then((data) => data.json())
      .then((data) => {
        setApiData(data);
        setTableData(data);
        console.log(data);
      });
  }, [actionData.refresh]);


  //to search with primary search field
  useEffect(() => {
    if (searchValue !== "") {
      const newData = apiData.filter(
        (value) =>
          value.cust_number.toString().includes(searchValue) ||
          value.doc_id.toString().includes(searchValue) ||
          value.invoice_id.toString().includes(searchValue) ||
          value.buisness_year.toString().includes(searchValue)
      );
      setTableData(newData);
    } else {
      setTableData(apiData);
    }
  }, [searchValue]);

  //to search with advanced search field
  useEffect(() => {
    handleAdvancedSearch(advancedSearchValue);
  }, [advancedSearchValue]);

  const handleAdvancedSearch = (advancedSearchValue) => {
    const newData = apiData.filter(
      (value) =>
        value.cust_number
          .toString()
          .includes(advancedSearchValue.customer_number) &&
        value.doc_id.toString().includes(advancedSearchValue.document_id) &&
        value.invoice_id.toString().includes(advancedSearchValue.invoice_id) &&
        value.buisness_year
          .toString()
          .includes(advancedSearchValue.business_year)
    );
    setTableData(newData);
  };

  //refresh
  useEffect(() => {
    setTableData(apiData);
  }, [actionData.refresh]);

  const handleSelect = (id) => {
    if (id.length > 0) {
      const rowData = apiData.filter((value) => value.sl_no === id[0]);
      setActionData({
        ...actionData,
        edit: {
          editActive: true,
          editData: rowData,
        },
        delete: {
          deleteActive: true,
          deleteId: rowData,
        },
      });
    } else {
      setActionData({
        ...actionData,
        edit: {
          editActive: false,
          editData: null,
        },
        delete: {
          deleteActive: false,
          deleteId: "",
        },
      });
    }
  };

  return (
    <div
      style={{
        height: 480,
        width: "100%",
      }}
    >
      <DataGrid
        density="compact"
        getRowId={(row) => row.sl_no}
        rows={tableData}
        columns={columns}
        checkboxSelection
        pageSize={pageSize}
        onSelectionModelChange={(id) => {
          console.log("onselectionchange", id);
          handleSelect(id);
        }}
        disableSelectionOnClick
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 50]}
      />
    </div>
  );
};

export default DataTable;
