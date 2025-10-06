// ✅ src/pages/Facturas.tsx
import React, { useEffect, useState } from "react";
import { getFacturas, emitirFactura } from "../services/facturasService";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  TextField,
  CircularProgress,
} from "@mui/material";
import DashboardLayout from "../layout/DashboardLayout";

export default function Facturas() {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    rfcEmisor: "AAA010101AAA",
    rfcReceptor: "BBB010101BBB",
    total: "",
  });

  // 🔹 Cargar lista de facturas
  const cargarFacturas = async () => {
    try {
      setLoading(true);
      const data = await getFacturas();
      setFacturas(data);
    } catch (error) {
      console.error("❌ Error al cargar facturas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarFacturas();
  }, []);

  // 🔹 Enviar factura al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emitirFactura(form);
      setOpen(false);
      setForm({ rfcEmisor: "AAA010101AAA", rfcReceptor: "BBB010101BBB", total: "" });
      cargarFacturas(); // recarga la lista
    } catch (error) {
      console.error("❌ Error al emitir CFDI:", error);
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Listado de CFDI Emitidos
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => setOpen(true)}
        >
          + Emitir CFDI
        </Button>

        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>UUID</TableCell>
                <TableCell>RFC Emisor</TableCell>
                <TableCell>RFC Receptor</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Estatus</TableCell>
                <TableCell>Fecha Timbrado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facturas.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.uuid}</TableCell>
                  <TableCell>{row.rfcEmisor}</TableCell>
                  <TableCell>{row.rfcReceptor}</TableCell>
                  <TableCell>${parseFloat(row.total).toFixed(2)}</TableCell>
                  <TableCell>{row.estatus}</TableCell>
                  <TableCell>
                    {new Date(row.fechaTimbrado).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* 🔹 Modal para emitir factura */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 3,
              bgcolor: "background.paper",
              width: 400,
              mx: "auto",
              mt: "10%",
              borderRadius: 2,
              boxShadow: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" textAlign="center" fontWeight="bold">
              Emitir nueva factura
            </Typography>

            <TextField
              label="RFC Emisor"
              name="rfcEmisor"
              value={form.rfcEmisor}
              onChange={(e) => setForm({ ...form, rfcEmisor: e.target.value })}
              required
            />
            <TextField
              label="RFC Receptor"
              name="rfcReceptor"
              value={form.rfcReceptor}
              onChange={(e) => setForm({ ...form, rfcReceptor: e.target.value })}
              required
            />
            <TextField
              label="Total"
              type="number"
              name="total"
              value={form.total}
              onChange={(e) => setForm({ ...form, total: e.target.value })}
              required
            />
            <Button type="submit" variant="contained" color="success">
              Timbrar CFDI
            </Button>
          </Box>
        </Modal>
      </Box>
    </DashboardLayout>
  );
}
