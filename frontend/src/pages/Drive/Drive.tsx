import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Breadcrumbs,
  Link,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Upload as UploadIcon,
  CreateNewFolder as NewFolderIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme/theme";

// Mock data
const mockFolders = [
  {
    id: 1,
    name: "Documents",
    files: [{ id: 1, name: "report.pdf", size: "2.5MB" }],
  },
  {
    id: 2,
    name: "Images",
    files: [{ id: 2, name: "photo.jpg", size: "1.8MB" }],
  },
  {
    id: 3,
    name: "Projects",
    files: [{ id: 3, name: "project.zip", size: "45MB" }],
  },
];

const Drive: React.FC = () => {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openNewFolderDialog, setOpenNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Mock storage data
  const totalStorage = 2 * 1024; // 2GB in MB
  const usedStorage = 750; // 750MB used
  const storagePercentage = (usedStorage / totalStorage) * 100;

  const handleFolderClick = (folderName: string) => {
    setCurrentFolder(folderName);
  };

  const handleBack = () => {
    setCurrentFolder(null);
  };

  const handleUpload = () => {
    setOpenUploadDialog(false);
    // Implement file upload logic here
  };

  const handleCreateFolder = () => {
    setOpenNewFolderDialog(false);
    setNewFolderName("");
    // Implement folder creation logic here
  };

  return (
    <Box width="100%" boxSizing="border-box" p={3}>
      <Typography variant="h4" fontWeight={600} mb={4}>
        Drive
      </Typography>

      {/* Storage Usage Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: tokens.grey[100],
          borderRadius: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="h6">Storage Usage</Typography>
                <Typography variant="body2" color="text.secondary">
                  {`${usedStorage}MB of ${totalStorage}MB used`}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={storagePercentage}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: tokens.grey[200],
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 5,
                    backgroundColor: tokens.primary.main,
                  },
                }}
              />
              <Box display="flex" justifyContent="flex-end" mt={0.5}>
                <Typography variant="body2" color="text.secondary">
                  {`${Math.round(storagePercentage)}% used`}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<NewFolderIcon />}
                onClick={() => setOpenNewFolderDialog(true)}
              >
                New Folder
              </Button>
              <Button
                variant="contained"
                startIcon={<UploadIcon />}
                onClick={() => setOpenUploadDialog(true)}
              >
                Upload File
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Navigation Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          component="button"
          variant="body1"
          onClick={handleBack}
          sx={{ color: tokens.primary.main }}
        >
          Drive
        </Link>
        {currentFolder && (
          <Typography color="text.primary">{currentFolder}</Typography>
        )}
      </Breadcrumbs>

      {/* Content Section */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: tokens.grey[100],
          borderRadius: 2,
        }}
      >
        {currentFolder ? (
          // Files in current folder
          <List>
            {mockFolders
              .find((f) => f.name === currentFolder)
              ?.files.map((file) => (
                <ListItem
                  key={file.id}
                  secondaryAction={
                    <Typography variant="body2" color="text.secondary">
                      {file.size}
                    </Typography>
                  }
                >
                  <ListItemIcon>
                    <FileIcon sx={{ color: tokens.primary.main }} />
                  </ListItemIcon>
                  <ListItemText primary={file.name} />
                </ListItem>
              ))}
          </List>
        ) : (
          // Folders view
          <Grid container spacing={2}>
            {mockFolders.map((folder) => (
              <Grid item xs={12} sm={6} md={4} key={folder.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: tokens.grey[200],
                    },
                  }}
                  onClick={() => handleFolderClick(folder.name)}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <FolderIcon sx={{ color: tokens.secondary.main }} />
                    <Typography>{folder.name}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Upload Dialog */}
      <Dialog
        open={openUploadDialog}
        onClose={() => setOpenUploadDialog(false)}
      >
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Select a folder to upload your file:
            </Typography>
            <List>
              {mockFolders.map((folder) => (
                <ListItemButton
                  key={folder.id}
                  onClick={() => {
                    setCurrentFolder(folder.name);
                    setOpenUploadDialog(false);
                  }}
                >
                  <ListItemIcon>
                    <FolderIcon sx={{ color: tokens.secondary.main }} />
                  </ListItemIcon>
                  <ListItemText primary={folder.name} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUploadDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog
        open={openNewFolderDialog}
        onClose={() => setOpenNewFolderDialog(false)}
      >
        <DialogTitle>Create New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
            fullWidth
            variant="outlined"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewFolderDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateFolder} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Drive;
