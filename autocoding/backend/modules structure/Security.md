Security/
├── config/
│   ├── SecurityConfig.java                   # Main Spring Security configuration (filters, policies)
│   ├── JwtSecurityConfig.java                # JWT filter chain and exception handling
│   └── MethodSecurityConfig.java             # Enables method-level security annotations
├── auth/
│   ├── SecurityAuthTokenProvider.java        # JWT generation and verification
│   ├── SecurityAuthTokenFilter.java          # JWT token filter for requests
│   └── SecurityAuthEntryPoint.java           # Unauthorized request handler
├── rbac/
│   ├── SecurityRbacPermissionEvaluator.java  # Checks role/resource permissions
│   └── SecurityRbacMetadataSource.java       # Maps URLs to required permissions
├── mfa/
│   ├── SecurityMfaService.java               # Handles generation and verification of TOTP codes
│   └── SecurityMfaUtil.java                  # QR code and secret key utilities
├── validation/
│   ├── SecurityValidationFileScanner.java    # Scan uploaded files for malware
│   └── SecurityValidationSignatureChecker.java # File integrity and digital signature validation
├── encryption/
│   └── SecurityEncryptionUtil.java           # AES encryption/decryption for sensitive data
├── dto/
│   └── SecurityDtoResTokenInfo.java          # Response with token validity or error details
├── enums/
│   ├── SecurityEnumRole.java                 # SUPER_ADMIN, COMPANY_ADMIN, USER, etc.
│   └── SecurityEnumPermission.java           # CREATE_DOC, VIEW_FOLDER, MANAGE_USERS, etc.
└── constants/
    └── SecurityConstantKeys.java             # Header keys, token prefixes, expiry values
