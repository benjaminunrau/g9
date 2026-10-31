# Test Plan Skeleton

## Purpose

Plan verification for the academic Real Estate CRM against assignment requirements R1–R12. This is a living checklist: add concrete test names, data, and execution results as implementation details become available.

## Test environment

| Item | Value |
|---|---|
| OS / clean-machine target | TBD |
| Java / JDK | JDK 21 target; validation used JDK 21 (local machine default is JDK 25) |
| Spring Boot | 4.1.2 (verify against Educa) |
| Maven | 3.10.0 via Maven Wrapper |
| Angular / Angular CLI | Angular 22 / CLI 22.2.5 (verify against Educa) |
| Node.js | Use 22.22.3 or another release supported by Angular 22 |
| PostgreSQL | 18 container image (verify against Educa) |
| Backend base URL | `http://localhost:8080` |
| Frontend origin | `http://localhost:4200`; this exact origin is configured for CORS |
| Database creation / migration command | `docker compose up -d db`; migrations run at backend startup |
| Seeded test users and roles | Document non-production demo credentials here after implementation; never include real secrets |
| Test data reset procedure | TBD |

## Test levels

1. **Backend unit tests:** service/domain behavior, validation and authorization decisions where practical.
2. **Backend integration tests:** REST endpoints, persistence, migrations, constraints, security, and error responses against a test database.
3. **Frontend unit/component tests:** form validation, loading/error/empty states, route guards, and component behavior.
4. **API contract/manual checks:** Swagger availability, request/response DTOs, HTTP methods and status codes.
5. **End-to-end/manual acceptance:** full role-specific user workflow through Angular and the live API.
6. **Clean-machine/reproducibility check:** follow README from a fresh environment and confirm the demo workflow.

Use the project's generated test tooling and existing test runner. Record exact commands in README after the applications are scaffolded.

## Requirement traceability checklist

Status values: `Not started`, `In progress`, `Pass`, `Fail`, `Blocked`. Record run date, build/commit, and evidence when a test is executed.

| ID | Requirement / scenario | Level | Expected result | Status | Evidence / notes |
|---|---|---|---|---|---|
| T-01 / R1 | Create and persist at least three related entities; verify one-to-many relationship | Integration | PostgreSQL stores valid related records and enforces references | Not started | |
| T-00 / scaffold | GET `/api/health` | Backend MVC test / manual | `200 OK` with `{"status":"UP"}`; no database required for the controller test | Pass | Maven test; live smoke check |
| T-00b / scaffold | GET an unconfigured protected API path without credentials | Backend MVC test / manual | `401 Unauthorized`; no protected business routes exist yet | Pass | Maven test; live smoke check |
| T-00c / scaffold | Run Angular health component with API success/failure | Frontend unit test | Visible loading then success or actionable connection-error state | Pass | 3 Angular tests |
| T-00d / scaffold | Start PostgreSQL using Compose | Container / manual | PostgreSQL 18 accepts connections on the configured local port | Pass | `podman compose up -d db`; `pg_isready` |
| T-02 / R2 | Create a property | API / integration | `201 Created`; response contains stable ID and output DTO | Not started | |
| T-03 / R2 | List properties | API / integration | `200 OK`; returns expected collection | Not started | |
| T-04 / R2 | Read property detail | API / integration | `200 OK` for existing ID; `404 Not Found` for unknown ID | Not started | |
| T-05 / R2 | Update property | API / integration | Correct update status and updated representation; invalid input rejected | Not started | |
| T-06 / R2 | Delete property | API / integration | `204 No Content` when deletion is allowed; referenced-record policy is enforced | Not started | |
| T-07 / R2 | Full CRUD for second entity (Client) | API / integration | Create/list/detail/update/delete and expected status codes work | Not started | |
| T-08 / R2 | HTTP error statuses | API / integration | Relevant cases return `400`, `401`, `403`, and `404` as appropriate | Not started | |
| T-09 / R3 | Layering and DTO boundaries | Review / unit | Controllers delegate; input/output DTOs are used; business rules live outside controllers | Not started | |
| T-10 / R4 | Invalid or missing request fields | API / integration | Bean Validation rejects input with uniform, useful JSON error shape | Not started | |
| T-11 / R4 | Invalid property/client references on inquiry | API / integration | Request is rejected; no orphan or partial inquiry is persisted | Not started | |
| T-12 / R5 | Open Swagger UI / OpenAPI document | Manual / API | Documentation loads in browser and describes the implemented endpoints | Pass | Live Swagger UI returns HTTP 200; API description is configured |
| T-13 / R6 | Login with valid/invalid credentials | Integration / E2E | Valid credentials authenticate; invalid credentials receive a safe error | Not started | |
| T-14 / R6 | Password storage | Integration / review | Stored password is BCrypt-hashed and never returned by API | Not started | |
| T-14a / maintainability | Password encoder boundary | Unit / review | Account/authentication code uses the injected `PasswordEncoder` contract and has no direct BCrypt-specific hashing calls | Not started | |
| T-14b / post-course migration | BCrypt-to-Argon2id migration design | Migration test / review | Existing BCrypt hashes remain verifiable during migration and are upgraded only through the documented, approved migration flow | Deferred | Run after the course, before enabling Argon2id |
| T-15 / R6 | Role-protected endpoints | Integration | ADMIN and AGENT permissions match the documented policy; forbidden access is `403` | Not started | |
| T-16 / R7 | CORS allowed frontend origin | Integration / manual | Configured frontend origin succeeds for intended requests | Pass | Backend MVC test for `http://localhost:4200` |
| T-17 / R7 | CORS disallowed origin | Integration / manual | Unconfigured origin is not granted access; wildcard `*` is not used | Pass | Backend MVC test returns `403` for an unconfigured origin |
| T-18 / R8 | Unauthenticated Angular navigation/API request | E2E | Protected route redirects/denies access; API request has no unauthorized success | Not started | |
| T-19 / R8 | Role-aware route access and credentials | E2E | Guards reflect session/role and API credentials are attached on required requests | Not started | |
| T-20 / R9 | Required SPA screens | E2E / manual | Login, listing, create/edit form, and detail or dashboard are reachable | Not started | |
| T-21 / R10 | HttpClient data flow | Component / E2E | UI displays API data and handles successful responses | Not started | |
| T-22 / R10 | Loading, error, and empty states | Component / E2E | Each state is visible and recoverable; no silent failure | Not started | |
| T-23 / R10 | Form validation | Component / E2E | Invalid form cannot submit; field-level feedback is understandable | Not started | |
| T-24 / workflow | Inquiry workflow | E2E / manual | User links a client to a property and updates inquiry status | Not started | |
| T-25 / R11 | Repository and documentation | Manual / review | Both students have meaningful commits; README explains clean setup; AI.md is present | Not started | |
| T-26 / R12 | Clean-machine startup | Acceptance | Database, backend, and frontend run from documented instructions | Not started | |

