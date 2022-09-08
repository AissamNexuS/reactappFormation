import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

const SwitchForPadding = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function StickyHeadTable(props) {
  const [Counte, setCounte] = React.useState(0);
  const [skip, setSkip] = React.useState(0);
  const [top, setTop] = React.useState(5);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [sort, setSort] = React.useState();
  const [orderBy, setOrderBy] = React.useState("Name");
  const [order, setOrder] = React.useState("asc");
  React.useEffect(() => {
    const DataApi = async () => {
      try {
        const Data = await axios.get(
          `https://api.yamiz.fr/api/v1/products?$top=${top}&$skip=${skip}&$q=${query}&$sort=${sort}`
          //&$expand=category
        );
        console.log(Data.data);
        setRows(Data?.data?.value);
        setCounte(Data.data.count);
      } catch (err) {
        console.log("err", err);
      }
    };
    if (query.length === 0 || query.length >= 2) DataApi();
  }, [top, skip, query, sort]);

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "id", label: "ID", minWidth: 100 },
    {
      id: "packaging",
      label: "packaging",
      minWidth: 170,
      // align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "salePackaging",
      label: "sale Packaging",
      minWidth: 170,
      // align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "reference",
      label: "reference",
      minWidth: 100,
      // align: "right",
      format: (value) => value.toDateString(),
    },
  ];

  const Pading = {
    maxHeight: dense ? 5000 : 400,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSkip(top + skip);

    const backSkip = (skip / top) * newPage;

    console.log("skip===> :", backSkip);
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
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setTop(parseInt(event.target.value));
    setPage(0);
  };
  console.log("top ====", top, "skip :", skip);
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  return (
    <Paper
      sx={{
        backgroundColor: "#FFF",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "auto",
          maxWidth: "100%",
          margin: 2,
          marginX: 36,
        }}
      >
        <TextField
          style={{
            backgroundColor: "#EEE",
          }}
          fullWidth
          label="Search"
          id="Search"
          onChange={(event) => [setQuery(event.target.value), setSkip(0)]}
        />{" "}
      </Box>
      <FormGroup>
        <FormControlLabel
          control={
            <SwitchForPadding
              sx={{ m: 1 }}
              checked={dense}
              onChange={handleChangeDense}
            />
          }
          label="padding ?"
        />
      </FormGroup>
      <TableContainer sx={Pading}>
        <Table
          stickyHeader
          aria-label="sticky table"
          style={{
            backgroundColor: "#EEE",
          }}
        >
          <TableHead>
            <TableRow>
              {/* stableSort(rows, getComparator(order, orderBy)) */}
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.id}
                    style={{ backgroundColor: "#CCC" }}
                  >
                    <TableSortLabel
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={createSortHandler(column.id)}
                    >
                      {column.label}
                      <Box component="span" sx={visuallyHidden}></Box>
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Counte}
        rowsPerPage={rowsPerPage}
        page={page}
        style={{
          backgroundColor: "#CCCCCc",
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
