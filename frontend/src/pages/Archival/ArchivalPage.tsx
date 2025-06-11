import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Modal,
  TextField,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Add as AddIcon,
  Close as CloseIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  CreateNewFolder as NewFolderIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme/theme";

// Types
interface DocumentType {
  id: string;
  name: string;
  fields: string[];
}
interface DocumentData {
  id: number;
  name: string;
  type: string;
  fields: { [key: string]: string };
  attachment: string;
}
interface FolderData {
  id: number;
  name: string;
  folders: FolderData[];
  documents: DocumentData[];
}

// Mock document types and fields
const documentTypes: DocumentType[] = [
  {
    id: "invoice",
    name: "Invoice",
    fields: ["Invoice Number", "Date", "Amount"],
  },
  {
    id: "contract",
    name: "Contract",
    fields: ["Contract Name", "Start Date", "End Date"],
  },
  { id: "report", name: "Report", fields: ["Report Title", "Author"] },
];

// Mock folder/document structure
const initialFolders: FolderData[] = [
  {
    id: 1,
    name: "Documents",
    folders: [
      {
        id: 4,
        name: "Subfolder A",
        folders: [],
        documents: [
          {
            id: 3,
            name: "Contract 2024",
            type: "contract",
            fields: {
              "Contract Name": "Service Agreement",
              "Start Date": "2024-01-01",
              "End Date": "2024-12-31",
            },
            attachment: "contract2024.pdf",
          },
        ],
      },
    ],
    documents: [
      {
        id: 1,
        name: "Invoice Jan",
        type: "invoice",
        fields: {
          "Invoice Number": "INV-001",
          Date: "2024-01-10",
          Amount: "1000",
        },
        attachment: "invoice_jan.pdf",
      },
    ],
  },
  {
    id: 2,
    name: "Images",
    folders: [],
    documents: [],
  },
  {
    id: 3,
    name: "Projects",
    folders: [],
    documents: [
      {
        id: 2,
        name: "Project Report",
        type: "report",
        fields: { "Report Title": "Q1 Progress", Author: "Alice" },
        attachment: "q1_report.pdf",
      },
    ],
  },
];

function findFolderByPath(
  folders: FolderData[],
  path: string[]
): FolderData | null {
  let current = folders;
  let folder = null;
  for (const name of path) {
    folder = current.find((f) => f.name === name);
    if (!folder) return null;
    current = folder.folders;
  }
  return folder || { id: -1, name: "Root", folders: folders, documents: [] };
}

