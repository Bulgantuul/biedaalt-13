# ADR-001: Choose Stack

## Date
2025-05-10 (or today's date)

## Status
Accepted

## Context
We need a lightweight backend for a simple to-do list app with CRUD, filtering, search. No heavy load, single user.

## Decision
Use **Node.js + Express + SQLite**.

## Consequences
### Positive
- Rapid development
- No separate DB installation
- Easy testing

### Negative
- Not scalable for many users (not needed)
- SQLite not ideal for concurrent writes (acceptable here)

## Alternatives considered
- Python/Flask: similar but would require learning Flask specifics.