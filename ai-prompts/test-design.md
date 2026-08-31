# AI Prompts – Test Design

## Entry 1 — Manual CSV

- Prompt: Generate FunctionalTestCase.csv rows for AC1/AC2 only. Columns: ID, Title, Type, Priority, Suite, AC, Preconditions, Steps, Expected, Automation Mapping.
- AI Response Summary: Draft of 12+ cases including extras (favorites, contact).
- Validation Notes: Trimmed to 8. Added house-number and unauthorized invoices. Linked each row to TC-UI / TC-API ids.

## Entry 2 — UI scenarios

- Prompt: List 7 Playwright UI titles with @smoke/@regression for Toolshop. Include double Confirm.
- AI Response Summary: Catalog, search, invalid login, valid login, register, cart qty, COD invoice.
- Validation Notes: Kept. Register must fill `house_number`. Search asserts product names contain hammer.

## Entry 3 — API scenarios

- Prompt: List API cases for register, login ±, cart create, products, add item, invoice, unauthorized invoices.
- AI Response Summary: Eight cases matching AC1/AC2 API example payloads.
- Validation Notes: Verified POST `/carts/{id}` with `{product_id, quantity}` returns `item added or updated`. Invoice 201 with INV- prefix.
