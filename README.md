# Real Estate CRM

Academic project for **Programación de Aplicaciones en Redes**, FP-UNA, 2026. The goal is to build a small, working internal CRM for a real-estate organization while keeping a possible commercial product direction in mind.

## Project scope

The academic version is an internal tool for one seeded organization:

- Administrators manage users and CRM records.
- Agents manage their assigned listings and work with clients and inquiries.
- The system stores data in PostgreSQL and exposes it through a Spring Boot REST API.
- An Angular single-page application consumes the API.

The first useful workflow is: sign in, manage a property and a client, record an inquiry linking them, and update that inquiry's status. Build this as a complete vertical slice rather than implementing the entire backend before testing the frontend integration.

**Out of scope for the academic MVP:** public listing portal, multiple-organization onboarding or SaaS tenant management, billing, property-management operations, contract handling, WhatsApp automation, and AI features. The public agency showcase is a separate possible product and is not part of this assignment.

## Required technology and assignment checklist

Use the technologies mandated in the course brief:

- Java 21 or higher (LTS), Spring Boot, Spring Web, and Maven.
- PostgreSQL with Spring Data JPA or JdbcTemplate.
- SQL schema creation or Flyway migrations.
- Spring Security, BCrypt password hashes for the academic submission, and JWT or session authentication.
- OpenAPI/Swagger documentation using springdoc.
- Angular, TypeScript, and Angular CLI, including Router, HttpClient, forms, and route guards.
- CORS restricted to the frontend origin.

The course brief says exact Spring Boot, Angular, and PostgreSQL versions will be published on Educa. **Use those versions if published; do not treat “latest” as permission to disregard the course's version list.** This initial scaffold uses the current stable versions below because the exact Educa list has not yet been provided. Check Educa before feature work and change the pinned versions if required.

The implementation must meet R1–R12 from the assignment. In particular, it needs at least three related persisted entities, full REST CRUD for at least two entities, controller/service/repository layers with DTOs, validation and consistent JSON errors, Swagger, two backend-enforced roles, restricted CORS, guarded Angular routes, four or more screens, visible loading/error states, validated forms, a reproducible README, and a working clean-machine setup.

### Password hashing: BCrypt now, Argon2id after the course

The course submission must use **BCrypt**, as required by the assignment. Implement password hashing through Spring Security's `PasswordEncoder` abstraction rather than calling BCrypt-specific APIs from account or authentication code. Keep the chosen encoder configured in one place so the algorithm can be changed after the course without changing password-handling business logic.

After the academic project, Argon2id may be adopted as a separate, deliberate migration. At that point, support verification of existing BCrypt hashes and re-encode a user's password with Argon2id after a successful login (or use another explicit migration process). Configure and review Argon2id parameters and any required runtime dependencies before rollout. **Do not switch the graded submission to Argon2id unless the professor explicitly approves it.**

For the detailed requirement mapping and work sequence, see [docs/execution-plan.md](docs/execution-plan.md). For planned verification, see [docs/test-plan.md](docs/test-plan.md). The earlier planning conversation and product exploration are preserved in [docs/planning-notes.md](docs/planning-notes.md).

## Current status

The backend and Angular starter applications, PostgreSQL container setup, security/CORS foundation, API documentation, and API-health connection check are scaffolded. Property, client, inquiry, and login features are not implemented yet.

| Component | Selected version |
|---|---|
| Java | 21 (source compatibility; validated with JDK 21; local machine also has JDK 25) |
| Spring Boot | 4.1.2 |
| Angular / Angular CLI | 22.2 / 22.2.5 |
| Node.js | 22.22.3 or compatible supported release |
| PostgreSQL | 18 (container image `postgres:18-alpine`) |
| Maven | 3.10.0 via Maven Wrapper |

## Requirements before implementation

- **Group:** two students; both contribute genuine commits and can explain the complete application.
- **Topic:** confirm the real-estate CRM topic with the professor if it has not already been submitted/accepted.
- **AI declaration:** maintain `AI.md` with tools used and unedited prompts, as required by the assignment.
- **Repository:** use GitHub; add `ggaleanopy` as collaborator as directed by the brief.
- **Final delivery:** submit the repository and final tag/commit through Educa by the applicable deadline. The brief lists December 2, 2026 at 23:59 for the first final; verify the applicable date if defending in another session.

## Local development

### Prerequisites

- JDK 21 or higher (the Maven project targets Java 21; JDK 21 is the validated setup).
- Node.js 22.22.3 or another version supported by the selected Angular release, plus npm.
- Docker Compose or Podman Compose.
- Network access on first setup to download Maven and npm dependencies.

### Start the database

From the project root:

```sh
cp .env.example .env
docker compose up -d db
```

With Podman, use `podman compose up -d db` if its Compose provider is installed. The database is bound to localhost only. The credentials in `.env.example` are for local development and must not be used in a deployed environment. Flyway is configured for migrations; no business tables exist yet.

### Run the backend

From the project root:

```sh
cd backend
set -a
. ../.env
set +a
./mvnw spring-boot:run
```

Make sure `JAVA_HOME` and `PATH` select a JDK (not only a JRE); use JDK 21 for the reproducible baseline.

The API listens on `http://localhost:8080`. Verify the first connected endpoint at `http://localhost:8080/api/health`; the OpenAPI UI will be available at `http://localhost:8080/swagger-ui.html`. The health endpoint and API documentation are public; other requests require authentication. Login and demo accounts have not been implemented yet.

### Run the frontend

In another terminal:

```sh
cd frontend
npm ci
npm start
```

Open `http://localhost:4200`. The starter page checks the backend health endpoint and shows an explicit loading, success, or connection-error state. The API base URL is currently set in [frontend/src/app/core/api-config.ts](frontend/src/app/core/api-config.ts).

### Checks

```sh
(cd backend && ./mvnw test)
(cd frontend && npm test -- --watch=false)
(cd frontend && npm run build)
```

Run these from the project root. Backend tests do not require a running database; application startup does.

Stop the database with `docker compose down`. To remove the local database contents as well, use `docker compose down -v`.

## Product and data principles

- Keep business rules in services, not controllers.
- Enforce authorization in the backend; Angular route guards are not a security boundary.
- Do not allow client-supplied agent or organization IDs to bypass ownership checks.
- Use language-neutral persisted status values and translate display labels in the UI.
- Avoid collecting personal data that the MVP does not need.
- Do not hard-delete referenced business records without an explicit, safe deletion rule.
- Keep tenant onboarding and multi-tenant production guarantees out of scope until they are deliberately designed and tested.

## Repository layout

```text
backend/       Spring Boot API, migrations, and backend tests
frontend/      Angular SPA and frontend tests
docs/          Execution plan, test plan, and preserved planning notes
compose.yaml   Local PostgreSQL service
AI.md          AI tool declaration and unedited prompts
```

## License and attribution

Add licensing and third-party attribution information when the project chooses a license or includes externally sourced assets.
