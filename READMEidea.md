# Real Estate Software: Pre-Planning Notes

Status: exploratory planning. The working direction below reflects the current idea, but does not change PORT's schemas, application, or scope. Treat it as a plan to validate, not an implementation decision.

## Why This Folder Exists

PORT currently builds static, multilingual, content-driven showcase sites. Its current portfolio implementation is not a property platform: it has no user accounts, database, listing search, lead inbox, booking workflow, or runtime content editing. The repository guidance says to add a site type when a real project needs it and not to build speculative abstractions.

These notes clarify a possible product and the boundary between it and PORT. The current idea is a reusable real-estate software starter from which I can create a separately branded instance for each agency. PORT could supply the repeatable public-facing site and other UI that works well as a static frontend. Each agency instance may also need its own data and operational services; those are not supplied by PORT today.

## Working Direction: An Agency-Per-Instance Starter

The likely product is a starter/template for building and operating a real-estate agency's online presence, with the option to grow into agency-specific software. “Several instances” currently means separate deployments configured for separate agencies, rather than one hosted multi-tenant service where agencies share an application and database. That distinction should be revisited only if operating many copies becomes a real burden or agencies need shared infrastructure.

An initial instance could give an agency a coherent public site: its own identity, agents, listing inventory, property search and detail pages, and contact routes. The source and deployment are agency-specific, so one agency's content, credentials, and configuration do not accidentally appear in another's instance. A starter is copied and customized; fixes do not flow to existing copies automatically, consistent with PORT's current starter model.

PORT is a candidate source for the static frontend layer, not necessarily the whole product. Good candidates include page layouts and components for a listing index, filter controls, listing cards, property detail, image galleries, agent profiles, agency information, contact actions, responsive layouts, accessibility, metadata, and localization. Static output can also include a small prebuilt listing dataset and browser-side filtering when the inventory is modest and public. These are candidate capabilities: PORT should only gain a real-estate starter or site type when a concrete agency project justifies it.

The agency-specific system may need a separate way to create, verify, update, and publish listings. For a small or infrequently changing inventory, editing validated content and rebuilding/redeploying the static site could be enough. Frequent updates, staff logins, approvals, lead inboxes, or private records imply a backend or a hosted service and a clear security boundary. A static frontend can consume that service, but it cannot itself provide authentication, persistence, permissions, or reliable lead handling.

### Candidate delivery slices

1. **Public starter site:** agency branding, available listings, search/filter experience, property detail pages, agent/contact information, and responsive accessible presentation. Decide whether the first inventory is maintained as content and published at build time.
2. **Agency publishing workflow:** only if content editing is too cumbersome; define who edits and verifies facts, how media is managed, and how updates reach the public site. This could initially be an external CMS or a small separate admin tool rather than part of PORT.
3. **Operational features:** authenticated accounts, lead management, audit history, integrations, or property operations only when a specific agency workflow validates the need. These are separate product capabilities, not automatic extensions of the public starter.

This is a provisional order for investigation, not a commitment to build all three slices. The first useful instance should test whether agencies value the public site and whether maintaining its inventory is manageable.

## First Scope Decision

Choose the smallest product that solves a real user's problem. These are distinct options, not a feature ladder PORT should automatically climb:

| Product shape | Main user | Core job | Likely fit with PORT |
| --- | --- | --- | --- |
| Agency or agent showcase | Prospective buyer or renter | Browse a curated set of properties and contact the agent | Closest fit: static content, public pages, external contact action |
| Listing portal | Buyer, renter, seller, agent | Search/filter a changing inventory and submit/manage inquiries | Requires a data source and likely a backend or hosted service |
| Brokerage CRM | Agents and office staff | Manage leads, clients, follow-ups, appointments, and transactions | Separate authenticated application; outside current PORT scope |
| Property operations | Owners, managers, tenants, vendors | Manage units, leases, maintenance, payments, and compliance | Separate product and domain; not a listing-site extension |

Do not treat “real-estate software” as a single bounded context. A listing is not a property-management record, and a public inquiry is not a CRM lead until a workflow explicitly connects them. Likewise, independent agency deployments are not the same architecture as a shared multi-tenant service.

### PORT boundary to explore

PORT's current model copies a complete starter into a standalone site. If a real-estate project proceeds, a plausible split is:

- **PORT starter / static site:** public pages, validated public content, rendering, static search where appropriate, contact links, accessibility, localization, and deployment-ready output.
- **Agency instance configuration:** branding, locales, contact destinations, domain, theme, and the agency's own public inventory. These belong in each copied instance, not in PORT's generic starter as real customer data.
- **Optional operational service:** private inventory editing, accounts and roles, review/publish workflow, image uploads, inquiry processing, audit trail, and integrations. This needs its own persistence, security, hosting, and data-retention decisions.

