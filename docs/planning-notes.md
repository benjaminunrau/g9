# Real Estate CRM — Project Planning & Conversation Notes

> **Status:** Planning document / proposed academic MVP.
> **Course:** Programación de Aplicaciones en Redes — FP-UNA, 2nd semester 2026.
> **Source:** `Proyecto_Final_Enunciado_ProgRedes_2026.pdf` (4 pages), plus the project-planning conversation through October 27, 2026.
> **Purpose:** Preserve the decisions, reasoning, options, and outstanding questions from the discussion in a file that can be placed in the project folder. **This is a structured consolidation of the conversation, not a verbatim chat transcript.**

## 1. Project idea and motivation

The planned application is a **web-based real estate CRM** for managing real estate properties, clients, prospective buyers/tenants, and inquiries. The initial version is an academic assignment; a future commercial version could target **both independent real estate agents and small/mid-sized agencies**.

The idea was compared with a delivery-service application. A CRM fits the professor's free-topic requirement, supplies natural relational entities and CRUD operations, and has potential to become commercially useful. The academic version should remain deliberately small: a working system with a coherent end-to-end business flow, not a full SaaS product.

**Product direction:** Model independent agents as one-person organizations and agencies as multi-user organizations. **Academic scope:** run one seeded organization only; do not implement multi-tenant onboarding or commercial tenant isolation yet.

## 2. Official assignment requirements (PDF)

The following are **requirements from the provided PDF**, not optional architectural preferences.

### Administrative constraints

- Group of **2 students**; both must contribute commits and understand all code.
- Topic is free, provided the domain has **at least 3 related entities** with at least one 1:N relation.
- Topic was due to be communicated to the professor by **October 15, 2026**; since that date has passed, confirm acceptance of the topic if it was not submitted.
- Code submission: **Wednesday, December 2, 2026, 23:59**, for the first final; demonstration/defense: **Thursday, December 3, 2026**. The PDF states another submission date applies if defending in the second final.
- Delivery via Educa includes repository link, `entrega-final` tag or final commit, team and topic, and `AI.md` declaration.
- AI coding agents are allowed, but the repository must declare tools used and include **unedited prompts** in `AI.md`.
- Repository must have genuine commit history, contributions from both members, README with setup instructions, and professor `ggaleanopy` added as collaborator (as prescribed in the technology table).
- App must run on the group's computer during defense and be reproducible on a clean machine by following the README.
- Defense has a full workflow demo, role/error demonstration, **live code modifications**, and conceptual questions. Individual defense accounts for **20%** of the grade.

### Mandatory stack

| Layer | Specified technology / requirement |
|---|---|
| Backend | **Java JDK 21 or higher (LTS), Spring Boot, Spring Web, Maven** |
| Backend architecture | Controllers, services, repositories, DTO input/output; no business logic in controllers |
| Database | **PostgreSQL** |
| Data access | **Spring Data JPA or JdbcTemplate** (explicit choice) |
| Database initialization | SQL creation script **or Flyway migrations** (explicit choice) |
| Security | **Spring Security**, hashed passwords with **BCrypt**, JWT **or** session authentication |
| API docs | **OpenAPI / Swagger with springdoc**, browsable in browser |
| Frontend | **Angular + TypeScript + Angular CLI**, Router, HttpClient, forms, route guards |
| CORS | Only configured frontend origin, never wildcard `*` |
| Repository | Git, GitHub/GitLab workflow, real commits |

**Version note:** Exact Spring Boot, Angular and PostgreSQL versions are published on Educa. Do not select versions independently without checking them.

**TypeScript note:** TypeScript is explicitly part of the assigned Angular technology stack; it is not merely an informal JavaScript substitution.

### Functional requirements checklist (R1–R12)

