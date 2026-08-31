# AI Prompts – Requirements and Planning

## Entry 1 — Derive ACs and risks

- Prompt: Extract AC1/AC2 from the Toolshop QA brief. List UI vs API scope, smoke vs regression, and top risks. Do not write test cases yet.
- AI Response (short summary): AC1 register/login/profile; AC2 catalog-cart-COD-invoice; UI double Confirm; API bearer + cart_id invoice; risks: shared demo user, leaked passwords, JWT TTL.
- Validation Notes: Confirmed live: POST `/users/register` 201 with strong password; 422 on leaked password; GET `/carts` 405. Kept unique users for E2E.

## Entry 2 — State machine

- Prompt: Draw valid and invalid purchase transitions for Toolshop. Max one page.
- AI Response (short summary): Anonymous → browse/search → auth fail stays anonymous → register/login → cart → invoice; empty cart and no-token invoices are invalid.
- Validation Notes: Mapped into `docs/requirement-and-risk-analysis.md` and `docs/traceability-matrix.md`. Dropped admin status machine (not in Core ACs).

## Entry 3 — Cap case count

- Prompt: Cap manual, UI, and API at 5–8 cases including @smoke and @regression. Prefer depth on AC1/AC2.
- AI Response (short summary): 8 manual, 7 UI, 8 API covering catalog, search, login ±, register, cart, invoice, unauthorized invoices.
- Validation Notes: Accepted. Did not add contact form or other payments.