The frontend could be entirely static for an agency whose inventory is maintained during development and whose inquiries go to existing channels. If listings change often, the public frontend could still be statically rendered on a rebuild trigger, or it could fetch public data from an API. Choose between these only after learning the expected update cadence, scale, and operational workflow. Avoid committing the starter to a backend or a tenant model prematurely.

## People and Jobs To Validate

Potential public audiences:

- Buyers comparing properties, locations, and total costs.
- Renters comparing availability, terms, and commute or neighborhood fit.
- Sellers or landlords evaluating an agent or requesting a valuation.
- People looking for commercial, land, or short-term property, if those markets are in scope.

Potential publishing and operations users:

- Agents who create and update listing information and respond to inquiries.
- Listing coordinators who verify facts, media, and publication status.
- Office administrators who manage agents, offices, and access.
- Owners or property managers, only if operations beyond marketing are explicitly in scope.

For each intended user, establish the current workaround, how often the job occurs, what information is missing or duplicated, and what outcome would make a first release useful.

## Candidate Core Workflows

For a public showcase, validate this journey first:

1. Visitor lands on a localized listing or search page.
2. Visitor narrows results by relevant criteria and can understand when there are no matches.
3. Visitor opens a property detail page and evaluates its facts, location, media, costs, and availability.
4. Visitor contacts the responsible agent through a clear, consent-aware channel.
5. Agent receives enough context to identify the listing and respond using their existing process.

For an inventory tool, separately map the publisher journey:

1. Create a draft listing and enter required, verified facts.
2. Add media and disclose its source, permitted use, and accessibility text.
3. Review the listing, publish it, and record who approved it.
4. Change availability, price, or other facts without losing history or leaving stale public copies.
5. Withdraw, archive, or expire it and ensure search results and cached pages no longer present it as active.

Lead management, appointments, offers, contracts, payments, leases, and maintenance are separate workflows. Include any only after a named user and a validated need are established.

## Candidate Domain Vocabulary

Use precise concepts and confirm definitions with people who do this work. These are discovery candidates, not a proposed schema.

- **Property**: the physical or legal real-estate asset; it can exist independently of any one marketing campaign.
- **Listing**: a time-bounded offer or representation of a property for a specific purpose, market, and responsible party. A property may have multiple listings over time; whether simultaneous listings are allowed needs local validation.
- **Listing status**: publication and market state. Keep internal review state separate from public availability where workflows require both.
- **Address / location**: structured location facts and a disclosure policy for what is shown publicly. Exact coordinates may be sensitive.
- **Price**: amount, currency, and context (sale, rent period, fees, or price on request). Do not use a formatted string as the only stored value if comparison is needed.
- **Area / measurement**: numeric quantity plus unit and meaning (for example, built area versus lot area); local conventions may differ.
- **Media asset**: image, video, floor plan, or document, with caption/alt text, ordering, ownership/usage rights, and publication state as applicable.
- **Agent / agency**: accountable contact and organizational identity. Public contact details need not equal internal account identity.
- **Inquiry**: a visitor's request about a listing, with consent and retention rules. It is not necessarily a customer or a qualified lead.
- **Feature / amenity**: a controlled, market-specific attribute with clear definitions rather than arbitrary tags where filtering depends on it.

Do not flatten Property, Listing, Inquiry, Lead, Appointment, Offer, Lease, and Unit into one generic “item.” Similar-looking cards do not make these the same entity.

## Listing Information To Explore

Possible groups of fields; mark each as required, optional, conditional, internal-only, or not collected after discovery:

- Identity and publication: stable ID, public slug, listing purpose, property type, publication state, publish/expiry dates.
- Description: localized title and copy, verified highlights, accessibility of the wording, source and last-verified date for factual claims.
- Location: country, region, city, neighborhood, address, coordinates, and per-field public disclosure rules.
- Price and terms: amount, ISO currency, sale or rental period, recurring charges, deposit, taxes, fees, and “price on request” policy.
- Physical facts: bedrooms, bathrooms, parking, floor, condition, construction year, and typed areas with units and definitions.
- Media: ordered photos, captions and alt text, floor plans, video links, rights/consent, and removal workflow.
- Contact: responsible agent or agency, public channels, inquiry route, and any response-time promise that can actually be met.
- Search: which fields are filterable, sortable, indexed, and visible in result summaries.

