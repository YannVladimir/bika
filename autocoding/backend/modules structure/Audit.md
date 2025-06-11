Audit/
├── controller/
│   └── AuditControllerLogs.java                 # Endpoint to fetch audit logs (filtered by user, action, time)
├── service/
│   ├── AuditServiceLogger.java                  # Core logic to persist audit logs for actions
│   └── AuditServiceQuery.java                   # Retrieve and filter logs based on criteria
├── repository/
│   └── AuditRepositoryLog.java                  # Data access for audit log records
├── entity/
│   └── AuditEntityLog.java                      # Audit log entity (user, IP, action, resource, timestamp)
├── dto/
│   ├── req/
│   │   ├── AuditDtoReqFilter.java               # Filters: date range, action type, user, etc.
│   │   └── AuditDtoReqExport.java               # Request to export logs (CSV/PDF)
│   └── res/
│       ├── AuditDtoResLogEntry.java             # Single audit log response
│       └── AuditDtoResSummary.java              # Summary view (e.g., actions by user)
├── mapper/
│   └── AuditMapperLog.java                      # Map log entities to response DTOs
├── enums/
│   ├── AuditEnumAction.java                     # VIEW, CREATE, UPDATE, DELETE, DOWNLOAD
│   └── AuditEnumResource.java                   # DOCUMENT, FOLDER, USER, SYSTEM_SETTINGS, etc.
└── constants/
    └── AuditConstantKeys.java                   # Predefined tags, audit limits, export configs
