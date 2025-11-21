"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Modal,
  TextField,
  MenuItem,
  Button,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import LockResetIcon from "@mui/icons-material/LockReset";
import axios from "axios";

export default function AdminUsers() {
  const API_URL = "https://formation-server.onrender.com/api/admin/users";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowModesModel, setRowModesModel] = useState({});
  const [snackbar, setSnackbar] = useState(null);

  const [openCreate, setOpenCreate] = useState(false);
  const emptyUser = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    job: "",
    role: "student",
    avatar: "",
    password: "",
  };
  const [newUser, setNewUser] = useState(emptyUser);

  /** FETCH USERS */
  const fetchUsers = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data); // make sure backend returns { users: [...] }
    } catch (err) {
      console.error(err);
      setSnackbar({ children: "Erreur lors du chargement", severity: "error" });
    } finally {
      setLoading(false);
    }
  }, [API_URL, token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /** CREATE USER */
  const handleCreateUser = async () => {
    try {
      const res = await axios.post(
        "https://formation-server.onrender.com/api/register",
        newUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers((prev) => [...prev, res.data.user]);
      setOpenCreate(false);
      setSnackbar({
        children: "Utilisateur créé avec succès",
        severity: "success",
      });
      setNewUser(emptyUser);
    } catch (err) {
      console.error(err);
      setSnackbar({
        children: "Erreur lors de la création",
        severity: "error",
      });
    }
  };

  /** DELETE USER */
  const handleDeleteClick = (id) => async () => {
    if (!confirm("Supprimer cet utilisateur ?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
      setSnackbar({ children: "Utilisateur supprimé", severity: "success" });
    } catch {
      setSnackbar({
        children: "Erreur lors de la suppression",
        severity: "error",
      });
    }
  };

  /** RESET PASSWORD */
  const handleResetPassword = (id) => async () => {
    if (!confirm("Réinitialiser le mot de passe ?")) return;

    try {
      await axios.post(
        `${API_URL}/${id}/reset-password`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSnackbar({
        children: "Mot de passe réinitialisé",
        severity: "success",
      });
    } catch {
      setSnackbar({
        children: "Erreur lors de la réinitialisation",
        severity: "error",
      });
    }
  };

  /** EDIT MODE */
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  /** UPDATE USER */
  const processRowUpdate = async (newRow) => {
    try {
      const res = await axios.put(`${API_URL}/${newRow._id}`, newRow, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ children: "Utilisateur mis à jour", severity: "success" });
      return res.data.user;
    } catch (err) {
      console.error(err);
      setSnackbar({
        children: "Erreur lors de la mise à jour",
        severity: "error",
      });
      throw err;
    }
  };

  /** COLUMNS */
  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 70,
      renderCell: (params) => (
        <Avatar src={params.row.avatar || "/default-avatar.png"} />
      ),
    },
    { field: "firstName", headerName: "Prénom", flex: 1, editable: true },
    { field: "lastName", headerName: "Nom", flex: 1, editable: true },
    { field: "email", headerName: "Email", flex: 1.5, editable: true },
    { field: "phone", headerName: "Téléphone", flex: 1, editable: true },
    { field: "job", headerName: "Métier", flex: 1, editable: true },
    {
      field: "role",
      headerName: "Rôle",
      flex: 1,
      type: "singleSelect",
      valueOptions: ["student", "instructor", "admin"],
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      width: 150,
      getActions: ({ id }) => {
        const isInEdit = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEdit)
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<LockResetIcon />}
            label="Reset"
            onClick={handleResetPassword(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
          />,
        ];
      },
    },
  ];

  if (loading)
    return (
      <Box className="flex justify-center items-center h-96">
        <CircularProgress />
      </Box>
    );

  return (
    <Box className="p-6">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h5" fontWeight="bold">
          Gestion des utilisateurs
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenCreate(true)}
        >
          Ajouter
        </Button>
      </Box>

      <DataGrid
        rows={users}
        getRowId={(row) => row._id}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        onRowEditStop={(params, e) => {
          if (params.reason === GridRowEditStopReasons.rowFocusOut)
            e.defaultMuiPrevented = true;
        }}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: GridToolbarQuickFilter }}
        pagination
      />

      {/* CREATE USER MODAL */}
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <Box
          sx={{
            p: 4,
            bgcolor: "white",
            width: 400,
            mx: "auto",
            mt: 10,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Créer un utilisateur
          </Typography>
          {["firstName", "lastName", "email", "phone", "job", "avatar"].map(
            (field) => (
              <TextField
                key={field}
                label={field}
                fullWidth
                margin="dense"
                value={newUser[field]}
                onChange={(e) =>
                  setNewUser({ ...newUser, [field]: e.target.value })
                }
              />
            )
          )}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <TextField
            label="Role"
            select
            fullWidth
            margin="dense"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="instructor">Instructor</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleCreateUser}
          >
            Enregistrer
          </Button>
        </Box>
      </Modal>

      {!!snackbar && (
        <Snackbar
          open
          onClose={() => setSnackbar(null)}
          autoHideDuration={3000}
        >
          <Alert severity={snackbar.severity}>{snackbar.children}</Alert>
        </Snackbar>
      )}
    </Box>
  );
}
