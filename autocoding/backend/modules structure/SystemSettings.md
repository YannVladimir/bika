SystemSettings/
├── controller/
│   ├── SystemSettingsControllerGlobal.java         # Manage global settings (e.g., password policy, limits)
│   └── SystemSettingsControllerCompany.java        # Manage company-specific settings (e.g., folder colors, quota)
├── service/
│   ├── SystemSettingsServiceGlobal.java            # Business logic for global configuration
│   └── SystemSettingsServiceCompany.java           # Logic for tenant-specific overrides and retrieval
├── repository/
│   ├── SystemSettingsRepositoryGlobal.java         # Access to system-wide settings table
│   └── SystemSettingsRepositoryCompany.java        # Access to company-specific settings table
├── entity/
│   ├── SystemSettingsEntityGlobal.java             # Entity for application-level settings
│   └── SystemSettingsEntityCompany.java            # Entity for company-scoped configuration
├── dto/
│   ├── req/
│   │   ├── SystemSettingsDtoReqUpdateGlobal.java   # Update global settings request
│   │   └── SystemSettingsDtoReqUpdateCompany.java  # Update company-level settings request
│   └── res/
│       ├── SystemSettingsDtoResGlobal.java         # Global settings response
│       └── SystemSettingsDtoResCompany.java        # Company-specific settings response
├── mapper/
│   └── SystemSettingsMapper.java                   # Maps config entities to DTOs
├── enums/
│   └── SystemSettingsEnumKey.java                  # Enum of all configurable keys (e.g., MAX_FILE_SIZE)
└── constants/
    └── SystemSettingsConstantDefaults.java         # Default values and fallback behaviors
