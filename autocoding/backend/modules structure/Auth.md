Auth/
├── controller/
│   ├── AuthControllerLogin.java            # Handles login and token issuance
│   ├── AuthControllerRefreshToken.java     # Handles access token renewal
│   └── AuthControllerMfa.java              # MFA verification and setup
├── service/
│   ├── AuthServiceJwtToken.java            # JWT access/refresh token generation
│   ├── AuthServiceAuthentication.java      # Login logic and validation
│   ├── AuthServiceMfa.java                 # Multi-factor authentication (TOTP, backup codes)
│   └── AuthServiceSession.java             # Session and token management
├── repository/
│   └── AuthRepositoryUserCredentials.java  # User credentials query interface
├── entity/
│   ├── AuthEntityUserCredentials.java      # Login credentials entity
│   └── AuthEntityMfa.java                  # MFA configuration and secret storage
├── dto/
│   ├── req/
│   │   ├── AuthDtoReqLogin.java            # Login request
│   │   ├── AuthDtoReqRefreshToken.java     # Refresh token request
│   │   └── AuthDtoReqMfaVerification.java  # TOTP verification request
│   └── res/
│       ├── AuthDtoResLogin.java            # Login response with JWT
│       ├── AuthDtoResRefreshToken.java     # Token refresh response
│       └── AuthDtoResMfaSetup.java         # MFA QR code and secret response
├── security/
│   ├── AuthSecurityJwtFilter.java          # JWT verification filter
│   ├── AuthSecurityJwtProvider.java        # Token creation and claims handling
│   ├── AuthSecurityConfig.java             # Security configuration (RBAC)
│   └── AuthSecurityPermissionEvaluator.java # Permission-based access handler
├── mapper/
│   └── AuthMapperUser.java                 # Maps user entities to auth DTOs
├── enums/
│   ├── AuthEnumRole.java                   # System roles: SUPER_ADMIN, COMPANY_ADMIN, etc.
│   └── AuthEnumPermission.java             # Granular permissions (e.g., DOCUMENT_READ)
└── constants/
    ├── AuthConstantJwt.java                # JWT config (expiry, prefix, keys)
    └── AuthConstantSecurity.java           # Security constants (headers, endpoints)
