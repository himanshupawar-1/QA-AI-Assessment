# AI Prompts – Automation and Debugging

## Entry 1 — Prism page objects

- Prompt: Create Toolshop UI POMs and POManager using data-test locators. Do not write specs yet.
- AI Response Summary: home, login, register, product, checkout, account pages.
- Debugging Outcome: First register POM missed house_number; form stayed on /auth/register. Added locator after screenshot.

## Entry 2 — API helper

- Prompt: Point commonMethods at API_URL. Endpoints in authApi, cartApi, productApi, invoiceApi.
- AI Response Summary: GET/POST wrappers + curl logger.
- Debugging Outcome: Worked on first API run (8 passed). Later redacted Authorization in curl logs so JWTs are not stored in git.

## Entry 3 — Checkout proceed-3 disabled

- Prompt: TC-UI-07 timeout on proceed-3. Screenshot shows billing address.
- AI Response Summary: Click proceed-3 when visible.
- Debugging Outcome: Misleading — button is visible but **disabled** until house number is filled. Human filled `house_number` then waited for enabled.

## Entry 4 — Success assertion matched nav

- Prompt: After Confirm twice, assert invoice success.
- AI Response Summary: `getByText(/invoice/i)`.
- Debugging Outcome: Matched hidden “My invoices” dropdown. Replaced with exact “Payment was successful” and `INV-` on the invoices page.

## Entry 5 — Profile email not in body text

- Prompt: TC-UI-05 login then verify profile email.
- AI Response Summary: `expect(body).toContainText(email)`.
- Debugging Outcome: Email lives in an input value. Switched to `[data-test="email"]` toHaveValue.
