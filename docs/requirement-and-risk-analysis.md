# Requirement and risk analysis — Practice Software Testing Toolshop

## System under test

- UI: https://practicesoftwaretesting.com/
- API: https://api.practicesoftwaretesting.com (docs: `/api/documentation`)
- Public ecommerce Toolshop: catalog, search, register/login, cart, checkout, invoices.

## Derived acceptance criteria

### AC1 — User registration and login

A customer can register with unique valid details, log in, and see profile/account identity.

Invalid transitions: wrong password, missing required register fields, reused email (API 422).

### AC2 — Purchase and invoice

A customer can browse/search, add multiple products, adjust quantity, check out with cash on delivery, and view the invoice.

**UI quirk (confirmed on SUT):** invoice generation requires **Confirm twice**.

API equivalent: register → login (bearer) → POST `/carts` → POST `/carts/{id}` with product/qty → POST `/invoices` with COD payload including `cart_id`.

## State machine (purchase)

| From | Event | To | Valid test | Invalid test |
|------|--------|-----|------------|--------------|
| Anonymous | view catalog | Browsing | TC-M-01 | — |
| Browsing | search | Filtered catalog | TC-M-02 | garbage query (exploratory) |
| Anonymous | login fail | Anonymous | TC-M-03 | — |
| Anonymous | register+login | Authenticated | TC-M-05 | weak/leaked password (API 422) |
| Authenticated | add line | Cart with items | TC-M-06 | out-of-stock / Thor limit (exploratory) |
| Cart with items | checkout COD + double confirm | Invoiced | TC-M-07 | invoices without token TC-M-08 |
| Empty cart | checkout | Blocked / no invoice | exploratory | — |

## Risks (testing priority)

1. **Double Confirm** — single click looks like success but no invoice; highest UI automation risk.
2. **Shared demo user** — `customer@practicesoftwaretesting.com` cart/invoice pollution; E2E uses unique registered users.
3. **Password leak validator** — common passwords fail register with 422.
4. **Short JWT TTL** (~300s) — API chains must login then complete cart/invoice in one test.
5. **Stock and product rules** — Long Nose Pliers out of stock; Thor Hammer quantity cap.
6. **Public SUT flakiness** — retries=1, workers=1.
7. **No secrets in AI prompts** — only public demo accounts.

## Scope

In: AC1, AC2, catalog/search, COD invoice, auth negatives, unauthorized invoices.

Out: payment gateways other than COD, admin reports, visual pixel diffs, performance SLAs (noted in exploratory only).
