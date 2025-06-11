Document/
├── controller/
│   ├── DocumentControllerUpload.java          # Upload and archive documents
│   ├── DocumentControllerMetadata.java        # Handle document metadata fields
│   ├── DocumentControllerType.java            # Manage document types and configurations
│   └── DocumentControllerAccess.java          # Document access and retrieval
├── service/
│   ├── DocumentServiceUpload.java             # Core document archival logic
│   ├── DocumentServiceType.java               # Document type creation and validation
│   ├── DocumentServiceMetadata.java           # Metadata schema validation and defaults
│   ├── DocumentServiceStorage.java            # File storage interaction (MinIO/S3)
│   └── DocumentServiceAccessControl.java      # Role/resource-based access control
├── repository/
│   ├── DocumentRepositoryDocument.java        # Document CRUD and search
│   ├── DocumentRepositoryType.java            # Access to document types
│   └── DocumentRepositoryField.java           # Metadata fields for document types
├── entity/
│   ├── DocumentEntityDocument.java            # Main document entity
│   ├── DocumentEntityType.java                # Defines type (e.g., contract, policy)
│   └── DocumentEntityField.java               # Metadata fields per type
├── dto/
│   ├── req/
│   │   ├── DocumentDtoReqCreate.java          # Document creation request
│   │   ├── DocumentDtoReqTypeCreate.java      # Create new document type
│   │   └── DocumentDtoReqMetadataField.java   # Add custom field to a document type
│   └── res/
│       ├── DocumentDtoResInfo.java            # Document detail response
│       ├── DocumentDtoResType.java            # Document type info response
│       └── DocumentDtoResField.java           # Metadata field info
├── mapper/
│   ├── DocumentMapperDocument.java            # Map document entity to DTO
│   ├── DocumentMapperType.java                # Map document type to DTO
│   └── DocumentMapperField.java               # Map metadata fields to DTO
├── enums/
│   ├── DocumentEnumFieldType.java             # TEXT, DATE, NUMBER, BOOLEAN, etc.
│   ├── DocumentEnumAccessLevel.java           # READ_ONLY, READ_WRITE
│   └── DocumentEnumStatus.java                # ACTIVE, ARCHIVED, DELETED
└── constants/
    └── DocumentConstantKeys.java              # Constants for storage, limits, validation
