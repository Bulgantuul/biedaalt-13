# Session 3: Writing tests

## Date: 2025-05-12

## Goal
Write ≥10 unit tests with Jest and Supertest.

## AI assistance
- Generated initial test suite skeleton
- Suggested using `beforeAll` to seed database

## Issues
AI's first test didn't handle async database properly; I added `done` callbacks and `afterAll` cleanup.

## Outcome
All 13 tests passing.