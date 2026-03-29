## Core Schema Foundation

This lane adds the first real app backbone and stops intentionally at four models:

- `AppUser`: application-owned user record that can later map to Clerk identity without coupling this lane to Clerk
- `Pet`: the core product object owned by an app user
- `Subscription`: lightweight entitlement mirror owned by an app user for future Stripe sync
- `PetLog`: the first generic timeline/event backbone owned by a pet

Why only these four:

- iPetzo is record-first, so pets and pet logs need to exist before auth flows, app shell work, AI, and collaboration features
- subscriptions are included now because entitlement state belongs next to the user backbone even before Stripe wiring
- everything else is intentionally deferred to later lanes

Explicitly deferred:

- Clerk implementation and auth-protected routes
- pet creation UI and dashboard/app shell work
- caregiver, village, and community tables
- AI, chat, veterinary, medication schedule, and uploads/storage tables
