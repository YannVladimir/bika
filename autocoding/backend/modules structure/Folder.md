Folder/
├── controller/
│   ├── FolderControllerManagement.java         # Create, update, delete folders
│   ├── FolderControllerStructure.java          # Retrieve folder trees and hierarchies
│   └── FolderControllerContent.java            # List folder contents (documents & subfolders)
├── service/
│   ├── FolderServiceManagement.java            # Folder CRUD logic
│   ├── FolderServicePathBuilder.java           # Build and maintain folder path structure
│   └── FolderServiceHierarchy.java             # Resolve parent/child relationships
├── repository/
│   └── FolderRepositoryFolder.java             # Folder data access layer
├── entity/
│   └── FolderEntityFolder.java                 # Folder entity with path and level fields
├── dto/
│   ├── req/
│   │   ├── FolderDtoReqCreate.java             # Folder creation request
│   │   ├── FolderDtoReqRename.java             # Rename folder request
│   │   └── FolderDtoReqMove.java               # Move folder to new parent
│   └── res/
│       ├── FolderDtoResTreeNode.java           # Tree node response for folder structure
│       ├── FolderDtoResDetails.java            # Folder metadata and contents
│       └── FolderDtoResBreadcrumb.java         # Folder path breadcrumb response
├── mapper/
│   └── FolderMapper.java                       # Maps folder entities to hierarchical DTOs
├── enums/
│   └── FolderEnumColor.java                    # Folder color (used for physical location)
└── constants/
    └── FolderConstantStructure.java            # Constants for max levels, path format, etc.
