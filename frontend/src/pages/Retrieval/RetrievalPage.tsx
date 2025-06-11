import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Switch,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import {
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Close as CloseIcon,
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

const RetrievalPage: React.FC = () => {
  const [folders] = useState<FolderData[]>(initialFolders);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [viewDoc, setViewDoc] = useState<DocumentData | null>(null);
  const [advanced, setAdvanced] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [color, setColor] = useState("");
  const [docType, setDocType] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

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

  // Document view
  const handleViewDoc = (doc: DocumentData) => setViewDoc(doc);
  const handleCloseViewDoc = () => setViewDoc(null);

  // Filtered documents by search
  const filterDocuments = (docs: DocumentData[]) => {
    let filtered = docs;
    if (!advanced) {
      if (search) {
        filtered = filtered.filter((doc) =>
          doc.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      return filtered;
    }
    // Advanced search
    if (folderName) {
      // Not implemented: folder color, but you can add color property to FolderData if needed
      filtered = filtered.filter((doc) =>
        currentPath.join("/").toLowerCase().includes(folderName.toLowerCase())
      );
    }
    if (docType) {
      filtered = filtered.filter((doc) => doc.type === docType);
    }
    // Date range: assuming doc.fields.Date exists and is in YYYY-MM-DD
    if (dateFrom) {
      filtered = filtered.filter((doc) => {
        const date = doc.fields.Date;
        return date && date >= dateFrom;
      });
    }
    if (dateTo) {
      filtered = filtered.filter((doc) => {
        const date = doc.fields.Date;
        return date && date <= dateTo;
      });
    }
    return filtered;
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Document Retrieval
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => handleBack()}
          sx={{ cursor: "pointer" }}
        >
          Retrieval
        </Link>
        {currentPath.map((folder, idx) => (
          <Link
            key={folder}
            underline="hover"
            color="inherit"
            onClick={() => handleBack(idx)}
            sx={{ cursor: "pointer" }}
          >
            {folder}
          </Link>
        ))}
      </Breadcrumbs>
      {/* Advanced Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <TextField
            fullWidth
            label={advanced ? "Quick Search by Name" : "Search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by document name..."
            sx={{ mr: 2 }}
            disabled={advanced}
          />
          <FormControlLabel
            control={
              <Switch
                checked={advanced}
                onChange={() => setAdvanced((v) => !v)}
              />
            }
            label="Advanced Search"
          />
        </Box>
        {advanced && (
          <Box mt={2} display="flex" gap={2} flexWrap="wrap">
            <TextField
              label="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              sx={{ minWidth: 180 }}
            />
            <TextField
              label="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              sx={{ minWidth: 120 }}
              placeholder="e.g. Green"
            />
            <TextField
              select
              label="Document Type"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="">All</MenuItem>
              {documentTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Date From"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 150 }}
            />
            <TextField
              label="Date To"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 150 }}
            />
          </Box>
        )}
      </Paper>
      <Grid container spacing={3}>
        {currentFolder.folders.map((folder) => (
          <Grid item xs={12} sm={6} md={4} key={folder.id}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleFolderClick(folder.name)}
            >
              <FolderIcon sx={{ mr: 2, color: "#43a047" }} />
              <Typography>{folder.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {/* Documents in current folder */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Documents
        </Typography>
        <List>
          {filterDocuments(currentFolder.documents).map((doc) => (
            <ListItemButton key={doc.id} onClick={() => handleViewDoc(doc)}>
              <ListItemIcon>
                <FileIcon />
              </ListItemIcon>
              <ListItemText primary={doc.name} secondary={doc.type} />
            </ListItemButton>
          ))}
        </List>
      </Box>
      {/* Document View Dialog */}
      <Dialog
        open={!!viewDoc}
        onClose={handleCloseViewDoc}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {viewDoc?.name}
          <IconButton
            aria-label="close"
            onClick={handleCloseViewDoc}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {viewDoc && (
            <>
              <Typography variant="subtitle1">Type: {viewDoc.type}</Typography>
              {Object.entries(viewDoc.fields).map(([key, value]) => (
                <Typography key={key}>
                  {key}: {value}
                </Typography>
              ))}
              <Typography mt={2}>Attachment: {viewDoc.attachment}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDoc}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RetrievalPage;
