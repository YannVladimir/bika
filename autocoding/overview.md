# BIKA - Document Filing System

## 🚀 Project Overview

**BIKA** is a scalable, enterprise-ready document management system designed to seamlessly integrate physical and digital archives. It provides tools for document storage, retrieval, classification, search, and organizational hierarchy.

### 🌟 Core Features

- **Digital + Physical Archival:** Link scanned documents to real-world storage locations (Office → Cupboard → Drawer → Folder).
- **Multi-Tenancy & Hierarchical Access:** Supports Company → Department → User structure with configurable roles and permissions.
- **Custom Document Types:** Admins can define metadata fields (e.g., dates, numbers, text) for each document type.
- **Advanced Search:** Search by type, metadata, location, or full-text with Elasticsearch support.
- **Personal Drive:** 2GB of personal user storage per account with folder and file sharing.
- **Audit Logs & Analytics:** Track user/document activity and generate reports.
- **Security-First Design:** MFA, RBAC, token rotation, virus scanning, and GDPR compliance.

## 🧰 Tech Stack

### Frontend
- **Framework:** React 18+ with TypeScript
- **UI Libraries:** Material-UI / Ant Design
- **State Management:** Redux Toolkit / Zustand
- **Build Tool:** Vite
- **Testing:** Jest + React Testing Library

### Backend
- **Framework:** Spring Boot 3.x
- **Language:** Java 17+
- **Database:** PostgreSQL 14+
- **Auth:** Spring Security + JWT
- **Search:** Elasticsearch
- **File Storage:** AWS S3 / MinIO
- **API Docs:** OpenAPI 3.0 (Swagger)

### DevOps & Infra
- **Containerization:** Docker, Docker Compose
- **Orchestration:** Kubernetes
- **CI/CD:** GitHub Actions / Jenkins
- **Monitoring:** Prometheus + Grafana
- **Caching:** Redis

## 🔐 Roles & Permissions

| Role                  | Scope               | Key Permissions                               |
|-----------------------|---------------------|-----------------------------------------------|
| Super Admin           | Global              | Manage companies, users, settings             |
| Company Admin         | Company-wide        | Configure departments, users, document types  |
| Department Manager    | Per department      | Manage team, documents, folders               |
| Company User          | Assigned dept(s)    | Archive, search, manage personal drive        |
| Guest                 | Read-only           | Limited document view                         |

## 📦 Folder & Document Model

- **Folder Hierarchy:** Recursive (folders within folders) with path materialization
- **Document Storage:** JSONB metadata, search vectors, physical location mapping
- **Permissions:** Controlled at document type and department levels

## 🧪 Development Best Practices

- **Architecture:** DDD + Layered (Controller → Service → Repository)
- **Security:** MFA, token rotation, AES encryption, file signature validation
- **Testing:** Unit (Mockito), Integration (Testcontainers), Performance tests
- **Caching:** Redis with Spring annotations (`@Cacheable`, `@CacheEvict`)
- **Logging:** Centralized logs + health indicators for observability

## 🛰️ Deployment

- **Environments:** Dev, Staging, Production
- **Dockerized Services:** Backend, Frontend, Postgres, Redis, Elasticsearch, MinIO
- **Kubernetes Support:** Auto-scaling (HPA, VPA), Ingress with TLS, Helm charts
- **CI/CD:** GitHub Actions workflows for test, build, and deploy

## 📚 Database Summary

- Core tables: `companies`, `users`, `departments`, `documents`, `folders`
- Metadata stored as JSONB with GIN indexes for optimized search
- PostgreSQL 3NF schema with audit logs and system settings

## 📈 APIs

- RESTful endpoints under `/api/v1`
- Secured with JWT tokens (access + refresh)
- Cursor-based pagination, HATEOAS-ready responses
- Key endpoints:
  - `/auth/login`
  - `/companies`, `/departments`
  - `/documents`, `/document-types`
  - `/drive/files`, `/folders`
  - `/documents/search`, `/documents/advanced-search`

## 📦 Example Use Cases

1. **Register Company** → Setup Admins & Departments
2. **Configure Document Types** → Define metadata & access
3. **Upload Documents** → Specify folder and location
4. **Search** → Filter by metadata, location, full-text
5. **Use Personal Drive** → Upload & share personal files

---