- [ ] **R1:** At least 3 related persisted entities, including at least one 1:N relationship.
- [ ] **R2:** Full CRUD (create/list/detail/update/delete) for at least 2 entities through REST with appropriate HTTP verbs and statuses `200`, `201`, `204`, `400`, `401`, `403`, `404`.
- [ ] **R3:** Controller–service–repository layering, with input/output DTOs.
- [ ] **R4:** Bean Validation and uniform JSON errors.
- [ ] **R5:** Browsable Swagger/OpenAPI documentation.
- [ ] **R6:** Login/password with BCrypt; at least two roles with backend authorization.
- [ ] **R7:** Restrict CORS to frontend origin.
- [ ] **R8:** Angular route guards based on session and role; send credentials with every API request.
- [ ] **R9:** At least four SPA screens: login, listing, create/edit form, detail/dashboard.
- [ ] **R10:** `HttpClient`, visible loading/error states, validated forms.
- [ ] **R11:** Git repository with contributions from both members and complete setup README.
- [ ] **R12:** Can start on a clean machine; defense on group's computer.

**Optional extras:** Docker Compose, automated tests, pagination/filtering, cloud deployment. These do not replace mandatory requirements.

### Grading

| Area | Weight |
|---|---:|
| Functionality | 25% |
| REST API and data | 20% |
| Security | 10% |
| Angular SPA | 15% |
| Code/repository quality | 10% |
| Individual defense | 20% |

## 3. Proposed academic MVP

**Working definition:** An internal CRM for one seeded real estate organization. ADMIN users manage accounts and records; AGENT users manage authorized assigned listings and work with clients/inquiries. Persistent relational data, role controls, proper API semantics, and a functional Angular SPA are the priorities.

### Five suggested entities

1. **Organization:** `id`, `name`, `type` (`SOLO`, `AGENCY`). Seed one organization; do not build organization self-registration.
2. **User:** `id`, `organizationId`, `name`, `email`, `passwordHash`, `role` (`ADMIN`, `AGENT`), `active`.
3. **Property:** `id`, `organizationId`, `agentId`, `title`, `description`, `type`, `operation` (sale/rent), `price`, `city`, `status`.
4. **Client:** `id`, `organizationId`, `name`, `email`, `phone`, `notes`.
5. **Inquiry:** `id`, `propertyId`, `clientId`, `status`, `notes`, `createdAt`.

Relationships: organization 1:N users/properties/clients; agent 1:N assigned properties; property 1:N inquiries; client 1:N inquiries. The inquiry table links clients to properties, allowing multiple clients per property and multiple properties per client.

Suggested inquiry statuses: `NEW`, `CONTACTED`, `VISIT_SCHEDULED`, `CLOSED`. Suggested property statuses: `AVAILABLE`, `RESERVED`, `SOLD` / `RENTED` as appropriate. Keep persistent status codes language-neutral and translate display labels.

### MVP screens

1. **Login:** credentials and error feedback.
2. **Dashboard:** simple counts (properties, available listings, pending inquiries).
3. **Property management:** listing, create/edit, detail, delete, agent assignment, status.
4. **Client management:** listing, create/edit, detail, delete.
5. **Inquiry management:** create inquiry linking client and property, view/update status.
6. **Administration:** create/manage agent users, accessible to ADMIN only.

### Scope boundaries

**Implement now:** authentication, role authorization, CRUD of properties and clients, inquiry workflow, basic dashboard, validations, API docs, clean errors, README, `AI.md`, tests as time permits.

**Useful extras if ahead of schedule:** filters by property status/type/price, pagination, Docker Compose, automated integration/E2E tests, better UI polish.

**Defer:** multi-tenancy and tenant self-service, subscriptions/billing, WhatsApp automation, scheduled visits, notification workflows, contract management, commission accounting, public listing portal, rich image management, maps/geolocation, deep analytics, AI features.

### Demonstration scenario

