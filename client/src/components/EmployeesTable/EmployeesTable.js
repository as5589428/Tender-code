import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthContext } from "context/AuthProvider";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const styles = {
  headingTable: { fontSize: 20 },
  tableContainer: { maxWidth: 600, marginBottom: 30 },
};

const EmployeesTable = ({ employeesData, onRemove, allowedRoles }) => (
  <>
    <p style={styles.headingTable}>List:</p>

    <TableContainer component={Paper} style={styles.tableContainer}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeesData.map((employee, index) => (
            <Employee
              key={employee._id}
              employee={employee}
              onRemove={onRemove}
              index={index}
              allowedRoles={allowedRoles}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

const Employee = ({ employee, onRemove, index, allowedRoles }) => {
  const { _id: id, name, surname, date } = employee;

  const navigate = useNavigate();
  const { auth } = useAuthContext();

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{index + 1}</TableCell>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell>{surname}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          startIcon={<ModeEditIcon />}
          onClick={() =>
            auth?.roles.filter((role) => allowedRoles.includes(role)).length
              ? navigate(`/update-employee/${id}`)
              : toast.error(
                  () =>
                    "You can not update the data. Only admin or editor can do it!",
                  toastConfig
                )
          }
        />
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() =>
            auth?.roles.find((role) => role === 5150)
              ? onRemove(id)
              : toast.error(
                  () => "You can not remove the data. Only admin can do it!",
                  toastConfig
                )
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default EmployeesTable;
