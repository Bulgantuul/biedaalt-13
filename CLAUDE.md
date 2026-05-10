# CLAUDE.md – To-do List App (bie-daalt-13)

## Build & Run
- Install: `npm install`
- Run dev: `npm run dev` (nodemon)
- Start: `node server.js`
- Tests: `npm test`

## Conventions
- Use **Conventional Commits**: feat, fix, docs, test, refactor, chore
- REST API endpoints: `/api/tasks`
- Database: SQLite (file `database.sqlite`)
- Error handling: try-catch with appropriate HTTP status codes

## No-go zones
- No hardcoded secrets
- Do not commit `database.sqlite` (add to .gitignore)
- Do not skip input validation

## Project structure
See README.md