1. Log in as **ADMIN**.
2. Create an **AGENT** account.
3. Create a property and assign the agent.
4. Create a prospective client.
5. Create an inquiry connecting the client and property.
6. Log in as **AGENT**, update an allowed inquiry, and show a forbidden action is blocked.
7. Show validation failure (e.g. negative price), missing resource (`404`), authorization failure (`403`), and API docs.
8. Demonstrate persistence after restarting the app.

Practice live changes such as adding a `bedrooms` field, a status filter, or a validation rule. Both teammates need to understand the frontend, backend, and database interactions.

## 4. Proposed REST API

These endpoints are **design suggestions**, not literal URLs required by the PDF.

| Resource | Suggested endpoints | Authorization |
|---|---|---|
| Authentication | `POST /api/auth/login` | Public |
| Properties | `GET /api/properties`, `POST /api/properties` | Authenticated, operations subject to ownership |
| Property detail | `GET`, `PUT`, `DELETE /api/properties/{id}` | Authenticated, ownership rules |
| Clients | `GET /api/clients`, `POST /api/clients` | Authenticated |
| Client detail | `GET`, `PUT`, `DELETE /api/clients/{id}` | Authenticated |
| Inquiries | `GET /api/inquiries`, `POST /api/inquiries` | Authenticated |
| Inquiry detail | `GET`, `PATCH /api/inquiries/{id}` | Authenticated |
| Users | `GET /api/users`, `POST /api/users` | ADMIN |

**Proposed permissions:** ADMIN controls organization users and all CRM records; AGENT modifies only assigned properties while accessing permitted shared clients/inquiries. Backend must enforce every rule regardless of Angular guards. Do not permit arbitrary client-submitted agent IDs to override ownership checks.

**Proposed deletion behavior:** avoid automatically cascading business-data deletion; reject deletion of a property still referenced by inquiries unless a deliberate archival/cleanup rule is defined.

## 5. Core architecture

```text
Angular SPA (TypeScript)
  ├── Angular Router + guards
  ├── HttpClient / auth interceptor
  ├── reactive forms and validation
  └── localized UI components
        │ REST / JSON / HTTP
        ▼
Spring Boot API
  ├── Controllers (+ DTOs + Bean Validation)
  ├── Business services
  ├── Spring Security (roles, BCrypt, JWT or session)
  ├── Persistence interfaces / repositories
  └── JPA adapter (optional added abstraction)
        │
        ▼
PostgreSQL + Flyway
```

Recommended academic implementation: **modular monolith**, feature-oriented packages, strict controller/service/repository separation. Avoid microservices, Kubernetes, messaging infrastructure, or an AI runtime simply for trendiness.

### Suggested repository layout

```text
real-estate-crm/
├── backend/
│   └── src/main/java/.../crm/
│       ├── auth/
│       ├── organization/
│       ├── user/
│       ├── property/
│       ├── client/
│       ├── inquiry/
│       ├── security/
│       └── common/
├── frontend/
│   └── src/app/
│       ├── core/
│       ├── features/
│       └── shared/
├── docs/
│   ├── architecture.md
│   ├── domain-model.md
│   └── requirements.md
├── compose.yaml                 # optional but recommended
├── AGENTS.md                     # agent conventions; optional
├── AI.md                         # REQUIRED for use of AI
└── README.md
```

Each backend feature can internally group its controller, service, DTOs, repositories, and domain types.

### Database replaceability: PostgreSQL → MongoDB

**Question from discussion:** Can PostgreSQL be implemented so it can later be replaced with MongoDB? **Answer: yes, with boundaries, but not zero-cost.**

A lightweight **Ports and Adapters** approach is possible:

```text
Controller → Service → domain-facing persistence interface
                               ├── Postgres/JPA adapter (now)
                               └── MongoDB adapter (future)
```

Example interface:

```java
public interface PropertyStore {
    Optional<Property> findById(UUID id);
    Property save(Property property);
    void deleteById(UUID id);
}
```

