import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Button,
  } from "@mui/material";
  
  export default function NCRTable({ rows, onRowClick }) {
  
    return (
  
      <Table>
  
        <TableHead>
  
          <TableRow>
  
            <TableCell>NCR No</TableCell>
  
            <TableCell>Project</TableCell>
  
            <TableCell>Plant</TableCell>
  
            <TableCell>Bay</TableCell>
  
            <TableCell>Contractor</TableCell>
  
            <TableCell>Responsible</TableCell>
  
            <TableCell>Status</TableCell>
  
            <TableCell>Issue Date</TableCell>
  
            <TableCell align="center">
              Action
            </TableCell>
  
          </TableRow>
  
        </TableHead>
  
        <TableBody>
  
          {rows.map((row) => (
  
            <TableRow
  key={row.id}
  hover
  sx={{ cursor: "pointer" }}
  onClick={() => onRowClick(row.id)}
>
  
              <TableCell>
  
                {row.ncr_number}
  
              </TableCell>
  
              <TableCell>
  
                {row.project_name}
  
              </TableCell>
  
              <TableCell>
  
                {row.plant}
  
              </TableCell>
  
              <TableCell>
  
                {row.bay}
  
              </TableCell>
  
              <TableCell>
  
                {row.contractor}
  
              </TableCell>
  
              <TableCell>
  
                {row.responsible_person}
  
              </TableCell>
  
              <TableCell>
  
                <Chip
                  label={row.status}
                  color={
                    row.status === "Open"
                      ? "error"
                      : "success"
                  }
                />
  
              </TableCell>
  
              <TableCell>
  
                {row.issue_date}
  
              </TableCell>
  
              <TableCell align="center">
  
              <Button
  variant="contained"
  size="small"
  onClick={(e) => {
    e.stopPropagation();
    onRowClick(row.id);
  }}
>
  View
</Button>
              </TableCell>
  
            </TableRow>
  
          ))}
  
        </TableBody>
  
      </Table>
  
    );
  
  }