import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Breadcrumbs,
  Link,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
} from "@mui/material";
import {
  BarChart as BarChartIcon,
  InsertDriveFile as FileIcon,
  Storage as StorageIcon,
  AccessTime as AccessTimeIcon,
  Visibility as VisibilityIcon,
  Warning as WarningIcon,
  People as PeopleIcon,
  Error as ErrorIcon,
  PieChart as PieChartIcon,
  Folder as FolderIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import SearchIcon from "@mui/icons-material/Search";
import { InputChangeEvent } from "../../types/events";

const reportList = [
  {
    key: "docTypeCount",
    title: "Document Count by Type",
    icon: <BarChartIcon fontSize="large" color="primary" />,
    description: "See how many documents exist for each type.",
  },
  {
    key: "addedOverTime",
    title: "Documents Added Over Time",
    icon: <AccessTimeIcon fontSize="large" color="primary" />,
    description: "Track document uploads by month.",
  },
  {
    key: "storageByFolder",
    title: "Storage Usage by Folder",
    icon: <StorageIcon fontSize="large" color="primary" />,
    description: "View storage used by each folder.",
  },
  {
    key: "recentUploads",
    title: "Recent Uploads",
    icon: <FileIcon fontSize="large" color="primary" />,
    description: "See documents uploaded recently.",
  },
  {
    key: "mostAccessed",
    title: "Most Accessed Documents",
    icon: <VisibilityIcon fontSize="large" color="primary" />,
    description: "Find your most viewed documents.",
  },
  {
    key: "expiringDocs",
    title: "Documents Nearing Expiry",
    icon: <WarningIcon fontSize="large" color="warning" />,
    description: "See which documents are expiring soon.",
  },
  {
    key: "userActivity",
    title: "User Activity Report",
    icon: <PeopleIcon fontSize="large" color="primary" />,
    description: "Track user uploads and actions.",
  },
  {
    key: "missingFields",
    title: "Missing Required Fields",
    icon: <ErrorIcon fontSize="large" color="error" />,
    description: "Find documents missing required info.",
  },
  {
    key: "statusSummary",
    title: "Document Status Summary",
    icon: <PieChartIcon fontSize="large" color="primary" />,
    description: "Overview of document workflow status.",
  },
  {
    key: "folderOverview",
    title: "Folder Structure Overview",
    icon: <FolderIcon fontSize="large" color="primary" />,
    description: "Visualize your folder hierarchy.",
  },
];

// Sample data for tables
const sampleRecentUploads = [
  { name: "Invoice Jan", type: "Invoice", uploaded: "2024-06-01", by: "Alice" },
  {
    name: "Contract 2024",
    type: "Contract",
    uploaded: "2024-05-20",
    by: "Bob",
  },
  {
    name: "Project Report",
    type: "Report",
    uploaded: "2024-05-15",
    by: "Alice",
  },
];
const sampleMostAccessed = [
  { name: "Contract 2024", type: "Contract", views: 12 },
  { name: "Invoice Jan", type: "Invoice", views: 8 },
];
const sampleExpiringDocs = [
  { name: "Contract 2024", type: "Contract", expiry: "2024-12-31" },
];
const sampleUserActivity = [
  { user: "Alice", uploads: 2, last: "2024-06-01" },
  { user: "Bob", uploads: 1, last: "2024-05-20" },
];
const sampleMissingFields = [
  { name: "Invoice Feb", type: "Invoice", missing: "Amount" },
];

// Table with search utility
function SearchableTable({
  columns,
  rows,
  searchField,
}: {
  columns: string[];
  rows: Record<string, any>[];
  searchField: string;
}) {
  const [search, setSearch] = useState("");
  const filtered = rows.filter((row: Record<string, any>) =>
    row[searchField].toLowerCase().includes(search.toLowerCase())
  );
  const handleSearchChange = (e: InputChangeEvent) => {
    setSearch(e.target.value);
  };
  return (
    <Box>
      <TextField
        size="small"
        variant="outlined"
        placeholder={`Search by ${searchField}`}
        value={search}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
        }}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col: string) => (
                <TableCell key={col}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((row: Record<string, any>, idx: number) => (
              <TableRow key={idx}>
                {columns.map((col: string) => (
                  <TableCell key={col}>{row[col.toLowerCase()]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// TreeView for folder structure
const sampleTree = (
  <TreeView
    defaultCollapseIcon={<FolderIcon />}
    defaultExpandIcon={<FolderIcon />}
  >
    <TreeItem nodeId="1" label="Documents">
      <TreeItem nodeId="2" label="Invoice Jan.pdf" />
      <TreeItem nodeId="3" label="Subfolder A">
        <TreeItem nodeId="4" label="Contract 2024.pdf" />
      </TreeItem>
    </TreeItem>
    <TreeItem nodeId="5" label="Images" />
    <TreeItem nodeId="6" label="Projects">
      <TreeItem nodeId="7" label="Project Report.pdf" />
    </TreeItem>
  </TreeView>
);

const mockDetails: { [key: string]: React.ReactNode } = {
  docTypeCount: (
    <Typography>Bar chart: Document count by type (mock)</Typography>
  ),
  addedOverTime: (
    <Typography>Line chart: Documents added over time (mock)</Typography>
  ),
  storageByFolder: (
    <Typography>Bar chart: Storage usage by folder (mock)</Typography>
  ),
  recentUploads: (
    <SearchableTable
      columns={["Name", "Type", "Uploaded", "By"]}
      rows={sampleRecentUploads}
      searchField="name"
    />
  ),
  mostAccessed: (
    <SearchableTable
      columns={["Name", "Type", "Views"]}
      rows={sampleMostAccessed}
      searchField="name"
    />
  ),
  expiringDocs: (
    <SearchableTable
      columns={["Name", "Type", "Expiry"]}
      rows={sampleExpiringDocs}
      searchField="name"
    />
  ),
  userActivity: (
    <SearchableTable
      columns={["User", "Uploads", "Last"]}
      rows={sampleUserActivity}
      searchField="user"
    />
  ),
  missingFields: (
    <SearchableTable
      columns={["Name", "Type", "Missing"]}
      rows={sampleMissingFields}
      searchField="name"
    />
  ),
  statusSummary: (
    <Typography>Pie chart: Document status summary (mock)</Typography>
  ),
  folderOverview: sampleTree,
};

const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const handleCardClick = (key: string) => setSelectedReport(key);
  const handleBack = () => setSelectedReport(null);

  return (
    <Box width="100%" boxSizing="border-box" p={3}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          component="button"
          underline="hover"
          color="primary"
          onClick={() => setSelectedReport(null)}
        >
          Home
        </Link>
        <Link
          component="button"
          underline="hover"
          color="primary"
          onClick={() => setSelectedReport(null)}
        >
          Reports
        </Link>
        {selectedReport && (
          <Typography color="text.primary">
            {reportList.find((r) => r.key === selectedReport)?.title}
          </Typography>
        )}
      </Breadcrumbs>
      {/* Dashboard or Detail */}
      {!selectedReport ? (
        <>
          <Typography variant="h4" fontWeight={600} mb={4}>
            Reports Dashboard
          </Typography>
          <Grid container spacing={3}>
            {reportList.map((report) => (
              <Grid item xs={12} sm={6} md={4} key={report.key}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(report.key)}>
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2} mb={1}>
                        {report.icon}
                        <Typography variant="h6">{report.title}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {report.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Box>
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" fontWeight={500} ml={1}>
              {reportList.find((r) => r.key === selectedReport)?.title}
            </Typography>
          </Box>
          <Paper sx={{ p: 3 }}>{mockDetails[selectedReport]}</Paper>
        </Box>
      )}
    </Box>
  );
};

export default ReportsPage;
