# Session 2: Adding filters and search

## Date: 2025-05-11

## Goal
Add priority filter and title search to GET /api/tasks.

## AI assistance
- Showed how to build dynamic SQL WHERE clauses
- Proposed using LIKE for search

## Hallucination
AI suggested using `req.query.priority` directly in SQL without validation. I added a whitelist check for priority values (low, medium, high).

## Outcome
Filtering and search implemented with proper validation.