# Automation opportunities

Identified during manual/API exploration; Core implemented the first group only (5–8 cases).

## Implemented (Core)

- Catalog + search smoke
- Login positive/negative
- Unique register
- Cart quantity
- COD invoice (UI double confirm + API POST)
- Unauthorized invoices

## Good next automations (not in Core on purpose)

- Contact form validation
- Favorite / wishlist
- Category and brand filters
- Pagination on catalog
- Credit-card vs BNPL payment payloads
- Admin invoice status transitions (ON_HOLD → COMPLETED) if admin token is in scope
- Visual snapshot of product cards

Keep Core small; depth of evidence beats extra scripts.
