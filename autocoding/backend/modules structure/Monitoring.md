Monitoring/
├── controller/
│   └── MonitoringControllerHealth.java         # Custom health endpoints for readiness/liveness probes
├── service/
│   ├── MonitoringServiceMetrics.java           # Application-level metrics collection (e.g., document count, active users)
│   └── MonitoringServiceHealthCheck.java       # Custom health check logic for DB, Redis, MinIO, etc.
├── config/
│   ├── MonitoringConfigActuator.java           # Expose Spring Boot actuator endpoints
│   └── MonitoringConfigPrometheus.java         # Configure Prometheus registry and endpoint format
├── dto/
│   └── MonitoringDtoResHealthStatus.java       # Health response with subsystem statuses
├── integration/
│   ├── MonitoringIntegrationPrometheus.java    # Integration wrapper for Prometheus metrics
│   └── MonitoringIntegrationGrafana.java       # Dashboard-ready JSON templates or Grafana provisioning
├── enums/
│   └── MonitoringEnumSubsystem.java            # ENUM for monitored subsystems (DB, Redis, S3, Elasticsearch)
└── constants/
    └── MonitoringConstantThresholds.java       # Timeout, retry limits, degradation thresholds
