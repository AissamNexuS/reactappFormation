import * as React from "react";
import EnhancedTable from "./TableComponent";
import axios from "axios";
const Homepage = () => {
  const [Counte, setCounte] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState("name");
  const [skip, setSkip] = React.useState(0);
  const [top, setTop] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState([]);
  const [type, setType] = React.useState("id");
  const [order, setOrder] = React.useState("asc");
  const [query, setQuery] = React.useState("");
  console.log("selectedItem", selectedItem);

  const SkipFucn = (e) => {
    setSkip(top + skip);
  };

  const SkipmoisCounteFucn = (e) => {
    setSkip(Counte - top);
  };
  const SkipmoisFucn = (e) => {
    setSkip(skip - top);
  };
  const Skip0Fucn = (e) => {
    setSkip(e);
  };
  const TopFucn = (e) => {
    setTop(e);
  };
  const TypeFucn = (e) => {
    setType(e);
  };
  const OrdereFucn = (e) => {
    setOrder(e);
  };
  const QueryFucn = (e) => {
    setQuery(e);
  };
  const handalechangeItemSelected = (e) => {
    setSelectedItem(e);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  React.useEffect(() => {
    const DataApi = async () => {
      try {
        const Data = await axios.get(
          `https://api.yamiz.fr/api/v1/products?$top=${top}&$skip=${skip}&$q=${query}&$sort={${JSON.stringify(
            type
          )}:${JSON.stringify(order)}}`
          //&$expand=category
        );

        console.log(Data.data);
        setRows(Data?.data?.value);
        setCounte(Data.data.count);
      } catch (err) {
        console.log("err", err);
      }
    };
    DataApi();
  }, [top, skip, order, query, type]);

  const headCells = [
    {
      id: "name",
      label: "Names",
    },
    {
      id: "id",
      numeric: true,
      label: "ID",
    },
    {
      id: "packaging",
      numeric: true,
      label: "Packaging",
    },
    {
      id: "salePackaging",
      numeric: true,
      label: "Sale Packaging",
    },
    {
      id: "created_at",
      numeric: true,
      label: "Created at",
    },
  ];

  return (
    <div className="homepage">
      Hello
      <EnhancedTable
        rows={rows}
        headCells={headCells}
        getComparator={getComparator}
        Counte={Counte}
        SkipFucn={SkipFucn}
        SkipmoisFucn={SkipmoisFucn}
        Skip0Fucn={Skip0Fucn}
        TopFucn={TopFucn}
        TypeFucn={TypeFucn}
        SkipmoisCounteFucn={SkipmoisCounteFucn}
        QueryFucn={QueryFucn}
        ActiveCheckbox={false}
        OrdereFucn={OrdereFucn}
        handleRequestSort={handleRequestSort}
        handalechangeItemSelected={(e) => handalechangeItemSelected(e)}
      />
    </div>
  );
};
export default Homepage;