## Core acceptance workflows

### ADMIN workflow

- [ ] Sign in with seeded ADMIN account.
- [ ] Create, list, view, update, and delete a property where deletion policy permits.
- [ ] Create, list, view, update, and delete a client where deletion policy permits.
- [ ] Create an inquiry linking an existing client and property; update its status.
- [ ] Verify invalid input and missing records produce visible, useful errors.
- [ ] Verify ADMIN-only user or administrative functions, if included, are inaccessible to AGENT.

### AGENT workflow

- [ ] Sign in with seeded AGENT account.
- [ ] View and manage only properties permitted by the ownership policy.
- [ ] Attempt to access or change another agent's property; confirm backend rejects it.
- [ ] Work with an inquiry and permitted client information according to the agreed policy.
- [ ] Verify changing client-supplied agent/organization identifiers cannot bypass ownership checks.

### Unauthenticated / negative workflow

- [ ] Request a protected API route without credentials; confirm `401 Unauthorized`.
- [ ] Request a role-restricted route as the wrong role; confirm `403 Forbidden`.
- [ ] Submit malformed and semantically invalid payloads; confirm uniform `400 Bad Request` errors.
- [ ] Request unknown IDs and invalid references; confirm `404` or the explicitly chosen validation status.
- [ ] Attempt a disallowed cross-origin browser request; confirm CORS does not allow it.

## Defect and run record

For each execution, record:

| Date | Commit / tag | Tester | Command or workflow | Passed / failed | Defect link / notes |
|---|---|---|---|---|---|
| 2026-10-30 | Working tree | Project scaffold | `./mvnw test`; `npm test -- --watch=false`; `npm run build`; Podman Compose database and live API smoke check | Passed | 3 backend tests, 3 frontend tests; build passed; health 200, Swagger 200, protected route 401 |

For each failure, capture the smallest reproducible input, expected result, actual result, and whether it blocks the assignment rubric or demo. Re-run the affected case and relevant regression checks after a fix.

## Release readiness

- [ ] All required R1–R12 cases have passing evidence.
- [ ] No known blocker remains in login, role enforcement, CRUD, inquiry workflow, or clean startup.
- [ ] Test commands and setup steps in README match the final repository.
- [ ] Full demo rehearsed with both role accounts and at least one intentional error case.
- [ ] Both students can run the tests and explain representative backend, frontend, and security behavior.