Avoid collecting personal data about owners, tenants, or occupants unless a necessary workflow, legal basis, access controls, retention period, and deletion path are defined.

## Important Rules And Risks

- **Accuracy and freshness:** prices, availability, areas, and features can become stale. Decide who verifies each fact and how the product signals its last verification.
- **Location privacy:** exact addresses and coordinates may expose occupants or vacant properties. Define public precision independently from internal precision.
- **Fair housing and discrimination:** advertising, filters, ranking, and generated descriptions must be reviewed against the laws and policies of each target market. Do not infer or filter on protected characteristics.
- **Local legal variation:** disclosure duties, licensing, rental terms, fees, taxes, measurement standards, and record retention depend on jurisdiction. No jurisdiction-specific rules are assumed here.
- **Media rights and consent:** establish that uploaded photos and documents may be published, how attribution works, and how takedown requests are handled.
- **Personal data:** inquiries can contain sensitive details. Minimize collection, restrict access, secure transport/storage, define retention and deletion, and avoid exposing messages in public output or logs.
- **Auditability:** if users can edit records, consider who changed price, status, or disclosure and when. A static content build alone does not provide operational audit history.
- **Accessibility and localization:** use meaningful alt text, keyboard-operable media controls, accessible maps or a non-map alternative, explicit units/currency, and complete translations for supported locales.
- **Search quality:** define stable filter semantics, empty states, sorting, pagination, and canonical URLs. Avoid implying that a map is the only way to understand location.

## Product Questions To Resolve

Keep these OPEN until interviews or a concrete project answer them:

1. Is the first deliverable a public showcase, a searchable portal, an internal tool, or a combination with explicit boundaries?
2. Which country, city, and property market are in scope? What local language, currency, units, and legal review are required?
3. Is the inventory curated and mostly static, or does it change frequently and need immediate updates?
4. Who owns listing creation, factual verification, approval, publishing, and expiry?
5. Are users anonymous visitors, named customers, agents, staff, or all of these? Which roles can see or change each field?
6. What is the lead/contact destination: existing email or messaging, a third-party CRM, or an in-product inbox?
7. Are exact addresses public? How are location, owner/tenant details, and media rights handled?
8. Which search criteria are essential to the target users, and how will each criterion be defined consistently?
9. Are external integrations, map tiles, analytics, or syndication platforms required, and what are their privacy, cost, and availability constraints?
10. Is the product intended to manage rentals, sales transactions, leases, payments, maintenance, or none of those?
11. What are the hosting, availability, backup, data residency, and recovery expectations?
12. What is explicitly out of scope for the first useful release?

## Fit With PORT

Likely reusable in a static showcase: validated serializable content, schema-first validation, strict IDs and references, localization, accessible static rendering, optimized media, metadata, themes, and external contact actions.

Not provided by the current toolkit: authentication/authorization, database persistence, dynamic inventory, full-text or geospatial search, form processing, spam protection, lead handling, audit logs, scheduled expiration, uploads, or integrations. These require explicit product and architecture decisions; they should not be implied by adding listing fields to the portfolio schema.

If the validated need is a curated agency showcase, a standalone site copied from a suitable starter is likely the smallest coherent first instance. If the need includes operational inventory or user workflows, define a separate application boundary and data/security model, while keeping the public UI as a possible static frontend. Do not change the root portfolio into a property product by default, and do not extract shared abstractions from one hypothetical example.

## Suggested Discovery Sequence

1. Identify one agency and one user-facing problem it wants to solve; gather representative, permission-cleared listings and branding needs.
2. Confirm that separate agency deployments are acceptable, and list the information and settings that must be isolated per instance.
3. Observe how often inventory changes and who currently edits, verifies, and publishes it. This determines whether build-time content is viable.
4. Sketch the public visitor journey and the agency publishing workflow separately. Include an expired listing, changed price, hidden address, missing translation, and media takedown.
5. Establish the smallest static public-site slice and test it with realistic content before adding schemas or production code.
6. If static content is insufficient, define the minimum publishing service and its data/security boundary independently of PORT's static renderer.
7. Validate jurisdiction-specific legal, privacy, fair-housing, accessibility, and media-rights requirements with qualified sources.
8. Record settled architecture or scope decisions as ADRs when an actual project is ready to implement.

## Planning Artifacts

This document is the initial discovery brief and captures a working product direction. Add separate user research, workflows, market rules, or architecture notes when real evidence makes them useful. Keep decisions clearly marked as **DECIDED** or **OPEN**, and do not treat this folder as authorization to implement a real-estate site type.
