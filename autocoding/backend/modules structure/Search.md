Search/
├── controller/
│   └── SearchControllerDocument.java         # Endpoint for advanced search queries
├── service/
│   ├── SearchServiceIndexing.java            # Index documents and maintain search index
│   ├── SearchServiceQueryBuilder.java        # Build Elasticsearch queries from filters
│   ├── SearchServiceSearch.java              # Execute and paginate search results
│   └── SearchServiceAggregation.java         # Handle faceted search and aggregations
├── repository/
│   └── SearchRepositoryElasticsearch.java     # Interface with Elasticsearch client
├── dto/
│   ├── req/
│   │   ├── SearchDtoReqDocumentSearch.java    # Search request (query, filters, sort, etc.)
│   │   └── SearchDtoReqAdvancedFilter.java    # Filter structure for metadata fields
│   └── res/
│       ├── SearchDtoResDocumentHit.java       # Search result document structure
│       ├── SearchDtoResAggregations.java      # Aggregated data (by type, location, etc.)
│       └── SearchDtoResPagination.java        # Pagination and total hits metadata
├── mapper/
│   └── SearchMapperDocument.java              # Map document entities to search responses
├── enums/
│   ├── SearchEnumSortBy.java                  # Fields allowed for sorting
│   └── SearchEnumFilterOperator.java          # Filter operators (EQ, NEQ, GT, LT, etc.)
└── constants/
    └── SearchConstantQuery.java               # Predefined query templates, max page size, etc.
