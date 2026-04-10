# offline-first-demo
A minimal web application demonstrating offline-first architecture using PouchDB and CouchDB.

## What it does
- Edit text and text color directly in the browser
- Changes are saved locally in PouchDB regardless of internet connectivity
- Syncs automatically with CouchDB when connection is restored
- Conflict detection handled by PouchDB/CouchDB replication protocol

## Tech Stack
- Frontend: HTML, JavaScript
- Local database: PouchDB
- Server database: CouchDB

## Notes
This is a minimal MVP built to explore offline-first architecture. It is intentionally simple and does not reflect the complexity of a production offline-first system.
