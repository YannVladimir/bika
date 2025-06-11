import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AddCircle as AddCircleIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme/theme";

// Types
interface Field {
  id: number;
  name: string;
  type: string;
  required: boolean;
  options?: string[];
}

interface DocumentType {
  id: number;
  name: string;
  description: string;
  fields: Field[];
}

// Mock data
const mockDocumentTypes: DocumentType[] = [
  {
    id: 1,
    name: "Expenses",
    description: "Document type for tracking company expenses",
    fields: [
      { id: 1, name: "Amount", type: "number", required: true },
      { id: 2, name: "Date", type: "date", required: true },
      {
        id: 3,
        name: "Category",
        type: "select",
        required: true,
        options: ["Travel", "Office", "Equipment"],
      },
    ],
  },
  {
    id: 2,
    name: "Sales",
    description: "Document type for sales records",
    fields: [
      { id: 1, name: "Customer Name", type: "string", required: true },
      { id: 2, name: "Total Amount", type: "number", required: true },
      {
        id: 3,
        name: "Payment Method",
        type: "select",
        required: true,
        options: ["Cash", "Credit Card", "Bank Transfer"],
      },
    ],
  },
];

const DocumentTypesPage: React.FC = () => {
  const [documentTypes, setDocumentTypes] =
    useState<DocumentType[]>(mockDocumentTypes);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDocType, setEditingDocType] = useState<DocumentType | null>(
    null
  );
  const [newField, setNewField] = useState<Partial<Field>>({
    name: "",
    type: "string",
    required: false,
  });
  const [newOption, setNewOption] = useState("");

  const handleCreateNew = () => {
    setEditingDocType({
      id: Date.now(),
      name: "",
      description: "",
      fields: [],
    });
    setOpenDialog(true);
  };

  const handleEdit = (docType: DocumentType) => {
    setEditingDocType(docType);
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (editingDocType) {
      if (editingDocType.id) {
        // Update existing
        setDocumentTypes(
          documentTypes.map((dt) =>
            dt.id === editingDocType.id ? editingDocType : dt
          )
        );
      } else {
        // Create new
        setDocumentTypes([...documentTypes, editingDocType]);
      }
    }
    setOpenDialog(false);
    setEditingDocType(null);
  };

  const handleAddField = () => {
    if (editingDocType && newField.name) {
      setEditingDocType({
        ...editingDocType,
        fields: [
          ...editingDocType.fields,
          {
            id: Date.now(),
            name: newField.name,
            type: newField.type || "string",
            required: newField.required || false,
            options: newField.type === "select" ? [] : undefined,
          },
        ],
      });
      setNewField({ name: "", type: "string", required: false });
    }
  };

  const handleAddOption = (fieldId: number) => {
    if (editingDocType && newOption) {
      setEditingDocType({
        ...editingDocType,
        fields: editingDocType.fields.map((field) =>
          field.id === fieldId
            ? {
                ...field,
                options: [...(field.options || []), newOption],
              }
            : field
        ),
      });
      setNewOption("");
    }
  };

  const handleDeleteField = (fieldId: number) => {
    if (editingDocType) {
      setEditingDocType({
        ...editingDocType,
        fields: editingDocType.fields.filter((field) => field.id !== fieldId),
      });
    }
  };

  const handleDeleteOption = (fieldId: number, option: string) => {
    if (editingDocType) {
      setEditingDocType({
        ...editingDocType,
        fields: editingDocType.fields.map((field) =>
          field.id === fieldId
            ? {
                ...field,
                options: field.options?.filter((opt) => opt !== option),
              }
            : field
        ),
      });
    }
  };

  return (
    <Box width="100%" boxSizing="border-box" p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight={600}>
          Document Types
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
          sx={{ fontWeight: 600, boxShadow: 2 }}
        >
          Create New Document Type
        </Button>
      </Box>

      <Grid container spacing={3}>
        {documentTypes.map((docType) => (
          <Grid item xs={12} md={6} lg={4} key={docType.id}>
            <Card
              elevation={3}
              sx={{
                background: `linear-gradient(135deg, ${tokens.primary.light} 0%, ${tokens.secondary.light} 100%)`,
                color: tokens.grey[900],
                borderRadius: 3,
                height: "100%",
                boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px) scale(1.02)",
                  boxShadow: "0 8px 32px 0 rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {docType.name}
                  </Typography>
                  <IconButton
                    onClick={() => handleEdit(docType)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.primary" mb={2}>
                  {docType.description}
                </Typography>
                {/* Fields are hidden on the card, only shown in edit dialog */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingDocType?.id
            ? "Edit Document Type"
            : "Create New Document Type"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Document Type Name"
                  fullWidth
                  value={editingDocType?.name || ""}
                  onChange={(e) =>
                    setEditingDocType(
                      editingDocType
                        ? { ...editingDocType, name: e.target.value }
                        : null
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={editingDocType?.description || ""}
                  onChange={(e) =>
                    setEditingDocType(
                      editingDocType
                        ? { ...editingDocType, description: e.target.value }
                        : null
                    )
                  }
                />
              </Grid>

              {/* Fields only shown in dialog */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Fields
                </Typography>
                <List>
                  {editingDocType?.fields.map((field) => (
                    <React.Fragment key={field.id}>
                      <ListItem>
                        <ListItemText
                          primary={field.name}
                          secondary={`${field.type} ${
                            field.required ? "(Required)" : ""
                          }`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteField(field.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {field.type === "select" && (
                        <Box sx={{ pl: 4, pr: 2, pb: 2 }}>
                          <Box display="flex" gap={1} mb={1}>
                            <TextField
                              size="small"
                              label="Add Option"
                              value={newOption}
                              onChange={(e) => setNewOption(e.target.value)}
                            />
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleAddOption(field.id)}
                              disabled={!newOption}
                            >
                              Add
                            </Button>
                          </Box>
                          <Box display="flex" gap={0.5} flexWrap="wrap">
                            {field.options?.map((option) => (
                              <Chip
                                key={option}
                                label={option}
                                onDelete={() =>
                                  handleDeleteOption(field.id, option)
                                }
                                color="secondary"
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>

                <Box
                  sx={{ mt: 2, p: 2, border: `1px dashed ${tokens.grey[300]}` }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    Add New Field
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Field Name"
                        fullWidth
                        value={newField.name}
                        onChange={(e) =>
                          setNewField({ ...newField, name: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={newField.type}
                          label="Type"
                          onChange={(e) =>
                            setNewField({ ...newField, type: e.target.value })
                          }
                        >
                          <MenuItem value="string">Text</MenuItem>
                          <MenuItem value="number">Number</MenuItem>
                          <MenuItem value="date">Date</MenuItem>
                          <MenuItem value="select">Select</MenuItem>
                          <MenuItem value="textarea">Text Area</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={newField.required}
                            onChange={(e) =>
                              setNewField({
                                ...newField,
                                required: e.target.checked,
                              })
                            }
                          />
                        }
                        label="Required"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleAddField}
                        disabled={!newField.name}
                        fullWidth
                        startIcon={<AddCircleIcon />}
                      >
                        Add Field
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={!editingDocType?.name}
            startIcon={<EditIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentTypesPage;