const ArchivalPage: React.FC = () => {
  const [folders, setFolders] = useState<FolderData[]>(initialFolders);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [openUpload, setOpenUpload] = useState(false);
  const [openNewFolder, setOpenNewFolder] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [docFields, setDocFields] = useState<{ [key: string]: string }>({});
  const [newFolderName, setNewFolderName] = useState("");
  const [viewDoc, setViewDoc] = useState<DocumentData | null>(null);

  // Use a local type for currentFolder that allows fallback
  type FolderLike = FolderData;
  const fallbackFolder: FolderData = {
    id: -1,
    name: "Root",
    folders,
    documents: [],
  };
  const currentFolder: FolderLike =
    currentPath.length === 0
      ? fallbackFolder
      : findFolderByPath(folders, currentPath) || fallbackFolder;

  // Folder navigation
  const handleFolderClick = (name: string) => {
    setCurrentPath([...currentPath, name]);
  };
  const handleBack = (idx?: number) => {
    if (typeof idx === "number") setCurrentPath(currentPath.slice(0, idx + 1));
    else setCurrentPath([]);
  };

  // New Folder
  const handleCreateFolder = () => {
    if (!newFolderName) return;
    const addFolder = (folders: FolderData[], path: string[]): FolderData[] => {
      if (path.length === 0) {
        folders.push({
          id: Date.now(),
          name: newFolderName,
          folders: [],
          documents: [],
        });
        return folders;
      }
      return folders.map((f) =>
        f.name === path[0]
          ? { ...f, folders: addFolder(f.folders, path.slice(1)) }
          : f
      );
    };
    setFolders((prev) => addFolder([...prev], currentPath));
    setNewFolderName("");
    setOpenNewFolder(false);
  };

  // Upload Document
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
    setDocFields({});
  };
  const handleFieldChange = (field: string, value: string) => {
    setDocFields((prev) => ({ ...prev, [field]: value }));
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachment(event.target.files[0]);
    }
  };
  const handleUpload = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedType) return;
    const docType = documentTypes.find((t) => t.id === selectedType);
    if (!docType) return;
    const newDoc: DocumentData = {
      id: Date.now(),
      name: docFields[docType.fields[0]] || "Untitled Document",
      type: selectedType,
      fields: docFields,
      attachment: attachment ? attachment.name : "",
    };
    const addDoc = (folders: FolderData[], path: string[]): FolderData[] => {
      if (path.length === 0) {
        folders[0].documents.push(newDoc);
        return folders;
      }
      return folders.map((f) =>
        f.name === path[0]
          ? { ...f, folders: addDoc(f.folders, path.slice(1)) }
          : f
      );
    };
    setFolders((prev) =>
      addDoc([...prev], currentPath.length ? currentPath : [folders[0].name])
    );
    setOpenUpload(false);
    setSelectedType("");
    setDocFields({});
    setAttachment(null);
  };

  // View Document
  const handleViewDoc = (doc: DocumentData) => setViewDoc(doc);
  const handleCloseViewDoc = () => setViewDoc(null);

  return (
    <Box width="100%" boxSizing="border-box" p={3}>
      <Typography variant="h4" fontWeight={600} mb={4}>
        Document Archival
      </Typography>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          component="button"
          variant="body1"
          onClick={() => handleBack(-1)}
          sx={{ color: tokens.primary.main }}
        >
          Archival
        </Link>
        {currentPath.map((name, idx) => (
          <Link
            key={name}
            component="button"
            variant="body1"
            onClick={() => handleBack(idx)}
            sx={{ color: tokens.primary.main }}
          >
            {name}
          </Link>
        ))}
      </Breadcrumbs>
      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<NewFolderIcon />}
          onClick={() => setOpenNewFolder(true)}
        >
          New Folder
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenUpload(true)}
          sx={{
            bgcolor: tokens.primary.main,
            "&:hover": { bgcolor: tokens.primary.dark },
          }}
        >
          Upload Document
        </Button>
      </Box>
      {/* Folders and Documents Grid */}
      <Paper
        elevation={0}
        sx={{ p: 2, backgroundColor: tokens.grey[100], borderRadius: 2 }}
      >
        <Grid container spacing={2}>
          {currentFolder.folders &&
            currentFolder.folders.map((folder) => (
              <Grid item xs={12} sm={6} md={4} key={folder.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: tokens.grey[200] },
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
          {currentFolder.documents &&
            currentFolder.documents.map((doc) => (
              <Grid item xs={12} sm={6} md={4} key={doc.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: tokens.grey[200] },
                  }}
                  onClick={() => handleViewDoc(doc)}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <FileIcon sx={{ color: tokens.primary.main }} />
                    <Typography>{doc.name}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Paper>
      {/* New Folder Dialog */}
      <Dialog open={openNewFolder} onClose={() => setOpenNewFolder(false)}>
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
          <Button onClick={() => setOpenNewFolder(false)}>Cancel</Button>
          <Button onClick={handleCreateFolder} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {/* Upload Modal */}
      <Modal
        open={openUpload}
        onClose={() => setOpenUpload(false)}
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
            <IconButton onClick={() => setOpenUpload(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleUpload}>
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
            {/* Dynamic fields for document type */}
            {selectedType &&
              documentTypes
                .find((t) => t.id === selectedType)
                ?.fields.map((field) => (
                  <TextField
                    key={field}
                    label={field}
                    fullWidth
                    margin="normal"
                    value={docFields[field] || ""}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    required
                  />
                ))}
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
      {/* View Document Modal */}
      <Modal
        open={!!viewDoc}
        onClose={handleCloseViewDoc}
        aria-labelledby="view-document-modal"
        aria-describedby="view-document-details"
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
              {viewDoc?.name}
            </Typography>
            <IconButton onClick={handleCloseViewDoc} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          {viewDoc && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Type: {documentTypes.find((t) => t.id === viewDoc.type)?.name}
              </Typography>
              {Object.entries(viewDoc.fields).map(([field, value]) => (
                <Typography key={field} variant="body2">
                  <strong>{field}:</strong> {value}
                </Typography>
              ))}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Attachment:</strong> {viewDoc.attachment}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ArchivalPage;
