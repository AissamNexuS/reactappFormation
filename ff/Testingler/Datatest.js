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
import IconButton from "@mui/material/IconButton";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

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
    maxHeight: dense ? 400 : 50000,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSkip(top + skip);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setTop(parseInt(event.target.value));
    setSkip(0);
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

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
      setSkip(0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
      setSkip(skip - top);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
      setSkip(skip + top);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
      setSkip(Counte - top);
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
          sx={{
            color: "royalblue",
          }}
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
          sx={{
            color: "coral",
          }}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
          sx={{
            color: "coral",
          }}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
          sx={{
            color: "royalblue",
          }}
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

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
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
}

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