To reduce coupling, a `Property` domain object can be distinct from a `PropertyJpaEntity` and, in a future adapter, `PropertyMongoDocument`. In that style, domain services operate on the interface rather than JPA-specific APIs.

**Tradeoff:** separate domain and persistence classes plus mapping logic add implementation and defense burden. A normal Spring Data JPA repository behind a service is also completely reasonable for the five-week assignment. Adopt lightweight ports only where they pay off; **do not implement a Mongo adapter now**.

Even with ports, a Mongo migration would still require new persistence models, database queries/indexes, transaction rules, migrations and data migration tooling. Complex relational reporting may change. **The actual recommendation is to keep PostgreSQL commercially unless there is a demonstrated need to switch.**

### PostgreSQL vs MongoDB

The CRM is naturally relational: organizations, agents, properties, clients, and inquiries. PostgreSQL provides foreign keys, joins, SQL reporting, transactions, and `JSONB` for flexible property-specific details. MongoDB supports transactions and joins/aggregations but requires different relationship modeling and integrity decisions. MongoDB is not automatically better for SaaS, larger scale, or agentic development.

For property attributes that differ across houses, land, and commercial listings, **PostgreSQL JSONB** may eventually be useful. Do **not** add it unless the MVP actually needs dynamic attributes; simple columns are easier for the assignment.

## 6. Technical choices: mandated vs flexible

| Decision | Assignment says | Suggested choice / caution |
|---|---|---|
| Backend | Java 21+ LTS, Spring Boot, Maven | Keep mandated stack |
| Frontend | Angular + TypeScript + CLI | Modern standalone components, strict TS, reactive forms |
| Persistence | PostgreSQL; JPA **or** JdbcTemplate | Spring Data JPA |
| Schema creation | SQL **or** Flyway | Flyway |
| Security | Spring Security, BCrypt | BCrypt for submission unless professor authorizes alternative |
| Authentication | JWT **or** session | JWT was suggested; sessions may simplify the MVP |
| API docs | Swagger/OpenAPI | `springdoc`; optionally generated Angular client |
| API client | HttpClient required | Direct HttpClient or typed OpenAPI-generated wrappers |
| UI library | Not specified | Angular-native components; possible Angular Material |
| Styling | Not specified | CSS/SCSS and shared design tokens |
| IDs | Not specified | UUIDs proposed |
| Testing | Optional extra | Add targeted JUnit, integration, Angular and minimal E2E checks |
| Deployment | Runs locally; cloud optional | Start local, Docker Compose useful |
| Version control | Git with authentic teammate commits | Small reviewable commits + CI when feasible |

### BCrypt vs Argon2id

The user previously used BCrypt in homework and asked whether **Argon2id** would be better. Argon2id is generally a stronger modern default for **new password storage** when properly configured. However the PDF **explicitly says BCrypt**, and unlike JWT/session, it does not list a hashing alternative. **Use BCrypt for grading or obtain explicit professor approval to substitute Argon2id.**

**Implementation requirement:** use BCrypt for the academic submission, but route password encoding and matching through Spring Security's `PasswordEncoder` abstraction. Do not scatter BCrypt-specific calls through account/authentication logic; configure the encoder in one place so the algorithm can be replaced without rewriting that logic.

**Post-course direction:** Argon2id may replace BCrypt after the assignment. Treat that as a deliberate migration, not a mid-project algorithm switch. Existing BCrypt hashes must remain verifiable during transition and can be upgraded to Argon2id after successful authentication, or through another explicitly planned process. Spring Security's `DelegatingPasswordEncoder` can support hashes tagged with algorithm IDs. Review Argon2id parameters, dependencies/runtime requirements, and migration behavior before rollout. **Do not submit Argon2id for grading unless the professor explicitly approves it.**

### Is the tech stack outdated for AI-agent development?

