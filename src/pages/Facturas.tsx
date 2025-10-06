import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { getFacturas } from "../services/facturasService";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";

export default function Facturas() {
  const [facturas, setFacturas] = useState<any[]>([]);

  useEffect(() => {
    getFacturas().then(setFacturas).catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <Typography variant="h5" gutterBottom>Listado de CFDI Emitidos</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>UUID</TableCell>
            <TableCell>RFC Emisor</TableCell>
            <TableCell>RFC Receptor</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Estatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facturas.map((f) => (
            <TableRow key={f.uuid}>
              <TableCell>{f.uuid}</TableCell>
              <TableCell>{f.rfcEmisor}</TableCell>
              <TableCell>{f.rfcReceptor}</TableCell>
              <TableCell>${f.total}</TableCell>
              <TableCell>{f.estatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardLayout>
  );
}
