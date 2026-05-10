# Architecture

## Mermaid Diagram

```mermaid
graph TD
    Client[Browser / Frontend] -->|HTTP| API[Express Server]
    API -->|CRUD| DB[SQLite Database]
    API -->|JSON| Client
    subgraph Server
        Routes[Task Routes]
        Controller[Task Controller]
        Model[Task Model]
    end
    Routes --> Controller
    Controller --> Model
    Model --> DB