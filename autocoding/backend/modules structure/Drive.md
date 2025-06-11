Drive/
├── controller/
│   ├── DriveControllerFile.java              # Upload, download, and delete personal files
│   ├── DriveControllerFolder.java            # Create and manage personal folders
│   └── DriveControllerUsage.java             # Get storage usage summary
├── service/
│   ├── DriveServiceFile.java                 # File handling logic: upload, virus scan, store
│   ├── DriveServiceFolder.java               # Folder hierarchy management
│   └── DriveServiceQuota.java                # Enforce storage quotas and usage tracking
├── repository/
│   ├── DriveRepositoryFile.java              # Access personal files
│   └── DriveRepositoryFolder.java            # Access personal folders
├── entity/
│   ├── DriveEntityFile.java                  # Entity representing a user's personal file
│   └── DriveEntityFolder.java                # Entity representing a user's folder
├── dto/
│   ├── req/
│   │   ├── DriveDtoReqUpload.java            # File upload request
│   │   ├── DriveDtoReqCreateFolder.java      # Create folder request
│   │   └── DriveDtoReqUpdateFolder.java      # Rename/move folder request
│   └── res/
│       ├── DriveDtoResFile.java              # Personal file info response
│       ├── DriveDtoResFolder.java            # Folder info response
│       └── DriveDtoResUsage.java             # Storage usage summary
├── mapper/
│   ├── DriveMapperFile.java                  # Map personal file entity to DTO
│   └── DriveMapperFolder.java                # Map folder entity to DTO
├── enums/
│   ├── DriveEnumMimeType.java                # Supported MIME types for personal drive
│   └── DriveEnumQuotaStatus.java             # NORMAL, WARNING, LIMIT_EXCEEDED
└── constants/
    └── DriveConstantLimits.java              # Max file size, folder depth, storage quota
