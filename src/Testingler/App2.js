import * as React from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import FormControlLabel from "@mui/material/FormControlLabel";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { visuallyHidden } from "@mui/utils";
import { styled, useTheme, alpha } from "@mui/material/styles";

import InputAdornment from "@mui/material/InputAdornment";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
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

export default function App2() {
  /**
   *@@@@@@@@@# all useState #@@@@@@@@@@@@@
   */
  const [Counte, setCounte] = React.useState(0);
  const [skip, setSkip] = React.useState(0);
  const [top, setTop] = React.useState(5);
  const [query, setQuery] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [type, setType] = React.useState("id");

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [hieghtes, setHieghtes] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  /**
   *@@@@@@@@@# Table row name #@@@@@@@@@@@@@
   */
  const headCells = [
    {
      id: "name",
      label: "Names",
    },
    {
      id: "id",
      label: "ID",
    },
    {
      id: "packaging",
      label: "Packaging",
    },
    {
      id: "salePackaging",
      label: "Sale Packaging",
    },
    {
      id: "created_at",
      label: "Created at",
    },
  ];

  /**
   *@@@@@@@@@# API Version #@@@@@@@@@@@@@
   */

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
    if (query.length === 0 || query.length >= 2) DataApi();
  }, [top, skip, query, order, type]);

  /**
   *@@@@@@@@@# orderBy #@@@@@@@@@@@@@
   */

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

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
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

  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="success"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              sx={{
                fontSize: "40",
                fontFamily: "revert-layer",
                fontWeight: "800",
                color: "#1A76D2",
              }}
              onClick={() => setType(headCell.id)}
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
      <>
        <Toolbar
          sx={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,

            bgcolor: (theme) =>
              alpha(theme.palette.grey[700], theme.palette.action.focusOpacity),
          }}
        >
          {numSelected > 0 ? (
            <Typography
              sx={{
                flex: "1 1 100%",
                fontSize: "40",
                fontFamily: "revert-layer",
                fontWeight: "800",
                color: "#2E7D32",
              }}
              variant="h6"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              variant="h6"
              sx={{
                flex: "1 1 100%",
                fontSize: "40",
                fontFamily: "revert-layer",
                fontWeight: "800",
                color: "#1A76D2",
              }}
              id="tableTitle"
              component="div"
            >
              DataBase
            </Typography>
          )}

          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
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
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSkip(top + skip);
    /*
     * const backSkip = (skip / top) * newPage;
     * console.log("backSkip===> :", backSkip);
     */
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setTop(parseInt(event.target.value));
    setSkip(0);
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleChangehieghtes = (event) => {
    setHieghtes(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const Pading = {
    maxHeight: hieghtes ? 300 : 5000,
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#FFF" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ManageSearchIcon />
                </InputAdornment>
              ),
            }}
            label="Search"
            id="Search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSkip(0);
            }}
          />
        </Box>

        <FormControlLabel
          control={
            <SwitchForPadding
              checked={hieghtes}
              onChange={handleChangehieghtes}
            />
          }
          label="Scroll "
        />
        <FormControlLabel
          sx={{
            marginX: 5,
          }}
          control={
            <SwitchForPadding checked={dense} onChange={handleChangeDense} />
          }
          label="padding "
        />

        <EnhancedTableToolbar numSelected={selected.length} />

        <TableContainer sx={Pading}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            style={{
              backgroundColor: "#CCC",
            }}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const cleanDate = new Date(row.created_at).toDateString();
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      style={{
                        backgroundColor: "#BBB",
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{
                          fontSize: "40",
                          fontFamily: "serif",
                          fontWeight: "500",
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "40",
                          fontFamily: "monospace",
                          fontWeight: "500",
                        }}
                        align="right"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "40",
                          fontFamily: "monospace",
                          fontWeight: "500",
                        }}
                        align="right"
                      >
                        {row.packaging}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "40",
                          fontFamily: "monospace",
                          fontWeight: "500",
                        }}
                        align="right"
                      >
                        {row.salePackaging}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "40",
                          fontFamily: "monospace",
                          fontWeight: "500",
                        }}
                        align="right"
                      >
                        {cleanDate}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
              {emptyRows > 0 && <TableRow></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Counte}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          ActionsComponent={TablePaginationActions}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            fontSize: "40",
            fontFamily: "serif",
            fontWeight: "500",
            backgroundColor: "#EEE",
          }}
        />
      </Paper>
    </Box>
  );
}
