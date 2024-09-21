import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GetEmployees, DeleteEmployeeByID, GetPositions } from "./services/https";
import { EmployeeInterface } from "./interfaces/IEmployee";
import { PositionInterface } from "./interfaces/IPosition";
import { Col } from "antd";
export default function Users() {
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeInterface[]>([]);
  const [positions, setPositions] = useState<PositionInterface[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const searchFields = ["ID", "FirstName", "LastName", "Email", "Gender", "Date_of_Birth"];

  useEffect(() => {
    getEmployees();
    getPositions();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [searchKeyword, employees, positions]);

  const getEmployees = async () => {
    const res = await GetEmployees();
    if (res) {
      setEmployees(res);
      setFilteredEmployees(res);
    }
  };

  const getPositions = async () => {
    const res = await GetPositions();
    if (res) {
      setPositions(res);
    }
  };

  const handleEmployeeUpdate = (id: number) => {
    if (id) {
      window.location.href = `/login/employee/update/${id}`;
    }
  };

  const handleEmployeeDelete = async (id: number) => {
    if (id) {
      const success = await DeleteEmployeeByID(id);
      if (success) {
        alert("Employee deleted successfully");
        getEmployees(); // Refresh the list after deletion
      } else {
        alert("Failed to delete employee");
      }
    }
  };

  const handleClickOpen = (image?: string) => {
    if (image) {
      setSelectedImage(image);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const filterEmployees = () => {
    const filtered = employees.filter((employee) => {
      return searchFields.some(field => 
        String(employee[field as keyof EmployeeInterface] ?? "").toLowerCase().includes(searchKeyword.toLowerCase())
      ) || positions.find(pos => pos.ID === employee.PositionID)?.Position_Name?.toLowerCase().includes(searchKeyword.toLowerCase());
    });
    setFilteredEmployees(filtered);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      
        <Paper sx={{ p: 2 }}>
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Col span={12} style={{fontSize: "18px"}}>
          <h2 >Employee Management</h2>
        </Col>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={0}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search employees..."
              value={searchKeyword}
              onChange={handleSearchChange}
              sx={{
                mb: 2,
                width: '400px', // ตั้งค่าความกว้างตามต้องการ
                height: '50px', // ตั้งค่าความสูง
                fontSize: '16px', // ปรับขนาดฟอนต์ด้านใน
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <NavLink to='/login/employee/create'>
                <Button variant="contained" size="large" sx={{ px: 3, py: 1 }}>
                  <PlusOutlined />
                  Create
                </Button>
              </NavLink>
              </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Profile</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Position</TableCell>
                  <TableCell align="center">Date of Birth</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow
                    key={employee?.ID ?? ""}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {employee?.ID ?? ""}
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center">
                        <Avatar
                          src={employee?.Profile || ""}
                          alt="avatar"
                          className="profile"
                          sx={{
                            width: 70,
                            height: 70,
                            objectFit: 'fill',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleClickOpen(employee?.Profile)}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">{employee?.FirstName ?? ""}</TableCell>
                    <TableCell align="center">{employee?.LastName ?? ""}</TableCell>
                    <TableCell align="center">{employee?.Email ?? ""}</TableCell>
                    <TableCell align="center">{employee?.Gender ?? ""}</TableCell>
                    <TableCell align="center">
                      {positions.find((position) => position.ID === employee?.PositionID)?.Position_Name || "Unknown Position"}
                    </TableCell>
                    <TableCell align="center">
                      {employee?.Date_of_Birth
                        ? new Date(employee.Date_of_Birth).toLocaleDateString()
                        : "Date not available"}
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          size="large"
                          sx={{ mr: 1, px: 2 }}
                          onClick={() => handleEmployeeUpdate(employee?.ID ?? 0)}
                        >
                          <EditOutlined />
                        </Button>
                        <Button
                          size="large"
                          sx={{ color: "red", px: 2 }}
                          onClick={() => handleEmployeeDelete(employee?.ID ?? 0)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Profile Image</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <img
              src={selectedImage || ""}
              alt="Profile"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
