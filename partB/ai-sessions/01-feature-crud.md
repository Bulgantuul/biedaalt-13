# Session 1: Implementing CRUD

## Date: 2025-05-10

## Goal
Build basic task CRUD with Express and SQLite.

## AI assistance
- Provided model, controller, route structure
- Suggested using `db.run` with callbacks wrapped in Promises for async/await

## My modifications
- Added validation for required title field
- Changed status code for POST to 201 instead of 200

## Outcome
CRUD endpoints working and tested manually with curl.