Integration/
├── minio/
│   ├── IntegrationMinioClient.java             # Handles upload, download, delete from MinIO/S3
│   └── IntegrationMinioConfig.java             # MinIO configuration properties and credentials
├── redis/
│   ├── IntegrationRedisCacheService.java       # Handles caching operations (e.g., tokens, search filters)
│   └── IntegrationRedisConfig.java             # Redis template and connection factory setup
├── elasticsearch/
│   ├── IntegrationElasticClient.java           # Configures and wraps Elasticsearch client operations
│   └── IntegrationElasticConfig.java           # Elasticsearch host, credentials, and index settings
├── smtp/
│   ├── IntegrationSmtpService.java             # Send system-generated emails (e.g., MFA backup codes)
│   └── IntegrationSmtpConfig.java              # SMTP host, port, and credentials
├── dto/
│   └── IntegrationDtoResFileLocation.java      # Response DTO for uploaded file path or bucket info
├── exception/
│   └── IntegrationExceptionExternalService.java # Unified external service exception
├── enums/
│   └── IntegrationEnumStorageType.java         # MINIO, AWS_S3, FILESYSTEM
└── constants/
    └── IntegrationConstantKeys.java            # Bucket names, index names, Redis keys
