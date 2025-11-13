"use client";
import React, { useEffect, useState, useCallback } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { motion } from "framer-motion";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
  const token = localStorage.getItem("token");

  /** 🔹 Charger tous les utilisateurs */
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Fetching users with token:", token);
      const res = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Erreur chargement utilisateurs:", err);
      setSnackbar({ children: "Erreur de chargement", severity: "error" });
    } finally {
      setLoading(false);
    }
  }, [API_URL, token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /** 🔹 Supprimer un utilisateur */
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setSnackbar({ children: "Utilisateur supprimé", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ children: "Erreur suppression", severity: "error" });
    }
  };

  /** 🔹 Sauvegarder une modification inline */
  const handleProcessRowUpdate = async (newRow) => {
    try {
      const res = await axios.put(`${API_URL}/users/${newRow._id}`, newRow, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({
        children: "Modifications enregistrées",
        severity: "success",
      });
      return res.data.user;
    } catch (err) {
      console.error("Erreur update:", err);
      setSnackbar({ children: "Erreur mise à jour", severity: "error" });
      throw err;
    }
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  /** 🔹 Colonnes DataGrid */
  const columns = [
    { field: "firstName", headerName: "Prénom", flex: 1, editable: true },
    { field: "lastName", headerName: "Nom", flex: 1, editable: true },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "phone", headerName: "Téléphone", flex: 1, editable: true },
    { field: "job", headerName: "Métier", flex: 1, editable: true },
    {
      field: "role",
      headerName: "Rôle",
      flex: 0.8,
      editable: true,
      type: "singleSelect",
      valueOptions: ["user", "admin", "instructor"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.5,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Supprimer"
          onClick={() => handleDelete(params.row._id)}
        />,
      ],
    },
  ];

  if (loading)
    return (
      <Box className="flex justify-center items-center h-96">
        <CircularProgress />
      </Box>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Gestion des utilisateurs
      </Typography>

      <Box
        sx={{
          height: 600,
          width: "100%",
          bgcolor: "background.paper",
          boxShadow: 2,
          borderRadius: 2,
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      >
        <DataGrid
          rows={users}
          getRowId={(row) => row._id}
          columns={columns}
          pagination
          pageSizeOptions={[5, 10, 25]}
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={() =>
            setSnackbar({ children: "Erreur de sauvegarde", severity: "error" })
          }
          slots={{
            toolbar: GridToolbar,
          }}
          disableRowSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>

      {!!snackbar && (
        <Snackbar
          open
          onClose={handleCloseSnackbar}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            {...snackbar}
            onClose={handleCloseSnackbar}
            variant="filled"
            severity={snackbar.severity}
          >
            {snackbar.children}
          </Alert>
        </Snackbar>
      )}
    </motion.div>
  );
}
