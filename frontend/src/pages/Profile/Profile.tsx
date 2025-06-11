import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme/theme";
import { useTheme } from "@mui/material/styles";
import { InputChangeEvent } from "../../types/events";

// Mock user data - replace with actual user data from your backend
const mockUserData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 890",
  role: "Administrator",
  department: "IT",
  avatar: null, // URL to avatar image
};

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const [userData, setUserData] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the user data
    setIsEditing(false);
    setSuccess("Profile updated successfully!");
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleCancel = () => {
    setUserData(mockUserData); // Reset to original data
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    // Here you would typically make an API call to change the password
    setOpenPasswordDialog(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setSuccess("Password changed successfully!");
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleEmailChange = (e: InputChangeEvent) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handlePhoneChange = (e: InputChangeEvent) => {
    setUserData({ ...userData, phone: e.target.value });
  };

  const handleDepartmentChange = (e: InputChangeEvent) => {
    setUserData({ ...userData, department: e.target.value });
  };

  const handleCurrentPasswordChange = (e: InputChangeEvent) => {
    setPasswordData({
      ...passwordData,
      currentPassword: e.target.value,
    });
  };

  const handleNewPasswordChange = (e: InputChangeEvent) => {
    setPasswordData({
      ...passwordData,
      newPassword: e.target.value,
    });
  };

  const handleConfirmPasswordChange = (e: InputChangeEvent) => {
    setPasswordData({
      ...passwordData,
      confirmPassword: e.target.value,
    });
  };

  return (
    <Box width="100%" boxSizing="border-box" p={3}>
      <Typography
        variant="h4"
        fontWeight={600}
        mb={4}
        color={mode === "dark" ? tokens.grey[100] : tokens.grey[900]}
      >
        Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
          onClose={() => setSuccess(null)}
        >
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Picture Section */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={mode === "dark" ? 2 : 0}
            sx={{
              p: 3,
              backgroundColor:
                mode === "dark" ? tokens.grey[800] : tokens.grey[100],
              borderRadius: 2,
              textAlign: "center",
              color: mode === "dark" ? tokens.grey[100] : tokens.grey[900],
            }}
          >
            <Box position="relative" display="inline-block">
              <Avatar
                src={userData.avatar || undefined}
                sx={{
                  width: 150,
                  height: 150,
                  mb: 2,
                  bgcolor: tokens.primary.main,
                  color: "#fff",
                  border:
                    mode === "dark"
                      ? `2px solid ${tokens.primary.light}`
                      : undefined,
                }}
              >
                {userData.firstName[0]}
                {userData.lastName[0]}
              </Avatar>
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 20,
                  right: 0,
                  bgcolor:
                    mode === "dark" ? tokens.grey[700] : tokens.grey[200],
                  color: mode === "dark" ? tokens.grey[100] : tokens.grey[900],
                  "&:hover": {
                    bgcolor:
                      mode === "dark" ? tokens.grey[600] : tokens.grey[300],
                  },
                }}
              >
                <PhotoCameraIcon />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              gutterBottom
              color={mode === "dark" ? tokens.grey[100] : tokens.grey[900]}
            >
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography
              variant="body2"
              color={mode === "dark" ? tokens.grey[300] : "text.secondary"}
            >
              {userData.role}
            </Typography>
          </Paper>
        </Grid>

        {/* Profile Details Section */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={mode === "dark" ? 2 : 0}
            sx={{
              p: 3,
              backgroundColor:
                mode === "dark" ? tokens.grey[800] : tokens.grey[100],
              borderRadius: 2,
              color: mode === "dark" ? tokens.grey[100] : tokens.grey[900],
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography
                variant="h6"
                color={mode === "dark" ? tokens.grey[100] : tokens.grey[900]}
              >
                Personal Information
              </Typography>
              {!isEditing ? (
                <Button
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  variant="outlined"
                  color={mode === "dark" ? "secondary" : "primary"}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box>
                  <IconButton
                    onClick={handleSave}
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={handleCancel} color="error">
                    <CancelIcon />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  fullWidth
                  disabled={!isEditing}
                  InputLabelProps={{
                    style: {
                      color: mode === "dark" ? tokens.grey[300] : undefined,
                    },
                  }}
                  InputProps={{
                    style: {
                      color: mode === "dark" ? tokens.grey[100] : undefined,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                  fullWidth
                  disabled={!isEditing}
                  InputLabelProps={{
                    style: {
                      color: mode === "dark" ? tokens.grey[300] : undefined,
                    },
                  }}
                  InputProps={{
                    style: {
                      color: mode === "dark" ? tokens.grey[100] : undefined,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  value={userData.email}
                  onChange={handleEmailChange}
                  fullWidth
                  disabled={!isEditing}
                  InputLabelProps={{
                    style: {
                      color: mode === "dark" ? tokens.grey[300] : undefined,
                    },
                  }}
                  InputProps={{
                    style: {
                      color: mode === "dark" ? tokens.grey[100] : undefined,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  value={userData.phone}
                  onChange={handlePhoneChange}
                  fullWidth
                  disabled={!isEditing}
                  InputLabelProps={{
                    style: {
                      color: mode === "dark" ? tokens.grey[300] : undefined,
                    },
                  }}
                  InputProps={{
                    style: {
                      color: mode === "dark" ? tokens.grey[100] : undefined,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Department"
                  value={userData.department}
                  onChange={handleDepartmentChange}
                  fullWidth
                  disabled={!isEditing}
                  InputLabelProps={{
                    style: {
                      color: mode === "dark" ? tokens.grey[300] : undefined,
                    },
                  }}
                  InputProps={{
                    style: {
                      color: mode === "dark" ? tokens.grey[100] : undefined,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Divider
              sx={{
                my: 3,
                borderColor: mode === "dark" ? tokens.grey[700] : undefined,
              }}
            />

            <Box>
              <Typography
                variant="h6"
                mb={2}
                color={mode === "dark" ? tokens.grey[100] : tokens.grey[900]}
              >
                Security
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setOpenPasswordDialog(true)}
                color={mode === "dark" ? "secondary" : "primary"}
              >
                Change Password
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: mode === "dark" ? tokens.grey[900] : "#fff",
            color: mode === "dark" ? tokens.grey[100] : tokens.grey[900],
          },
        }}
      >
        <DialogTitle
          sx={{ color: mode === "dark" ? tokens.grey[100] : tokens.grey[900] }}
        >
          Change Password
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              margin="normal"
              value={passwordData.currentPassword}
              onChange={handleCurrentPasswordChange}
              InputLabelProps={{
                style: {
                  color: mode === "dark" ? tokens.grey[300] : undefined,
                },
              }}
              InputProps={{
                style: {
                  color: mode === "dark" ? tokens.grey[100] : undefined,
                },
              }}
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={passwordData.newPassword}
              onChange={handleNewPasswordChange}
              InputLabelProps={{
                style: {
                  color: mode === "dark" ? tokens.grey[300] : undefined,
                },
              }}
              InputProps={{
                style: {
                  color: mode === "dark" ? tokens.grey[100] : undefined,
                },
              }}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              margin="normal"
              value={passwordData.confirmPassword}
              onChange={handleConfirmPasswordChange}
              InputLabelProps={{
                style: {
                  color: mode === "dark" ? tokens.grey[300] : undefined,
                },
              }}
              InputProps={{
                style: {
                  color: mode === "dark" ? tokens.grey[100] : undefined,
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handlePasswordChange}
            variant="contained"
            color={mode === "dark" ? "secondary" : "primary"}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
