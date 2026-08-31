# AI Prompts – Test Data

## Entry 1 — Register payload

- Prompt: Build a unique register JSON for POST /users/register. Password must pass complexity and not be a known leak.
- AI Response Summary: Nested address + first_name/last_name/dob/phone/email/password.
- Validation Notes: First password `Welcome01!` returned 422 leak message. Factory now uses `Qa#` + random alphanumerics + `9!`. UI also needs `house_number`.

## Entry 2 — Invoice body

- Prompt: Use the assessment COD invoice body. Parameterize cart_id only.
- AI Response Summary: billing_* fields, payment_method cash-on-delivery, payment_details {}.
- Validation Notes: Live POST /invoices returned 201 and invoice_number. Kept country TG as in the brief.

## Entry 3 — Demo vs unique users

- Prompt: When to use customer@practicesoftwaretesting.com vs a new user.
- AI Response Summary: Demo for login smoke; unique user for cart/invoice so seeded invoices do not pollute asserts.
- Validation Notes: Followed. Demo GET /invoices returned 161 rows; unique user starts empty.
