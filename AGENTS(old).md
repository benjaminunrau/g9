# AGENTS.md

Guidance for AI agents working in this repository. Add project-specific rules here; the most specific applicable guidance takes precedence.

## Project Context

- Read the README and relevant nearby code before making changes.
- Follow the architecture and conventions already established in the project.
- Do not assume a framework, deployment model, or runtime that the project has not chosen.
- Keep project-specific decisions and commands documented here or in the README.
- Treat unresolved architectural choices as open questions. Do not silently turn assumptions into permanent conventions.

## Working Principles

- Identify the layer responsible for the behavior and make the smallest coherent change there.
- Prefer existing abstractions and patterns over introducing new ones.
- Keep dependencies flowing toward stable, lower-level modules; avoid coupling domain logic to frameworks, interfaces, or infrastructure unless the project requires it.
- Model concepts according to their meaning. Do not merge distinct concepts just to reduce repetition.
- Avoid speculative abstractions. Prefer a direct implementation for one use case; consider extracting a shared abstraction when repetition or complexity justifies it.
- Preserve unrelated work and existing user changes.

## Data and Boundaries

- Treat external input, persisted data, configuration, and user-provided content as untrusted.
- Validate data at system boundaries and report errors with enough context to identify the source and problem.
- Make required and optional data reflect real behavior; do not use placeholder values to conceal missing requirements.
- Use stable identifiers independent of display text, ordering, or array position.
- Keep serialized configuration declarative and free of executable behavior or secrets.
- Make breaking changes explicit. Provide a migration or reject incompatible data with a clear error.

## Internationalization

- Treat internationalization as a product and data concern, not merely a presentation detail.
- Define supported locales explicitly and make locale selection behavior clear.
- Do not silently substitute a different locale for missing required translations. Report or validate missing translations according to the project’s content workflow.
- Keep identifiers and translation keys independent of translated labels.
- Separate translated content from locale-specific facts, such as currency, availability, legal requirements, or regional settings.
- Format dates, numbers, currencies, and pluralized messages with locale-aware mechanisms rather than hard-coded strings.
- Test locale-sensitive behavior and required translations for every supported locale.
- Choose routing, storage, and locale-negotiation strategies to fit the application; do not assume one deployment or rendering model.

## Accessibility and User Experience

- Make accessibility part of implementation and review, including keyboard access, visible focus, meaningful labels, appropriate contrast, and text alternatives for meaningful images.
- Use semantic elements and native controls where appropriate; add ARIA only when needed.
- Respect reduced-motion preferences when using animation.
- Check responsive layouts and ensure content remains usable at narrow viewport sizes.

## Security and Privacy

- Validate and normalize input before using it.
- Allow only intended URL schemes and destinations; escape or sanitize content when rendering it.
- Use secure defaults for links, file handling, authentication, and permissions.
- Keep secrets and sensitive data out of source code, logs, client-visible output, and generated artifacts.
- Avoid collecting or retaining personal data that the application does not need.

## Testing and Quality

- Add or update tests for behavior that changes, including important failure cases.
- Prefer tests at the level where the behavior is observable; use focused unit tests for isolated logic and integration or end-to-end tests for cross-boundary behavior.
- Run the narrowest relevant check first, then the project’s required broader checks.
- Do not fix unrelated failures as part of a focused change. Report them separately.
- Update documentation when behavior, configuration, setup, or supported workflows change.

## Implementation Workflow

1. Locate the code that directly controls the requested behavior.
2. Read its nearby tests, callers, and local conventions.
3. State the expected behavior and a focused check that could disprove the proposed change.
4. Make a small, targeted change.
5. Run a focused validation immediately, then any required project checks.
6. Summarize what changed, what was verified, and anything that could not be checked.

## Project-Specific Details

Document the following when established:

- Purpose and supported use cases
- Architecture and important boundaries
- Runtime, framework, and deployment assumptions
- Setup, test, lint, type-check, and build commands
- Data sources and validation rules
- Localization workflow and supported locales
- Security, accessibility, and privacy constraints
- Known limitations and unresolved decisions