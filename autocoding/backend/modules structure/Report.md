Report/
├── controller/
│   ├── ReportControllerUsage.java              # Storage usage and quota reports
│   ├── ReportControllerActivity.java           # User activity and audit reports
│   └── ReportControllerDocumentStats.java      # Document-related analytics (by type, department, etc.)
├── service/
│   ├── ReportServiceUsage.java                 # Calculate and cache company and user storage usage
│   ├── ReportServiceActivity.java              # Generate user activity reports from audit logs
│   ├── ReportServiceDocumentStats.java         # Aggregate document counts, types, access stats
│   └── ReportServiceExport.java                # Export reports as CSV, PDF, or Excel
├── repository/
│   ├── ReportRepositoryAuditLog.java           # Query audit logs for activity reports
│   └── ReportRepositoryDocument.java           # Fetch data for document-related statistics
├── dto/
│   ├── req/
│   │   ├── ReportDtoReqActivityFilter.java     # Filters for user activity logs
│   │   └── ReportDtoReqDateRange.java          # Common date range request DTO
│   └── res/
│       ├── ReportDtoResUsage.java              # Storage usage metrics
│       ├── ReportDtoResActivity.java           # User activity report response
│       ├── ReportDtoResDocumentStats.java      # Statistics about documents
│       └── ReportDtoResChartData.java          # Chart-ready data format
├── mapper/
│   └── ReportMapper.java                       # Maps raw data into report DTOs
└── constants/
    └── ReportConstantThresholds.java           # Warning thresholds, report limits, chart configs
