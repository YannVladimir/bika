import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import { tokens } from "../theme/theme";

const documentTypes = [
  { id: "type1", name: "Document Type 1" },
  { id: "type2", name: "Document Type 2" },
  { id: "type3", name: "Document Type 3" },
];

const ArchivaPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachment(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would handle the form submission, e.g., upload the document
    console.log("Document Type:", selectedType);
    console.log("Attachment:", attachment);
    handleClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: tokens.primary.main }}
        >
          Archiva
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            bgcolor: tokens.primary.main,
            "&:hover": { bgcolor: tokens.primary.dark },
          }}
        >
          Upload Document
        </Button>
      </Box>

      <List>
        {/* Folder list would go here, similar to DrivePage but without size representation */}
        <ListItem>
          <ListItemText primary="Folder 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Folder 2" />
        </ListItem>
      </List>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="upload-document-modal"
        aria-describedby="upload-document-form"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              Upload Document
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              select
              fullWidth
              label="Document Type"
              value={selectedType}
              onChange={handleTypeChange}
              margin="normal"
              required
            >
              {documentTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
            <input
              accept="image/*,.pdf,.doc,.docx"
              style={{ display: "none" }}
              id="attachment-input"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="attachment-input">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{ mt: 2 }}
              >
                Select Attachment
              </Button>
            </label>
            {attachment && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {attachment.name}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: tokens.primary.main,
                "&:hover": { bgcolor: tokens.primary.dark },
              }}
            >
              Upload
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ArchivaPage;
