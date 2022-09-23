import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { GetApi } from "../api/Api";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const GetTableData = async () => {
    try {
      await GetApi().then((res) => {
        setData(res?.data);
      });
      toast("Calling Api Every 5 seconds");
    } catch (err) {
      console.log(err);
      toast("Something went wrong");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      GetTableData();
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Card>
      <Box
        sx={{
          mt: 2,
          mx: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">UI Table</Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" spacing={2}>
                #
              </TableCell>
              <TableCell align="center" spacing={2}>
                Symbol
              </TableCell>
              <TableCell align="center" spacing={2}>
                Open Price
              </TableCell>
              <TableCell align="center" spacing={2}>
                Ask Price
              </TableCell>
              <TableCell align="center" spacing={2}>
                Count
              </TableCell>
              <TableCell align="center" spacing={2} />
              <TableCell align="center" spacing={2} />
              <TableCell align="center" spacing={2} />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length !== 0 ? (
              data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center" spacing={2}>
                    {index}
                  </TableCell>
                  <TableCell align="center" spacing={2}>
                    {item?.symbol}
                  </TableCell>
                  <TableCell align="center" spacing={2}>
                    {item?.openPrice}
                  </TableCell>
                  <TableCell align="center" spacing={2}>
                    {item?.askPrice}
                  </TableCell>
                  <TableCell align="center" spacing={2}>
                    {item?.count}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan="7">
                  Please Wait For Five Seconds
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </Card>
  );
};

export default Dashboard;
