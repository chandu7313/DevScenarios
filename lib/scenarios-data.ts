import { Scenario } from '../types';

export const SCENARIOS: Scenario[] = [
  // Authentication & Authorization
  {
    slug: 'jwt-token-invalidation',
    title: 'JWT Token Invalidation on Logout',
    domain: 'auth',
    difficulty: 'critical',
    shortDescription: 'Stateless JWTs cannot be revoked by the server easily. How to handle immediate logout?',
    overview: {
      problem: 'JWTs are stateless. Once issued, they are valid until expiry, even if the user logs out.',
      whyItHappens: 'Standard JWT implementations don\'t check a central store for every request to maintain performance.',
      realWorldExamples: ['Banking session termination', 'Forcing password reset across devices'],
    },
    tags: ['JWT', 'Auth', 'Redis', 'Security']
  },
  {
    slug: 'oauth2-pkce-flow',
    title: 'OAuth2 PKCE Flow Internals',
    domain: 'auth',
    difficulty: 'hard',
    shortDescription: 'Securing public clients (SPAs/Mobile) from authorization code interception.',
    overview: {
      problem: 'Public clients cannot store client secrets safely.',
      whyItHappens: 'OAuth2 code grant was originally designed for confidential server-side clients.',
      realWorldExamples: ['Mobile apps using Okta/Auth0', 'Single Page Applications'],
    },
    tags: ['OAuth2', 'PKCE', 'Security']
  },
  {
    slug: 'session-fixation-hijacking',
    title: 'Session Fixation & Hijacking',
    domain: 'auth',
    difficulty: 'hard',
    shortDescription: 'Attackers forcing a known session ID on a user or stealing existing sessions.',
    overview: {
      problem: 'The web application does not renew session IDs after successful login.',
      whyItHappens: 'Cookie-based session management vulnerabilities.',
      realWorldExamples: ['Legacy PHP apps', 'Misconfigured Express session middleware'],
    },
    tags: ['Security', 'Sessions', 'Auth']
  },
  {
    slug: 'token-refresh-race',
    title: 'Token Refresh Race Condition',
    domain: 'auth',
    difficulty: 'hard',
    shortDescription: 'Multiple concurrent requests attempting to refresh a token simultaneously.',
    overview: {
      problem: 'When a token expires, parallel API calls from the frontend trigger multiple refresh calls, leading to 401 errors.',
      whyItHappens: 'Lack of client-side or server-side locking during the refresh cycle.',
      realWorldExamples: ['High-traffic SPAs', 'Chat apps refreshing in background'],
    },
    tags: ['Auth', 'Concurrency', 'Performance']
  },
  {
    slug: 'rbac-vs-abac',
    title: 'Role-Based vs Attribute-Based Access',
    domain: 'auth',
    difficulty: 'core',
    shortDescription: 'Scalable permission models for complex enterprise organizations.',
    overview: {
      problem: 'Static roles become unmanageable (Role Explosion) in large organizations.',
      whyItHappens: 'Permissions often depend on attributes like "department" or "location" rather than just a role name.',
      realWorldExamples: ['AWS IAM', 'Google Workspace permissions'],
    },
    tags: ['Auth', 'Permissions', 'Enterprise']
  },
  {
    slug: 'jwt-secret-rotation',
    title: 'JWT Secret Rotation Zero-Downtime',
    domain: 'auth',
    difficulty: 'hard',
    shortDescription: 'Rotating signing keys without logging out all active users.',
    overview: {
      problem: 'Changing the JWT secret immediately invalidates all active tokens.',
      whyItHappens: 'Server only checks against a single secret.',
      realWorldExamples: ['Security compliance updates', 'Leaked secret remediation'],
    },
    tags: ['JWT', 'Security', 'DevOps']
  },
  {
    slug: 'sso-saml-internals',
    title: 'SSO & SAML Internals',
    domain: 'auth',
    difficulty: 'advanced',
    shortDescription: 'Deep dive into XML signatures, IdPs, and Service Providers.',
    overview: {
      problem: 'Integrating enterprise identities across heterogeneous systems.',
      whyItHappens: 'Legacy enterprise systems often rely on XML-based SAML instead of OIDC.',
      realWorldExamples: ['Active Directory integration', 'Okta SAML integration'],
    },
    tags: ['Auth', 'SSO', 'Enterprise']
  },
  {
    slug: 'privilege-escalation-patterns',
    title: 'Privilege Escalation Patterns',
    domain: 'auth',
    difficulty: 'advanced',
    shortDescription: 'How attackers move from "guest" to "admin" by exploiting broken access control.',
    overview: {
      problem: 'Insecure Direct Object References (IDOR) and logic flaws in permission checks.',
      whyItHappens: 'Relying on client-side data for server-side permission decisions.',
      realWorldExamples: ['GitHub issue access bugs', 'Stripe API key leaks'],
    },
    tags: ['Security', 'Auth', 'Attacks']
  },

  // Caching & Redis internals
  {
    slug: 'thundering-herd-redis',
    title: 'Thundering Herd on Cache Miss',
    domain: 'caching',
    difficulty: 'critical',
    shortDescription: 'Thousands of requests hitting the database simultaneously when a hot cache key expires.',
    overview: {
      problem: 'When a popular cache key expires, all concurrent requests see a cache miss and attempt to rebuild the cache by querying the database at once.',
      whyItHappens: 'Standard cache-aside patterns lack locking or coordination between distributed workers.',
      realWorldExamples: ['Facebook homepage load', 'Instagram feed refresh'],
    },
    tags: ['Redis', 'Performance', 'Scalability']
  },
  {
    slug: 'cache-invalidation-strategies',
    title: 'Cache Invalidation Strategies',
    domain: 'caching',
    difficulty: 'hard',
    shortDescription: 'The two hardest problems: Naming and Cache Invalidation.',
    overview: {
      problem: 'Stale data served to users after an update.',
      whyItHappens: 'Difficulty in propagating updates to distributed cache layers.',
      realWorldExamples: ['Price updates on e-commerce', 'User profile updates'],
    },
    tags: ['Caching', 'Consistency']
  },
  {
    slug: 'redis-eviction-policies',
    title: 'Redis Eviction Policies',
    domain: 'caching',
    difficulty: 'hard',
    shortDescription: 'Selecting between LRU, LFU, and Volatile eviction for production workloads.',
    overview: {
      problem: 'Cache fills up and performance degrades due to random eviction.',
      whyItHappens: 'Memory limits reached on cache nodes.',
      realWorldExamples: ['Session stores', 'Real-time leaderboard caching'],
    },
    tags: ['Redis', 'Memory Management']
  },
  {
    slug: 'distributed-cache-consistency',
    title: 'Distributed Cache Consistency',
    domain: 'caching',
    difficulty: 'core',
    shortDescription: 'Managing cache consistency across multiple geographic regions.',
    overview: {
      problem: 'Regional caches serving conflicting data.',
      whyItHappens: 'Network latency between regions during invalidation broadcasts.',
      realWorldExamples: ['Global content platforms', 'Multi-region SaaS'],
    },
    tags: ['Caching', 'Distributed Systems']
  },
  {
    slug: 'cdn-cache-invalidation',
    title: 'CDN Cache Invalidation',
    domain: 'caching',
    difficulty: 'advanced',
    shortDescription: 'Handling large-scale static asset updates with Purge-All vs Purge-by-Tag.',
    overview: {
      problem: 'Pushing code updates while users see old JS/CSS files.',
      whyItHappens: 'CDN edge nodes caching assets longer than expected.',
      realWorldExamples: ['Cloudflare', 'Akamai', 'Fastly deployment flows'],
    },
    tags: ['CDN', 'Performance']
  },

  // Databases
  {
    slug: 'query-plan-regression',
    title: 'Query Plan Regression after Index Add',
    domain: 'databases',
    difficulty: 'critical',
    shortDescription: 'Adding an index accidentally causing the optimizer to pick a slower sequential scan.',
    overview: {
      problem: 'System performance drops significantly after a "helpful" database migration.',
      whyItHappens: 'Database query optimizer makes sub-optimal choices based on stale statistics.',
      realWorldExamples: ['PostgreSQL production outages'],
    },
    tags: ['PostgreSQL', 'Performance', 'Indexing']
  },
  {
    slug: 'hot-shard-problem',
    title: 'Hot Shard Problem in Sharded DB',
    domain: 'databases',
    difficulty: 'critical',
    shortDescription: 'Uneven distribution of traffic causing one database node to melt while others are idle.',
    overview: {
      problem: 'Total system capacity is limited by a single overloaded node.',
      whyItHappens: 'Poor choice of shard key leading to data hotspots.',
      realWorldExamples: ['Twitter celebrity accounts', 'Large organization tenants in SaaS'],
    },
    tags: ['Sharding', 'Scalability', 'Databases']
  },
  {
    slug: 'replication-lag-spikes',
    title: 'Replication Lag Spike Handling',
    domain: 'databases',
    difficulty: 'hard',
    shortDescription: 'Read-replicas falling seconds behind the primary, causing inconsistent UI states.',
    overview: {
      problem: 'User creates a post, refreshes, but the post is missing because the read came from a lagging replica.',
      whyItHappens: 'High write throughput on the primary node exhausting replica I/O.',
      realWorldExamples: ['Read-after-write consistency in large apps'],
    },
    tags: ['Databases', 'Replication']
  },
  {
    slug: 'n-plus-1-at-scale',
    title: 'N+1 Query Problem at Scale',
    domain: 'databases',
    difficulty: 'hard',
    shortDescription: 'ORM behavior causing 1000 database calls for a single API request.',
    overview: {
      problem: 'Database connection pool exhausted by seemingly simple "list" endpoints.',
      whyItHappens: 'Looping over related entities without eager loading.',
      realWorldExamples: ['GraphQL resolvers', 'Hibernate/ActiveRecord misconfiguration'],
    },
    tags: ['ORM', 'Performance', 'Databases']
  },
  {
    slug: 'index-table-bloat',
    title: 'Index Bloat & Table Bloat',
    domain: 'databases',
    difficulty: 'hard',
    shortDescription: 'Database taking 5x more disk space than the actual data due to un-vacuumed dead rows.',
    overview: {
      problem: 'Query performance degrades linearly over time despite no data increase.',
      whyItHappens: 'MVCC architectures (Postgres) leaving "tombstones" for deleted/updated rows.',
      realWorldExamples: ['High-update high-delete tables'],
    },
    tags: ['PostgreSQL', 'Maintenance']
  },
  {
    slug: 'db-connection-pool-exhaustion',
    title: 'Database Connection Pool Exhaustion',
    domain: 'databases',
    difficulty: 'critical',
    shortDescription: 'Application hanging because all DB connections are busy or leaked.',
    overview: {
      problem: 'API endpoints return 504 errors as workers wait indefinitely for a DB connection.',
      whyItHappens: 'Slow queries holding connections or leaks in error handling paths.',
      realWorldExamples: ['Morning traffic spikes', 'Middleware leaks'],
    },
    tags: ['Performance', 'Databases']
  },
  {
    slug: 'pagination-keyset-vs-offset',
    title: 'Pagination at Scale (Keyset vs Offset)',
    domain: 'databases',
    difficulty: 'core',
    shortDescription: 'Why "LIMIT 100 OFFSET 1000000" kills your database performance.',
    overview: {
      problem: 'Deep pagination gets exponentially slower as users scroll.',
      whyItHappens: 'Database must scan and discard all rows skipped by OFFSET.',
      realWorldExamples: ['Social media feeds', 'Logging dashboards'],
    },
    tags: ['Databases', 'Performance']
  },
  {
    slug: 'schema-migrations-live',
    title: 'Schema Migrations on Live Tables',
    domain: 'databases',
    difficulty: 'hard',
    shortDescription: 'Adding columns or changing types without locking the entire table for minutes.',
    overview: {
      problem: 'Production outage during a "simple" ALTER TABLE operation.',
      whyItHappens: 'Database table locks preventing concurrent writes during structural changes.',
      realWorldExamples: ['Netflix data migrations', 'Stripe zero-downtime schema changes'],
    },
    tags: ['Databases', 'DevOps']
  },

  // Concurrency & Race Conditions
  {
    slug: 'double-charge-payment',
    title: 'Double-Charge Payment Race',
    domain: 'concurrency',
    difficulty: 'critical',
    shortDescription: 'The nightmare scenario: User charged twice because of a 5ms race condition.',
    overview: {
      problem: 'Transaction double-submission or lack of idempotency.',
      whyItHappens: 'Concurrent requests creating two transactions before the first one is committed.',
      realWorldExamples: ['Stripe payment processing', 'Uber ride checkout'],
    },
    tags: ['Payments', 'Concurrency', 'Transactions']
  },
  {
    slug: 'inventory-overselling',
    title: 'Inventory Overselling',
    domain: 'concurrency',
    difficulty: 'hard',
    shortDescription: 'Selling more items than in stock during a high-traffic flash sale.',
    overview: {
      problem: 'Multiple users checkout the last item simultaneously.',
      whyItHappens: 'Lack of atomic increments or pessimistic locking.',
      realWorldExamples: ['Amazon Prime Day', 'Ticketmaster flash sales'],
    },
    tags: ['E-commerce', 'Concurrency']
  },
  {
    slug: 'lost-update-problem',
    title: 'Lost Update Problem',
    domain: 'concurrency',
    difficulty: 'hard',
    shortDescription: 'Two users editing the same document concurrently, where one overwrites the other.',
    overview: {
      problem: 'Data loss due to "last write wins" in a non-coordinated environment.',
      whyItHappens: 'Lack of optimistic concurrency control (versioning).',
      realWorldExamples: ['Collaborative editors', 'CRM updates'],
    },
    tags: ['Concurrency', 'Databases']
  },
  {
    slug: 'deadlock-detection',
    title: 'Deadlock Detection & Prevention',
    domain: 'concurrency',
    difficulty: 'hard',
    shortDescription: 'Workers stuck in a circular wait, permanently locking up resources.',
    overview: {
      problem: 'System becomes unresponsive; logs show threads waiting indefinitely.',
      whyItHappens: 'Acquiring multiple locks in different orders across code paths.',
      realWorldExamples: ['Database transactions', 'OS kernel locks'],
    },
    tags: ['Concurrency', 'Performance']
  },
  {
    slug: 'distributed-two-phase-commit',
    title: 'Distributed Two-Phase Commit',
    domain: 'concurrency',
    difficulty: 'advanced',
    shortDescription: 'Guaranteeing atomicity across multiple distributed microservices.',
    overview: {
      problem: 'Service A commits but Service B fails. How to ensure data consistency?',
      whyItHappens: 'The "Two Generals Problem" in distributed networking.',
      realWorldExamples: ['Distributed SQL databases', 'Global payment systems'],
    },
    tags: ['Distributed Systems', 'Consistency']
  },
  {
    slug: 'saga-pattern',
    title: 'Saga Pattern for Distributed TX',
    domain: 'concurrency',
    difficulty: 'advanced',
    shortDescription: 'Managing complex workflows with compensating transactions.',
    overview: {
      problem: 'Handling multi-step processes across microservices without global locks.',
      whyItHappens: 'Traditional 2PC doesn\'t scale; eventual consistency is needed.',
      realWorldExamples: ['Microservices architecture', 'Workflow engines like Temporal'],
    },
    tags: ['Distributed Systems', 'Architecture']
  },
  {
    slug: 'ticket-booking-phantom-reads',
    title: 'Ticket Booking Phantom Reads',
    domain: 'concurrency',
    difficulty: 'advanced',
    shortDescription: 'New rows appearing during a transaction, causing booking inconsistencies.',
    overview: {
      problem: 'System checks for free seats, finds one, but it was just taken by a concurrent TX.',
      whyItHappens: 'Incorrect transaction isolation levels (Repeatable Read vs Serializable).',
      realWorldExamples: ['Airline booking systems', 'Event ticketing'],
    },
    tags: ['Databases', 'Concurrency']
  },

  // Queues, Kafka & Event-driven
  {
    slug: 'kafka-rebalance-storm',
    title: 'Kafka Partition Rebalancing Storms',
    domain: 'queues',
    difficulty: 'critical',
    shortDescription: 'Consumer groups stuck in a loop of rebalancing, causing massive processing lag.',
    overview: {
      problem: 'Message processing stops as consumers constantly leave and rejoin the group.',
      whyItHappens: 'Processing time exceeding max.poll.interval.ms.',
      realWorldExamples: ['LinkedIn log processing', 'Uber real-time analytics'],
    },
    tags: ['Kafka', 'Message Queues']
  },
  {
    slug: 'exactly-once-processing',
    title: 'Exactly-Once Message Processing',
    domain: 'queues',
    difficulty: 'hard',
    shortDescription: 'Avoiding duplicate actions when a consumer retries a partially processed message.',
    overview: {
      problem: 'Duplicate emails or payment notifications.',
      whyItHappens: 'Network failures after processing but before acknowledgment.',
      realWorldExamples: ['Notification systems', 'Financial ledger updates'],
    },
    tags: ['Kafka', 'Idempotency']
  },
  {
    slug: 'dead-letter-queue-patterns',
    title: 'Dead Letter Queue Patterns',
    domain: 'queues',
    difficulty: 'core',
    shortDescription: 'Handling poison pills without blocking the entire message pipeline.',
    overview: {
      problem: 'A single malformed message causes the consumer to crash and restart repeatedly.',
      whyItHappens: 'Lack of automated error handling and isolation for failed messages.',
      realWorldExamples: ['Robust message consumers', 'Data ingestion pipelines'],
    },
    tags: ['Message Queues', 'Resilience']
  },
  {
    slug: 'event-ordering-guarantees',
    title: 'Event Ordering Guarantees',
    domain: 'queues',
    difficulty: 'hard',
    shortDescription: 'Ensuring UserCreated arrives before UserUpdated in a distributed system.',
    overview: {
      problem: 'Out-of-order events causing data corruption or processing errors.',
      whyItHappens: 'Parallel processing and lack of partition keys.',
      realWorldExamples: ['Audit logs', 'Financial transactions'],
    },
    tags: ['Kafka', 'Distributed Systems']
  },
  {
    slug: 'outbox-pattern',
    title: 'Outbox Pattern for Reliability',
    domain: 'queues',
    difficulty: 'hard',
    shortDescription: 'Atomically updating the database and sending a message to a queue.',
    overview: {
      problem: 'Database update succeeds but message sending fails (or vice versa).',
      whyItHappens: 'Distributed transactions are expensive; the outbox table provides a reliable bridge.',
      realWorldExamples: ['Reliable microservice communication'],
    },
    tags: ['Distributed Systems', 'Architecture']
  },
  {
    slug: 'consumer-lag-backpressure',
    title: 'Consumer Lag & Backpressure',
    domain: 'queues',
    difficulty: 'core',
    shortDescription: 'Monitoring and managing slow consumers before they cause disk pressure on the broker.',
    overview: {
      problem: 'Processing falls hours behind real-time traffic.',
      whyItHappens: 'Resource exhaustion or sudden traffic spikes.',
      realWorldExamples: ['Real-time monitoring systems'],
    },
    tags: ['Monitoring', 'Performance']
  },
  {
    slug: 'kafka-compaction-retention',
    title: 'Kafka Compaction & Retention',
    domain: 'queues',
    difficulty: 'advanced',
    shortDescription: 'Managing stateful topics that store the "current value" of a key forever.',
    overview: {
      problem: 'Disk usage growing uncontrollably on long-lived topics.',
      whyItHappens: 'Misconfigured log compaction policies.',
      realWorldExamples: ['User preference stores', 'Configuration management'],
    },
    tags: ['Kafka', 'Storage']
  },

  // Resilience Patterns
  {
    slug: 'retry-storms',
    title: 'Retry Storms & Exponential Backoff',
    domain: 'resilience',
    difficulty: 'hard',
    shortDescription: 'Self-inflicted DDoS attacks caused by aggressive client retries.',
    overview: {
      problem: 'A minor outage becomes a total system collapse as 10k clients retry every 100ms.',
      whyItHappens: 'Lack of jitter and exponential backoff in retry logic.',
      realWorldExamples: ['AWS outage amplification', 'Mobile app client logic errors'],
    },
    tags: ['Resilience', 'Scalability']
  },
  {
    slug: 'circuit-breaker-implementation',
    title: 'Circuit Breaker Implementation',
    domain: 'resilience',
    difficulty: 'hard',
    shortDescription: 'Stopping calls to a failing downstream service before it exhausts your own resources.',
    overview: {
      problem: 'Cascading failures where Service A dies because Service B is slow.',
      whyItHappens: 'Synchronous threads waiting for timeouts from dead services.',
      realWorldExamples: ['Netflix Hystrix', 'Resilience4j'],
    },
    tags: ['Resilience', 'Microservices']
  },
  {
    slug: 'rate-limiting-algorithms',
    title: 'Rate Limiting Algorithms',
    domain: 'resilience',
    difficulty: 'hard',
    shortDescription: 'Comparing Token Bucket, Leaky Bucket, and Fixed Window for production APIs.',
    overview: {
      problem: 'Noisy neighbors or attackers overwhelming API capacity.',
      whyItHappens: 'Lack of traffic shaping at the edge.',
      realWorldExamples: ['Public API management', 'SaaS throttling'],
    },
    tags: ['Scalability', 'Security']
  },
  {
    slug: 'bulkhead-pattern',
    title: 'Bulkhead Pattern in Microservices',
    domain: 'resilience',
    difficulty: 'hard',
    shortDescription: 'Isolating resources for different tenants or features to prevent total system failure.',
    overview: {
      problem: 'One heavy tenant exhausting all threads for all other users.',
      whyItHappens: 'Shared resource pools without hard isolation boundaries.',
      realWorldExamples: ['Shipping industry (inspiration)', 'Multi-tenant SaaS'],
    },
    tags: ['Resilience', 'Architecture']
  },
  {
    slug: 'timeout-cascade-failures',
    title: 'Timeout Cascade Failures',
    domain: 'resilience',
    difficulty: 'critical',
    shortDescription: 'The "slow server" problem where slow responses are more dangerous than errors.',
    overview: {
      problem: 'Upstream services time out while downstream services are still working, wasting resources.',
      whyItHappens: 'Incorrect timeout settings across the stack.',
      realWorldExamples: ['Large-scale microservice request flows'],
    },
    tags: ['Resilience', 'Performance']
  },
  {
    slug: 'graceful-degradation',
    title: 'Graceful Degradation Design',
    domain: 'resilience',
    difficulty: 'core',
    shortDescription: 'Serving static content or removing features instead of showing a 500 page.',
    overview: {
      problem: 'Total outage during high load.',
      whyItHappens: 'Binary "all or nothing" feature dependency design.',
      realWorldExamples: ['Netflix failing over to generic recommendations'],
    },
    tags: ['Resilience', 'UX']
  },

  // Docker, K8s & CI/CD
  {
    slug: 'k8s-pod-oomkilled',
    title: 'K8s Pod OOMKilled in Production',
    domain: 'infra',
    difficulty: 'critical',
    shortDescription: 'Debugging the difference between memory leaks and incorrect resource limits.',
    overview: {
      problem: 'Pods randomly restarting with Exit Code 137.',
      whyItHappens: 'Memory usage exceeding hard limits set in K8s manifests.',
      realWorldExamples: ['Node.js heap exhaustion in K8s'],
    },
    tags: ['Kubernetes', 'Docker', 'Memory Management']
  },
  {
    slug: 'hpa-scaling-lag',
    title: 'HPA Scaling Lag under Traffic Spikes',
    domain: 'infra',
    difficulty: 'hard',
    shortDescription: 'New pods taking 2 minutes to be ready while current pods are at 100% CPU.',
    overview: {
      problem: 'System crashes before the "autoscaler" can help.',
      whyItHappens: 'Slow container startup and cold starts.',
      realWorldExamples: ['Flash sales', 'Breaking news events'],
    },
    tags: ['Kubernetes', 'Scalability']
  },
  {
    slug: 'zero-downtime-rolling-deploys',
    title: 'Zero-Downtime Rolling Deploys',
    domain: 'infra',
    difficulty: 'core',
    shortDescription: 'Handling active requests and database migrations during a deployment.',
    overview: {
      problem: 'Errors during the 30-second window while new code is spinning up.',
      whyItHappens: 'Lack of readiness probes and connection draining.',
      realWorldExamples: ['Production deployment flows'],
    },
    tags: ['DevOps', 'CI/CD']
  },
  {
    slug: 'ci-cd-flaky-tests',
    title: 'CI/CD Flaky Tests at Scale',
    domain: 'infra',
    difficulty: 'core',
    shortDescription: 'Managing tests that fail 5% of the time, slowing down the entire engineering team.',
    overview: {
      problem: 'Developers lose trust in CI results.',
      whyItHappens: 'Race conditions in tests or reliance on external network resources.',
      realWorldExamples: ['Large engineering teams like Google/Meta'],
    },
    tags: ['CI/CD', 'Testing']
  },
  {
    slug: 'image-pull-storm',
    title: 'Image Pull Storm on Node Restart',
    domain: 'infra',
    difficulty: 'hard',
    shortDescription: 'All pods crashing because the registry is overwhelmed by 500 simultaneous pulls.',
    overview: {
      problem: 'Node failure causes cascaded failure of the container registry.',
      whyItHappens: 'Lack of local caching or proxying for container images.',
      realWorldExamples: ['AWS ECR throttling during large cluster restarts'],
    },
    tags: ['Docker', 'Infrastructure']
  },

  // Real-time systems
  {
    slug: 'websocket-scaling',
    title: 'WebSocket Scaling across Servers',
    domain: 'realtime',
    difficulty: 'hard',
    shortDescription: 'Sending a message to a user connected to Server B when you are on Server A.',
    overview: {
      problem: 'WebSockets are stateful; standard load balancing doesn\'t work.',
      whyItHappens: 'Server nodes don\'t know about connections on other nodes without a Pub/Sub layer.',
      realWorldExamples: ['Slack scaling', 'Socket.io with Redis adapter'],
    },
    tags: ['WebSockets', 'Scalability']
  },
  {
    slug: 'chat-message-ordering',
    title: 'Chat Message Ordering Guarantee',
    domain: 'realtime',
    difficulty: 'hard',
    shortDescription: 'Ensuring the reply appears after the question in a distributed chat system.',
    overview: {
      problem: 'Messages appearing out of order due to network jitter.',
      whyItHappens: 'Clock skew and lack of logical clocks (Lamport clocks).',
      realWorldExamples: ['WhatsApp/Telegram internals'],
    },
    tags: ['Real-time', 'Distributed Systems']
  },
  {
    slug: 'presence-at-scale',
    title: 'Presence System at Scale',
    domain: 'realtime',
    difficulty: 'hard',
    shortDescription: 'Managing the "Online/Offline" status of millions of concurrent users.',
    overview: {
      problem: 'Presence updates causing an "update storm" that kills the database.',
      whyItHappens: 'Too many writes for transient status data.',
      realWorldExamples: ['Discord presence', 'Facebook active status'],
    },
    tags: ['Real-time', 'Performance']
  },
  {
    slug: 'offline-sync-conflict',
    title: 'Offline Sync Conflict Resolution',
    domain: 'realtime',
    difficulty: 'advanced',
    shortDescription: 'Resolving conflicts when two users edit the same data while offline.',
    overview: {
      problem: 'Data corruption after syncing changes from offline mode.',
      whyItHappens: 'Lack of conflict-free replicated data types (CRDTs).',
      realWorldExamples: ['Google Docs', 'Figma sync engine'],
    },
    tags: ['Real-time', 'Distributed Systems']
  },
  {
    slug: 'real-time-tracking-uber',
    title: 'Real-time Tracking (Uber-style)',
    domain: 'realtime',
    difficulty: 'advanced',
    shortDescription: 'Efficiently broadcasting GPS coordinates to thousands of nearby users.',
    overview: {
      problem: 'Scaling geospatial updates at high frequency.',
      whyItHappens: 'Standard database geospatial queries are too slow for real-time broadcasts.',
      realWorldExamples: ['Uber/Lyft driver tracking'],
    },
    tags: ['Real-time', 'Geospatial']
  },

  // Security
  {
    slug: 'xss-stored-content',
    title: 'XSS via Stored Content',
    domain: 'security',
    difficulty: 'hard',
    shortDescription: 'Stealing session cookies by injecting scripts into persistent data fields.',
    overview: {
      problem: 'Malicious scripts executed in other users\' browsers.',
      whyItHappens: 'Lack of output encoding and insecure HTML rendering.',
      realWorldExamples: ['MySpace Worm', 'Twitter stored XSS bugs'],
    },
    tags: ['Security', 'XSS']
  },
  {
    slug: 'csrf-token-bypass',
    title: 'CSRF Token Bypass Patterns',
    domain: 'security',
    difficulty: 'hard',
    shortDescription: 'Performing unauthorized actions on behalf of a logged-in user.',
    overview: {
      problem: 'Attackers tricking a browser into making a state-changing request to your API.',
      whyItHappens: 'Relying only on cookies for authentication without extra validation.',
      realWorldExamples: ['Banking transfer exploits'],
    },
    tags: ['Security', 'CSRF']
  },
  {
    slug: 'sql-injection-advanced',
    title: 'SQL Injection beyond Basics',
    domain: 'security',
    difficulty: 'critical',
    shortDescription: 'Blind SQLi, Time-based attacks, and bypassing simple filters.',
    overview: {
      problem: 'Full database compromise via user input.',
      whyItHappens: 'String concatenation in SQL queries.',
      realWorldExamples: ['Large-scale data breaches'],
    },
    tags: ['Security', 'Databases']
  },
  {
    slug: 'ssrf-microservices',
    title: 'SSRF in Microservices',
    domain: 'security',
    difficulty: 'critical',
    shortDescription: 'Trick the server into attacking internal infrastructure or metadata services.',
    overview: {
      problem: 'Accessing internal cloud metadata (AWS/GCP) from a public endpoint.',
      whyItHappens: 'Server-side fetching of user-provided URLs without validation.',
      realWorldExamples: ['Capital One breach'],
    },
    tags: ['Security', 'Cloud']
  },
  {
    slug: 'supply-chain-attacks',
    title: 'Supply Chain Attacks',
    domain: 'security',
    difficulty: 'hard',
    shortDescription: 'Malicious code hiding inside your node_modules via deep dependencies.',
    overview: {
      problem: 'Your application is compromised because a library you use was hacked.',
      whyItHappens: 'Lack of dependency pinning and security auditing.',
      realWorldExamples: ['SolarWinds', 'event-stream npm hack'],
    },
    tags: ['Security', 'DevOps']
  },
  {
    slug: 'secrets-leaking',
    title: 'Secrets Leaking in Logs/Git',
    domain: 'security',
    difficulty: 'hard',
    shortDescription: 'Accidentally pushing AWS keys or DB credentials to public repositories or logs.',
    overview: {
      problem: 'Instant infrastructure compromise.',
      whyItHappens: 'Hardcoding secrets or including them in environment logs.',
      realWorldExamples: ['AWS keys scraped from GitHub in minutes'],
    },
    tags: ['Security', 'DevOps']
  },

  // Observability
  {
    slug: 'distributed-tracing-correlation',
    title: 'Distributed Tracing Correlation',
    domain: 'observability',
    difficulty: 'core',
    shortDescription: 'Connecting logs from Service A, B, and C to a single user request.',
    overview: {
      problem: 'Debugging errors across microservices is impossible without a trace ID.',
      whyItHappens: 'Context propagation across network boundaries.',
      realWorldExamples: ['Jaeger', 'Honeycomb', 'Datadog implementations'],
    },
    tags: ['Observability', 'Microservices']
  },
  {
    slug: 'cardinality-explosion',
    title: 'Cardinality Explosion in Metrics',
    domain: 'observability',
    difficulty: 'hard',
    shortDescription: 'Prometheus crashing because you added "user_id" as a label to a metric.',
    overview: {
      problem: 'Monitoring systems become slow or crash, and storage costs skyrocket.',
      whyItHappens: 'Too many unique combinations of labels (dimensions) in metrics.',
      realWorldExamples: ['Uber M3 storage issues'],
    },
    tags: ['Observability', 'Performance']
  },
  {
    slug: 'log-aggregation-petabyte',
    title: 'Log Aggregation at Petabyte Scale',
    domain: 'observability',
    difficulty: 'core',
    shortDescription: 'Searching logs across thousands of servers in seconds.',
    overview: {
      problem: 'Standard ELK stacks failing under high ingestion rates.',
      whyItHappens: 'Indexing overhead and I/O bottlenecks.',
      realWorldExamples: ['Splunk', 'Grafana Loki architecture'],
    },
    tags: ['Observability', 'Scalability']
  },
  {
    slug: 'memory-leak-node',
    title: 'Memory Leak in Node.js Service',
    domain: 'observability',
    difficulty: 'hard',
    shortDescription: 'Identifying slow growth in heap usage before the service OOMs.',
    overview: {
      problem: 'Services becoming slow and eventually crashing every 4 hours.',
      whyItHappens: 'Closure references or global arrays that never get GCed.',
      realWorldExamples: ['Node.js production debugging'],
    },
    tags: ['Node.js', 'Performance']
  },
  {
    slug: 'production-incident-triage',
    title: 'Production Incident Triage Process',
    domain: 'observability',
    difficulty: 'core',
    shortDescription: 'The systematic approach to identifying and mitigating outages under pressure.',
    overview: {
      problem: 'Engineers panicking during outages and making things worse.',
      whyItHappens: 'Lack of clear observability signals and structured playbooks.',
      realWorldExamples: ['SRE best practices'],
    },
    tags: ['SRE', 'DevOps']
  },

  // SaaS
  {
    slug: 'noisy-neighbor',
    title: 'Noisy Neighbor in Shared Tenancy',
    domain: 'saas',
    difficulty: 'critical',
    shortDescription: 'One large customer slowing down the experience for all other tenants.',
    overview: {
      problem: 'Resource starvation due to shared infrastructure.',
      whyItHappens: 'Lack of per-tenant resource quotas and isolation.',
      realWorldExamples: ['AWS EC2 history', 'B2B SaaS platforms'],
    },
    tags: ['SaaS', 'Performance']
  },
  {
    slug: 'webhook-reliability',
    title: 'Webhook Delivery Reliability',
    domain: 'saas',
    difficulty: 'hard',
    shortDescription: 'Ensuring 100% delivery of events to third-party integrations with retries and signatures.',
    overview: {
      problem: 'Customers missing critical data because their server was down for 5 minutes.',
      whyItHappens: 'Network unreliability and lack of robust retry logic with exponential backoff.',
      realWorldExamples: ['Stripe webhooks', 'GitHub Actions hooks'],
    },
    tags: ['SaaS', 'Queues']
  },
  {
    slug: 'large-file-upload',
    title: 'Large File Upload Architecture',
    domain: 'saas',
    difficulty: 'hard',
    shortDescription: 'Handling 10GB uploads without crashing the web server or timing out.',
    overview: {
      problem: 'Standard HTTP uploads failing due to timeouts and memory limits.',
      whyItHappens: 'Multipart uploads and lack of direct-to-cloud (S3) signed URLs.',
      realWorldExamples: ['Dropbox', 'Video processing platforms'],
    },
    tags: ['Architecture', 'Cloud']
  },
  {
    slug: 'multi-region-data-residency',
    title: 'Multi-Region Data Residency',
    domain: 'saas',
    difficulty: 'advanced',
    shortDescription: 'Keeping German user data in Germany and US data in the US for GDPR/compliance.',
    overview: {
      problem: 'Legal requirements forcing data fragmentation.',
      whyItHappens: 'Complex routing and data partitioning requirements.',
      realWorldExamples: ['Enterprise SaaS compliance'],
    },
    tags: ['Compliance', 'Distributed Systems']
  },
  {
    slug: 'tenant-onboarding-scale',
    title: 'Tenant Onboarding at Scale',
    domain: 'saas',
    difficulty: 'advanced',
    shortDescription: 'Automating database provisioning and DNS for thousands of new customers.',
    overview: {
      problem: 'Manual bottlenecks in scaling a B2B platform.',
      whyItHappens: 'Lack of Infrastructure-as-Code and automated provisioning.',
      realWorldExamples: ['Salesforce', 'Shopify architecture'],
    },
    tags: ['SaaS', 'Automation']
  },

  // AI
  {
    slug: 'rag-pipeline-latency',
    title: 'RAG Pipeline Latency & Accuracy',
    domain: 'ai',
    difficulty: 'advanced',
    shortDescription: 'Balancing the trade-off between retrieval quality and end-to-end response time.',
    overview: {
      problem: 'AI bots taking 10+ seconds to respond because of slow vector searches.',
      whyItHappens: 'Large document chunks and slow embedding models.',
      realWorldExamples: ['Enterprise AI search'],
    },
    tags: ['AI', 'Performance', 'RAG']
  },
  {
    slug: 'vector-db-at-scale',
    title: 'Vector DB at Scale',
    domain: 'ai',
    difficulty: 'hard',
    shortDescription: 'Managing millions of embeddings with low-latency search (HNSW vs IVF).',
    overview: {
      problem: 'Vector search performance degrading as the dataset grows.',
      whyItHappens: 'Index reconstruction costs and RAM requirements for vector indices.',
      realWorldExamples: ['Pinecone', 'Milvus', 'pgvector production'],
    },
    tags: ['AI', 'Databases']
  },
  {
    slug: 'llm-prompt-injection',
    title: 'LLM Prompt Injection Attacks',
    domain: 'ai',
    difficulty: 'critical',
    shortDescription: 'Bypassing AI constraints to leak system prompts or perform unauthorized actions.',
    overview: {
      problem: 'AI safety boundaries being ignored by clever user input.',
      whyItHappens: 'LLMs treat data and instructions as part of the same input stream.',
      realWorldExamples: ['ChatGPT jailbreaks', 'Customer bot exploits'],
    },
    tags: ['Security', 'AI']
  },
  {
    slug: 'streaming-llm-responses',
    title: 'Streaming LLM Responses',
    domain: 'ai',
    difficulty: 'core',
    shortDescription: 'Implementing Server-Sent Events (SSE) for better perceived performance.',
    overview: {
      problem: 'Users waiting too long for a full AI response to be generated.',
      whyItHappens: 'LLMs generate text token by token; waiting for the full string is a UX bottleneck.',
      realWorldExamples: ['ChatGPT UI', 'DevScenarios Chat'],
    },
    tags: ['AI', 'UX', 'Performance']
  },
  {
    slug: 'embedding-version-drift',
    title: 'Embedding Model Version Drift',
    domain: 'ai',
    difficulty: 'advanced',
    shortDescription: 'Why you have to re-index everything when you change your embedding model.',
    overview: {
      problem: 'Vector search returns garbage after a model "upgrade".',
      whyItHappens: 'Different models map text to different vector spaces.',
      realWorldExamples: ['Upgrading from OpenAI ada-002 to v3'],
    },
    tags: ['AI', 'Maintenance']
  }
];
