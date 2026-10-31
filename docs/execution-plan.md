# Execution Plan

## Objective

Deliver a demonstrable, reproducible real-estate CRM that satisfies all assignment requirements (R1–R12) by the applicable submission date. Prioritize a correct end-to-end business workflow and the course rubric over commercial features.

## Product boundaries

**In scope:** one seeded organization; ADMIN and AGENT roles; property and client CRUD; inquiries connecting clients and properties; authentication; a basic dashboard; PostgreSQL persistence; Spring Boot REST API; Angular SPA; validation, API documentation, and setup documentation.

**Not in scope:** public listing website, self-service organization signup, production multi-tenancy, subscriptions, messaging integrations, appointments, contracts, payments, property operations, maps, advanced analytics, and AI features.

The MVP relationship model should include at least Organization, User, Property, Client, and Inquiry. Keep the model no larger than needed to implement the required workflow. Confirm field definitions, ownership, and deletion rules with the team before database migrations are established.

## Constraints and open decisions

| Item | Status / action |
|---|---|
| Java | Assignment requires JDK 21 or higher (LTS); scaffold targets Java 21. Local machine has JDK 25. |
| Spring Boot, Angular, PostgreSQL | Initial scaffold uses Spring Boot 4.1.2, Angular CLI 22.2.5 / Angular 22, and PostgreSQL 18. Check Educa for prescribed versions and adjust if needed. |
| Node.js | Angular 22 requires a supported Node version; scaffold generation used the installed runtime despite its one-patch engine warning. Use Node 22.22.3 or another officially supported release for validation. |
| Persistence/schema | Spring Data JPA and Flyway selected for the initial scaffold, following planning notes. |
| Authentication | JWT or session remains open; protected routes currently require authentication, but no login mechanism/accounts are implemented. |
| Password hashing | Use BCrypt for the course deliverable. Inject/use Spring Security's `PasswordEncoder` abstraction so post-course adoption of Argon2id does not require algorithm-specific changes in account/authentication logic. |
| Topic approval | Confirm with the professor if not already done; the stated October 15 notification date has passed. |
| Team and defense date | Confirm both members, availability, and which final-session deadline applies. |
| AI record | Create and maintain `AI.md`; preserve prompts unedited as required. |

Do not silently treat an unresolved choice as settled. Record the choice in this plan or README when made.

## Milestones

Dates below adapt the assignment's suggested milestones to the current planning date, October 30, 2026. They are working targets; the professor's requirements and applicable delivery date take precedence.

### 1. Confirm constraints and bootstrap — October 30 to November 1

- [ ] Confirm topic approval, team members, submission session, and exact versions from Educa.
- [ ] Create the GitHub repository and ensure both students can contribute.
- [x] Generate the Spring Boot and Angular applications using current stable versions (recheck against Educa).
- [x] Establish PostgreSQL development configuration without committing `.env` credentials.
- [x] Add basic run/build instructions and record scaffold versions.
- [x] Add an API health endpoint, a protected-by-default security baseline, restricted CORS, BCrypt encoder, and OpenAPI UI configuration.
- [x] Verify backend tests, Angular tests/build, and PostgreSQL container startup; smoke-test the API health response.
- [ ] Ensure both students can run the starter locally.
- **Exit check:** both applications build; PostgreSQL starts; both students can run the starter locally.

### 2. Domain model and first API vertical slice — November 2 to November 5

- [ ] Agree on entity relationships and first-pass fields.
- [ ] Create database schema/migrations and seed only non-sensitive demo data.
- [ ] Implement Property persistence, DTOs, validation, service, and REST controller.
- [ ] Add API error responses and correct status codes for the implemented endpoints.
- [ ] Add OpenAPI/Swagger and verify it is browser-accessible.
- [ ] Exercise the property API against PostgreSQL.
- **Exit check:** property create/list/detail/update/delete works end-to-end through the API; no business rules reside in controllers.

### 3. Complete required API and data model — November 6 to November 11

- [ ] Implement Client CRUD and confirm full CRUD exists for at least two entities.
- [ ] Implement the Inquiry relationship and its initial status workflow.
- [ ] Add at least three related persisted entities and verify foreign-key behavior.
- [ ] Standardize Bean Validation and JSON errors, including not-found and conflict/invalid-reference cases.
- [ ] Review HTTP statuses and Swagger coverage against R1–R5.
- **Exit check:** core API works with PostgreSQL; CRUD, relationships, validation, error responses, and documentation are demonstrable.

