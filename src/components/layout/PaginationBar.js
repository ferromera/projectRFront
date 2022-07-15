import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useSearchParams } from "react-router-dom";

const pageSize = 10;
export default function PaginationBar({ getItems, onResponse, children }) {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagination, setPagination] = useState({
        count: 0,
        page: 1,
    });

    useEffect(() => {
        const page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
        trackPromise(
            getItems(page, pageSize).then((response) => {
                setPagination({ page: page, count: response.data.count });
                onResponse(response);
            })
        );
    }, [searchParams]);

    function handlePageChange(event, page) {
        searchParams.set("page", page);
        setSearchParams(searchParams);
        
    }

    if (pagination.count <= pageSize) return children;

    return (
        <div>
            <Box
                justifyContent={"center"}
                allignItems="center"
                display={"flex"}
                sx={{ marginBottom: "20px" }}
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
                sx={{ marginTop: "20px" }}
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