Overall **no**. Java 21+, Spring Boot, Angular/TypeScript, PostgreSQL, Spring Data JPA, REST and OpenAPI remain suitable for enterprise/business applications. Maven is mature rather than obsolete. Layered MVC is still valid. BCrypt is conservative compared with Argon2id, but is still functional when configured well. Angular is suitable for an interactive CRM; Astro is stronger for mostly static marketing/portfolio websites.

Agentic development changes the **workflow** more than it changes which runtime/database you should pick:

- Define explicit architecture and conventions in `AGENTS.md` / `docs/`.
- Keep small, testable task specifications and use reversible Git commits.
- Use machine-readable API contracts (OpenAPI).
- Consider OpenAPI Generator `typescript-angular` to generate typed Angular API models/services; ensure you can explain generated code at defense.
- Automate compilation, migrations and tests rather than trusting an agent's claim that code works.
- Use official current framework patterns (standalone Angular components, appropriate Signals, reactive forms) **only if compatible with the prescribed Educa versions**.
- Make both group members implement/understand vertical slices. Avoid splitting exclusively frontend vs backend.
- Preserve **unaltered prompts in `AI.md`**, per the assignment; this README is **not** a substitute for the required AI record.

## 7. PORT reuse: principles, not Astro starter

PORT is an Astro/TypeScript, JSON-configurable static website framework. The CRM is an authenticated, interactive Angular SPA with mutable PostgreSQL-backed business data. **Do not base the CRM repository on PORT's Astro starter or import its rendering engine.** Instead reuse useful principles:

| PORT idea | CRM application |
|---|---|
| Internationalization (ES/DE/EN) | Translate UI using keys; Spanish first; German and English later |
| Strict TypeScript | Strict TypeScript, typed DTOs / generated API types |
| Reusable components | Build Angular-native tables, forms, badges, filters, layouts |
| Theme tokens | Shared CSS colors, typography, spacing, radii |
| JSON configuration | Use for actual UI config or translation files, **not** as the main business DB |
| Entities/blocks | Borrow modular thinking, but model CRM domain explicitly |
| Zod validation | Optional for untrusted configuration; backend Bean Validation is mandatory |
| Astro and static generation | Keep in PORT, not CRM |
| Cloudflare Pages | May host static frontends; backend/database need suitable runtime |

### i18n strategy

- Suggested default UI language: **Spanish**, with German and English planned.
- Angular built-in i18n suits build-time translated apps. A runtime library such as **Transloco** is a possible choice when switching languages within the SPA without a full reload; check compatibility with class-mandated versions.
- Translate labels (e.g., `property.status.available`) while keeping database enum values language-neutral (`AVAILABLE`).
- Initially translate only a limited set of navigation, forms and error messages. Do not jeopardize core functionality for full localization.

Example translations:

```json
{
  "navigation": {
    "properties": "Inmuebles",
    "clients": "Clientes",
    "inquiries": "Consultas"
  },
  "property": {
    "status": { "available": "Disponible" }
  }
}
```

### Separate configuration, data and state

1. **Configuration:** design tokens, language options, optional column definitions.
2. **Business data:** properties, clients, inquiries from PostgreSQL through REST.
3. **UI state:** active filters, selected record, open dialogs in Angular.

Potential future synergy: a CRM publishes selected properties via API, and PORT generates an agency's public listing website. The CRM remains the source of truth; PORT focuses on presentation. **Do not implement this integration in the academic MVP.**

## 8. Suggested milestones

| Target | Deliverable |
|---|---|
| **Nov 5** | Entity model, PostgreSQL/Flyway, first two CRUD resources, DTOs, validation, errors, Swagger |
| **Nov 12** | Spring Security, BCrypt, roles, CORS; confirm all underlying API operations work |
| **Nov 19** | Angular login, routes/guards, property/client screens, loading/error states |
| **Nov 26** | Inquiries, basic dashboard, complete realistic workflow |
| **Dec 2** | Tests, clean-machine startup, README, unedited AI prompts in `AI.md`, final tag and submission |
| **Dec 3** | Live demo and individual defense |

