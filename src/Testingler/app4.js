import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";

const SERVER_OPTIONS = {
  useCursorPagination: true,
};

const { columns, initialState, useQuery } = createFakeServer(
  {},
  SERVER_OPTIONS
);

export default function App4() {
  const mapPageToNextCursor = React.useRef({});
  const [pagesSize, setPagesSize] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const queryOptions = React.useMemo(
    () => ({
      cursor: mapPageToNextCursor.current[page - 1],
      pageSize: pagesSize,
    }),
    [page]
  );

  /*const pagesSize = 5;*/

  const { isLoading, data, pageInfo } = useQuery(queryOptions);

  const handlePageChange = (newPage) => {
    // We have the cursor, we can allow the page transition.
    if (newPage === 0 || mapPageToNextCursor.current[newPage - 1]) {
      setPage(newPage);
    }
  };

  React.useEffect(() => {
    if (!isLoading && pageInfo?.nextCursor) {
      // We add nextCursor when available
      mapPageToNextCursor.current[page] = pageInfo?.nextCursor;
    }
  }, [page, isLoading, pageInfo?.nextCursor]);

  /*
  # Some API clients return undefined while loading
  Following lines are here to prevent `rowCountState` from being undefined during the loading
  */
  const [rowCountState, setRowCountState] = React.useState(
    pageInfo?.totalRowCount || 0
  );

  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalRowCount !== undefined
        ? pageInfo?.totalRowCount
        : prevRowCountState
    );
  }, [pageInfo?.totalRowCount, setRowCountState]);

  return (
    <div
      style={{
        height: 500,
        width: "100%",
        backgroundColor: "#CcCCCC",
        borderRadius: "40px",
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        initialState={initialState}
        pagination
        pageSize={pagesSize}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        rowCount={rowCountState}
        paginationMode="server"
        onPageChange={handlePageChange}
        page={page}
        onPageSizeChange={(newPageSize) => setPagesSize(newPageSize)}
        loading={isLoading}
      />
    </div>
  );
}
