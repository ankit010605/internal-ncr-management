import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
  } from "@mui/material";
  
  export default function ReportTable({ rows }) {
  
    return (
  
      <Table>
  
        <TableHead>
  
          <TableRow>
  
            <TableCell>NCR No</TableCell>
  
            <TableCell>Project</TableCell>
  
            <TableCell>Plant</TableCell>
  
            <TableCell>Contractor</TableCell>
  
            <TableCell>Status</TableCell>
  
            <TableCell>Issue Date</TableCell>
  
          </TableRow>
  
        </TableHead>
  
        <TableBody>
  
          {rows.map((row) => (
  
            <TableRow key={row.id} hover>
  
              <TableCell>{row.ncr_number}</TableCell>
  
              <TableCell>{row.project_name}</TableCell>
  
              <TableCell>{row.plant}</TableCell>
  
              <TableCell>{row.contractor}</TableCell>
  
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
  
              <TableCell>{row.issue_date}</TableCell>
  
            </TableRow>
  
          ))}
  
        </TableBody>
  
      </Table>
  
    );
  
  }