Start with **one complete vertical slice** (Property database → JPA → service → controller → Angular list/form), then repeat. Do not build all backend features first without verifying the frontend integration. Reserve final days for reliability, documentation, and rehearsal.

## 9. Later commercial roadmap

- **Academic MVP:** one seeded organization, no tenant onboarding; useful internal CRM.
- **Commercial v0.1:** secure organization signup, organization-scoped queries and authorization, genuine tenant data isolation, onboarding, backups and audit logging.
- **Commercial v0.2:** property images, advanced search, property visits, richer contacts and history.
- **Commercial v0.3:** public catalog/PORT integration, lead collection, communication integrations.
- **Later:** subscription billing, agency administration, richer analytics/automation.

**Security warning:** `organizationId` in a table **does not** by itself enforce tenant isolation. Before allowing multiple real customers, ensure all data access—including indirect lookup via related IDs—is scoped to the authorized organization and thoroughly tested. Also address production secrets, observability, backups, deployment security, data retention and privacy.

## 10. Open decisions and questions

- [ ] Confirm whether the new real estate CRM topic has been accepted after the October 15 notification date.
- [ ] Get the exact required framework/database versions from Educa.
- [ ] Ask professor whether **Argon2id** is allowed in place of the explicitly specified BCrypt.
- [ ] Decide JWT or sessions based on class constraints and team comfort.
- [ ] Decide how much persistence abstraction is worth the extra code; avoid unnecessary double-mapping under a tight deadline.
- [ ] Choose a runtime i18n solution only after the mandatory stack is working.
- [ ] Decide whether user management is full CRUD or simply admin-created agents in the academic MVP.
- [ ] Define exact ownership policies for inquiries and shared clients.
- [ ] Define whether deletion is blocked, archived, or hard-delete for each resource.
- [ ] Confirm team responsibilities and practice cross-feature changes for defense.

### Draft question to professor (proposed, not sent)

> Buenas tardes, profesor. Tengo una consulta sobre las tecnologías del proyecto final. En el enunciado se especifica el uso de BCrypt para las contraseñas y Spring Data JPA o JdbcTemplate para la persistencia. ¿Se permite utilizar Argon2id en lugar de BCrypt, considerando que ambos están soportados por Spring Security? ¿Las tecnologías indicadas son obligatorias de forma estricta o se aceptan alternativas técnicamente equivalentes, siempre que se cumplan los requisitos funcionales y de seguridad? Muchas gracias.

### Proposed Spanish topic description (proposed, not submitted)

> **Sistema Web de Gestión Inmobiliaria.** Desarrollo de una aplicación web de gestión inmobiliaria basada en una arquitectura cliente-servidor desacoplada, que permita administrar inmuebles, clientes y consultas comerciales, con autenticación, control de acceso por roles y persistencia de datos en PostgreSQL. El sistema utilizará una API REST desarrollada con Spring Boot y un frontend SPA implementado en Angular. Contará con dos roles, administrador y agente inmobiliario, y estará orientado inicialmente a una única organización, con un modelo de datos preparado para futuras ampliaciones.

---

## 11. Provenance and interpretation

- **Assignment-derived:** section 2 and the mandatory stack/requirements, submission dates, grading, repo expectations and defense details are condensed from the user's four-page PDF, especially pages 1–4.
- **Design proposals:** entities/fields, role responsibilities, APIs, modules, JWT preference, organization abstraction, PORT link, architecture, schedule details and later roadmap originated in our discussion. They are **not** requirements imposed by the PDF.
- **No repository has been implemented** by this planning conversation. All examples are conceptual starter material.
- **This README captures the substance of the discussion** rather than every line of dialogue. In particular, the assignment's required `AI.md` must separately record actual agent usage and original unedited prompts.
