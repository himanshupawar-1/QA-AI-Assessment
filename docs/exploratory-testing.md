# Exploratory testing notes

Date: 2026-08-31  
SUT: https://practicesoftwaretesting.com/ and API.

## Charters

1. **Auth edges** — weak password, duplicate email, SQL-ish email. API leaked-password 422 confirmed; UI shows field validation for empty required fields.
2. **Cart rules** — Thor Hammer “one per customer”; out-of-stock Long Nose Pliers. Automation uses first in-stock catalog items instead.
3. **Checkout confirm** — one Confirm does not reliably create My Invoices row; second Confirm does. Logged as product quirk, not a failed test.
4. **Demo user invoices** — GET `/invoices` as Jane Doe returns a large seeded history; unique users start empty then one invoice after checkout.
5. **GET `/carts`** — 405 Method not allowed; create is POST `/carts`, read is GET `/carts/{id}`.

## Bugs / observations

See `docs/defect-report.md`. None blocked Core automation after using unique users and double Confirm.
