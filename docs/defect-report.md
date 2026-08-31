# Defect report / RCA

## OBS-01 — Invoice UI requires two Confirm clicks

- **Severity:** Medium (workflow trap, not a crash)
- **Area:** Checkout payment step
- **Symptom:** First Confirm shows “Payment was successful”; second Confirm shows “Thanks for your order! Your invoice number is INV-…”.
- **RCA:** Two-stage payment submit. Automation clicks Confirm twice; API POST `/invoices` is a single call.
- **Status:** Documented; TC-M-07 / TC-UI-07. Not logged as a product bug because the exercise specifies the double click.

## OBS-02 — Register rejects passwords found in leak databases

- **Severity:** Low (good control)
- **Area:** POST `/users/register`
- **Symptom:** 422 leaked-password message.
- **RCA:** Breach list check. Factory uses `Qa#` + random alphanumerics + `9!`.
- **Status:** Working as designed.

## OBS-03 — Shared demo user lock (423) and UI login failure

- **Severity:** Medium for automation stability
- **Area:** POST `/users/login` and UI login
- **Symptom:** Demo customer login returned **423 Locked** after many suite attempts; UI showed “Invalid email or password.”
- **RCA:** Public fixture is rate-limited. Unique registered users are stable.
- **Fix:** Login tests register first. Demo account is documented only.

## OBS-04 — GET `/carts` without id returns 405

- **Area:** Cart API
- **RCA:** Collection GET is not allowed; POST create then GET by id.
- **Status:** Informational; TC-API-04/06 follow allowed transitions.
