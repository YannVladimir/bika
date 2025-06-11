Company/
├── controller/
│   ├── CompanyControllerRegistration.java      # Handles company onboarding and approval
│   ├── CompanyControllerProfile.java           # Manage company profile and settings
│   ├── CompanyControllerDepartment.java        # Create and manage departments
│   └── CompanyControllerAdmin.java             # Assign and manage company administrators
├── service/
│   ├── CompanyServiceRegistration.java         # Business logic for registration workflow
│   ├── CompanyServiceProfile.java              # Company profile update logic
│   ├── CompanyServiceDepartment.java           # Department creation and updates
│   └── CompanyServiceHierarchy.java            # Department and user hierarchy management
├── repository/
│   ├── CompanyRepositoryCompany.java           # Access to company entities
│   └── CompanyRepositoryDepartment.java        # Access to department entities
├── entity/
│   ├── CompanyEntityCompany.java               # Company data entity
│   └── CompanyEntityDepartment.java            # Department entity linked to company
├── dto/
│   ├── req/
│   │   ├── CompanyDtoReqRegister.java          # Request to register a company
│   │   ├── CompanyDtoReqDepartmentCreate.java  # Department creation request
│   │   ├── CompanyDtoReqAssignAdmin.java       # Assign admin to a company
│   │   └── CompanyDtoReqUpdateProfile.java     # Company profile update request
│   └── res/
│       ├── CompanyDtoResCompany.java           # Company response details
│       ├── CompanyDtoResDepartment.java        # Department details response
│       └── CompanyDtoResAdmin.java             # Admin assignment response
├── mapper/
│   ├── CompanyMapperCompany.java               # Maps company entities to DTOs
│   └── CompanyMapperDepartment.java            # Maps department entities to DTOs
├── enums/
│   ├── CompanyEnumStatus.java                  # Company status: PENDING, ACTIVE, etc.
│   └── CompanyEnumLevel.java                   # Organizational levels (if applicable)
└── constants/
    └── CompanyConstantKeys.java                # Constants for validation, limits, etc.
