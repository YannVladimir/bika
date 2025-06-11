# BIKA Backend Architecture  
## Java Spring Boot Package Structure: backend/src/main/java/com/bika

---

## Root Package Structure

backend/src/main/java/com/bika/
├── BikaApplication.java                  # Main Spring Boot Application
├── Core/                                 # Shared utilities, constants, helpers
├── Auth/                                 # Authentication & Authorization Module
├── Company/                              # Company & Department Management Module
├── User/                                 # User Lifecycle & Role Management Module
├── Document/                             # Document Archival & Metadata Module
├── Drive/                                # Personal Drive Management Module
├── Folder/                               # Folder & Subfolder Hierarchy Module
├── Search/                               # Elasticsearch-Based Search Module
├── Report/                               # Reporting & Analytics Module
├── Security/                             # JWT, RBAC, MFA, File Validation, Security Config
├── Audit/                                # Audit Logging & Activity Tracker Module
├── SystemSettings/                       # System-wide & Company-specific Settings Module
├── Integration/                          # MinIO, Redis, Elasticsearch, External Integrations
└── Monitoring/                           # Metrics, Health Checks, Prometheus, Grafana

---

## Technology Stack Integration

### Core Dependencies in `build.gradle`

- **Spring Boot 3.x with Java 17+**
- **Spring Security with JWT and OAuth2 support**
- **Spring Data JPA (Hibernate)**
- **Spring Validation & Spring AOP**
- **PostgreSQL 14+**
- **Redis Cache Integration**
- **Elasticsearch 8.x Integration**
- **MinIO / AWS S3 File Storage Integration**
- **Flyway for DB Migrations**
- **OpenAPI 3.0 (Swagger) for API Documentation**
- **JUnit, Mockito, Testcontainers for Testing**
- **Prometheus & Grafana for Monitoring**

---

## Application Properties Structure

- **application.yml**                      # Default configuration
- **application-dev.yml**                  # Development environment config
- **application-prod.yml**                 # Production environment config
- **application-staging.yml**              # Staging environment config

---

## Benefits of Domain-Driven Architecture for BIKA

### Document & Organization Domain Alignment

- **Modules mirror business domains (company, users, documents, folders, etc.)**
- **Physical document location tracking maps directly to hierarchical folder entities**
- **Fine-grained permissions per department, document type, and folder**

### Technical Benefits

- **Loose Coupling:** Clean separation between services, repositories, and controllers
- **High Cohesion:** Document-related logic remains within its bounded context
- **Testability:** Each module is independently unit-tested and integration-tested
- **Security:** Role-based and resource-based access is enforced via annotations and policies
- **Scalability:** Modules like `Search`, `Drive`, `Document`, `Auth` can be scaled independently

---

## Summary of Modules

| Module            | Responsibility                                                              |
|------------------|-------------------------------------------------------------------------------|
| `Auth`           | Login, token generation/refresh, MFA, security annotations                    |
| `Company`        | Company registration, approval, department hierarchy                          |
| `User`           | User management, department assignments, role permissions                     |
| `Document`       | Document type definition, file upload, metadata validation, storage           |
| `Drive`          | Personal drive storage with quota, sharing, usage tracking                    |
| `Folder`         | Nested folder structure, path materialization, parent-child relations         |
| `Search`         | Elasticsearch indexing, filters, queries, advanced document search            |
| `Report`         | Usage stats, analytics, system reports, per-company insights                  |
| `Security`       | JWT token provider, file signature checks, virus scanning                     |
| `Audit`          | Log create/update/delete/view/download actions with user/IP metadata         |
| `SystemSettings` | Manage app-level and company-level configuration settings                     |
| `Integration`    | MinIO, Redis, Elasticsearch, PostgreSQL connection config and wrappers        |
| `Monitoring`     | Spring Boot Actuator endpoints, health checks, Prometheus integration         |
| `Core`           | Constants, DTOs, utility classes, exceptions, base controllers & services     |

---

This backend architecture provides a modular, secure, and domain-aligned foundation for BIKA's document filing system, following Spring Boot best practices and designed for extensibility, performance, and enterprise scalability.
