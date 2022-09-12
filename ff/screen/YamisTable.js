import * as React from "react";
import MuiTable from "./muiTable";
import axios from "axios";

const YamisTable = () => {
  const [Counte, setCounte] = React.useState(0);
  const [skip, setSkip] = React.useState(0);
  const [top, setTop] = React.useState(5);
  const [query, setQuery] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [type, setType] = React.useState("id");
  const [order, setOrder] = React.useState("asc");
  React.useEffect(() => {
    const DataApi = async () => {
      try {
        const Data = await axios.get(
          `https://api.yamiz.fr/api/v1/products?$top=${top}&$skip=${skip}&$q=${query}&$sort={${JSON.stringify(
            type
          )}:${JSON.stringify(order)}}`
        );
        //&$expand=category
        console.log(Data.data);
        setRows(Data?.data?.value);
        setCounte(Data.data.count);
      } catch (err) {
        console.log("err", err);
      }
    };
    if (query.length === 0 || query.length >= 2) DataApi();
  }, [top, skip, query, order, type]);
  return (
    <div>
      <MuiTable
        rows={rows}
        skip={skip}
        top={top}
        Counte={Counte}
        query={query}
        order={order}
      />
    </div>
  );
};

export default YamisTable;
