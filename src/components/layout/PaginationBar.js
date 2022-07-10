import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";

const pageSize = 10;
export default function PaginationBar({ getItems, onResponse, children }) {
    const [pagination, setPagination] = useState({
        count: 0,
        page: 1,
    });

    useEffect(() => {
        trackPromise(
            getItems(pagination.page, pageSize).then((response) => {
                setPagination({ ...pagination, count: response.data.count });
                onResponse(response);
            })
        );
    }, [pagination.page]);

    function handlePageChange(event, page) {
        setPagination({ ...pagination, page: page });
    }

    if (pagination.count <= pageSize) return children;

    return (
        <div>
            <Box
                justifyContent={"center"}
                allignItems="center"
                display={"flex"}
                sx={{ margin: "20px 0px" }}
            >
                <Pagination
                    color="primary"
                    count={Math.ceil(pagination.count / pageSize)}
                    onChange={handlePageChange}
                    page={pagination.page}
                />
            </Box>
            {children}
            <Box
                justifyContent={"center"}
                allignItems="center"
                display={"flex"}
                sx={{ margin: "20px 0px" }}
            >
                <Pagination
                    color="primary"
                    count={Math.ceil(pagination.count / pageSize)}
                    onChange={handlePageChange}
                    page={pagination.page}
                />
            </Box>
        </div>
    );
}
