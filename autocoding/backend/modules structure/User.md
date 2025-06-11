User/
├── controller/
│   ├── UserControllerManagement.java         # User creation, update, deactivation
│   ├── UserControllerDepartment.java         # Manage user-department assignments
│   └── UserControllerProfile.java            # Update user profile and MFA preferences
├── service/
│   ├── UserServiceManagement.java            # User lifecycle logic (create, update, delete)
│   ├── UserServiceDepartment.java            # Assign roles and departments
│   ├── UserServiceProfile.java               # Update profile, phone, MFA, etc.
│   └── UserServiceQuota.java                 # User storage quota handling
├── repository/
│   ├── UserRepositoryUser.java               # Access user entities
│   └── UserRepositoryUserDepartment.java     # Access user-department relationships
├── entity/
│   ├── UserEntityUser.java                   # Core user entity (PII, credentials)
│   └── UserEntityUserDepartment.java         # Many-to-many user/department link
├── dto/
│   ├── req/
│   │   ├── UserDtoReqCreateUser.java         # New user creation request
│   │   ├── UserDtoReqUpdateUser.java         # User update request
│   │   ├── UserDtoReqAssignDepartment.java   # Assign departments and roles
│   │   └── UserDtoReqUpdateProfile.java      # User self-profile update request
│   └── res/
│       ├── UserDtoResUserInfo.java           # Full user profile response
│       ├── UserDtoResDepartmentAssignment.java # Department and role assignment details
│       └── UserDtoResQuota.java              # User's storage usage response
├── mapper/
│   └── UserMapper.java                       # Maps between user entities and DTOs
├── enums/
│   ├── UserEnumRole.java                     # Role: SUPER_ADMIN, COMPANY_ADMIN, etc.
│   └── UserEnumStatus.java                   # ACTIVE, INACTIVE, LOCKED, etc.
└── constants/
    └── UserConstantLimits.java               # Constants for quota, validation, etc.