### 4. Security and first connected SPA slice — November 12 to November 19

- [ ] Add Spring Security, BCrypt, seeded ADMIN/AGENT accounts, and role-based API authorization.
- [ ] Choose and implement JWT or session authentication.
- [ ] Restrict CORS to the configured Angular origin.
- [ ] Create Angular login and session handling, HttpClient API access, and route guards.
- [ ] Connect at least one property list screen to the live API.
- [ ] Verify unauthorized and forbidden cases in both API and UI behavior.
- **Exit check:** sign-in works; backend role restrictions are verified; Angular can load protected API data; CORS is not wildcarded.

### 5. Finish business workflow and SPA — November 20 to November 26

- [ ] Complete property and client list, detail, create/edit, and delete screens.
- [ ] Add inquiry creation linking an existing client and property; update inquiry status.
- [ ] Add a basic dashboard with useful counts.
- [ ] Ensure there are at least four distinct screens, including login, listing, form, and detail/dashboard.
- [ ] Add visible loading, empty, validation, and error states.
- [ ] Verify agent ownership and admin access rules on the server.
- **Exit check:** a complete demo workflow succeeds for both roles and required UI/API states are visible.

### 6. Stabilize, document, and rehearse — November 27 to December 2

- [ ] Run the test plan and resolve critical failures.
- [ ] Test a clean-machine setup using only the README.
- [ ] Complete README prerequisites, database initialization, run/test commands, and demo account instructions.
- [ ] Complete `AI.md` with tools and unedited prompts.
- [ ] Confirm commits from both members and add the professor as repository collaborator.
- [ ] Rehearse the full demo, an error/authorization scenario, and a small live code change.
- [ ] Create and verify the required final tag/commit; submit by the correct session deadline.
- **Exit check:** clean startup and full demo work, both students can explain the code, repository and submission artifacts are complete.

## Suggested implementation order

Build vertical slices in this sequence:

1. Bootstrap and API health connection check (scaffolded and validated; see T-00 through T-00d in the test plan).
2. Property persistence → service → DTO/controller → validation/error response → API check.
3. Client CRUD and shared conventions.
4. Inquiry creation and status update using existing property/client references.
5. Authentication and backend authorization.
6. Angular login and one protected property screen.
7. Remaining Angular screens and dashboard.
8. End-to-end verification, documentation, and defense rehearsal.

Each slice should be small enough to review, commit, and explain. Split work between students by coherent vertical features and pair-review security/domain boundaries; avoid separating work only into “frontend person” and “backend person.”

## Definition of done

- All R1–R12 assignment requirements have evidence in the test plan or demo checklist.
- API uses correct verbs/statuses and layered DTO/service/repository design.
- Passwords are BCrypt-hashed; roles are enforced by the backend; CORS is restricted.
- Password hashing uses the `PasswordEncoder` boundary; Argon2id is deferred until after the course and requires an explicit migration path for existing BCrypt hashes.
- Angular uses HttpClient, routing/guards, validated forms, and visible loading/error states.
- The database and applications can be started on a clean machine by following the README.
- Both group members have meaningful commits and can explain and modify any part of the application.
- AI use and unedited prompts are recorded in `AI.md`.
- The final repository reference and tag/commit are ready for Educa submission.

## Risks to manage

| Risk | Mitigation |
|---|---|
| Official dependency versions arrive late or differ from current defaults | Check Educa before scaffolding; pin compatible versions and avoid upgrades during feature work. |
| Scope grows toward a commercial SaaS/public portal | Use the explicit out-of-scope list; require a rubric or validated user need for additions. |
| Security is implemented only in Angular | Test protected API endpoints directly with each role and without credentials. |
| Integration happens too late | Connect Angular to the first API vertical slice before duplicating patterns. |
| Team members cannot defend code they did not write | Use reviewable commits, shared walkthroughs, and cross-feature live-change practice. |
| Final setup is machine-specific | Rehearse from a clean environment and document every prerequisite/configuration step. |
