Primary AI Tool(s) Used: Cursor (Auto / Composer for docs; coding model for Prism page objects and failing-test debug)
Application Under Test: Practice Software Testing Toolshop – checkout and invoice flow
Assessment Start Date: 2026-08-28 / Submission Date: 2026-08-31

## Project Summary

This submission tests Toolshop end-to-end for a **new customer**: register, login, browse/search, multi-item cart with quantity, cash-on-delivery checkout, and invoice (UI **Confirm twice**; API `POST /invoices` with `cart_id`). Coverage is capped at 5–8 cases per tier (manual, UI, API) and tagged Smoke vs Regression.

## Tools Used

- Browsers: Chromium via Playwright
- Automation: Playwright JS on Prism folders (`UI/`, `API/`, `tests/`)
- API: Playwright `request` through `commonMethods`
- AI: Cursor (rules + skills in `.cursor/`)
- Supporting: `@faker-js/faker`, dotenv, HTML + JUnit reporters

## Setup Summary

1. **Project and SUT context**  
   Always-on Cursor rule describes Prism folders, `data-test` locators, double Confirm, and public URLs. Skills encode caveman prompting and the Toolshop API sequence. `.env.example` and `docs/requirement-and-risk-analysis.md` are attached context, not a paste of the whole brief every turn.

2. **Requirement analysis**  
   The ACs were split into a state machine (anonymous → authenticated → cart → invoiced) with invalid transitions. Live API probes (register 422 on leaked passwords, GET `/carts` 405) corrected the first AI draft.

3. **Test planning and strategy**  
   UI vs API: UI owns search, billing house-number, and double Confirm; API owns token, cart lines, invoice payload, and unauthorized invoices. Smoke = catalog, login, cart create, product list. Regression = negatives, unique register, invoice.

4. **Manual test case design**  
   CSV rows were generated per AC then trimmed to eight. Edge/negative: wrong password, leaked password, missing house number, invoices without token. Non-functional (perf) stayed exploratory only.

5. **Automation design**  
   Kept Prism: `POManager`, API pageobjects, `apiHelper`, factory for unique users so the shared demo cart is not polluted.

6. **Validate and refine AI output**  
   First register POM omitted `house_number`; checkout `proceed-3` stayed disabled; success assertion matched hidden “My invoices”. Each was checked on a screenshot/API status and then patched. Assertions were not weakened to force green.

7. **Test data generation**  
   Faker emails + `Qa#…9!` passwords after 422 leak check. Invoice body follows the brief (COD, `payment_details: {}`). Demo user only for login smoke.

8. **Debugging failing tests**  
   Failures went to Playwright screenshots (`House number is required`, billing step, Payment was successful). Curl logger writes to `API/testdata/api_requests.log` with **Authorization redacted**.

9. **What not to share with AI**  
   Personal emails, work VPN URLs, production tokens, full JWT values, customer PII dumps. Public demo credentials are already on the SUT.

10. **Reuse on a real project**  
    Same loop: AC + state machine → 5–8 cases → Prism POMs → smoke/regression tags → prompt history in `ai-prompts/` → execution report. Swap SUT rule and factory; keep caveman + summarize-chat skills.
