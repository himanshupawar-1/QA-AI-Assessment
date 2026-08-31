# Toolshop QA AI practical assessment (Prism Playwright)

## Project information

Prism Playwright framework covering **UI + API** for [Practice Software Testing Toolshop](https://practicesoftwaretesting.com/). Core scope is AC1 (register/login/profile) and AC2 (catalog, cart, cash-on-delivery checkout, invoice). UI invoice generation requires **Confirm twice**.

## Framework

Playwright (JavaScript) in Prism layout:

- `UI/pageobjects` — locators and flows via `POManager`
- `API/pageobjects` + `API/utilities/apiHelper.js` — endpoints and HTTP helpers
- `tests/UI Test` and `tests/API Test`
- Reports: `execution-reports/html` and `execution-reports/junit/results.xml`

## Setup

1. Node.js 18+
2. `npm install`
3. `npx playwright install chromium`
4. Copy `.env.example` to `.env` (public demo URLs only)

Do not put personal secrets in `.env`. Demo customer `customer@practicesoftwaretesting.com` / `welcome01` is published on the SUT.

## Commands

```bash
npm test                 # full suite (smoke + regression)
npm run test:smoke       # @smoke
npm run test:regression  # @regression
npm run test:ui          # UI specs
npm run test:api         # API specs
npm run report           # open HTML report
```

Windows PowerShell: if a folder path with spaces fails, use `npx playwright test --grep TC-UI` or `TC-API`.

## Test data

| Source | Location |
|--------|----------|
| Manual cases | `FunctionalTestCase.csv` |
| UI static data | `UI/resources/data/toolshopData.json` |
| Unique register payloads | `API/utilities/testDataFactory.js` (Faker; passwords avoid leak lists) |
| Invoice payload | `API/pageobjects/invoiceApi.js` |

## Reports

After `npm test`:

- HTML: `execution-reports/html/index.html`
- JUnit: `execution-reports/junit/results.xml`
- Status snapshot: `execution-reports/test-status.md`
- Playwright traces/screenshots on failure: `test-results/`

## Documentation

- `project-info.md` — Part A AI workflow
- `tool-workflow.md` — prompt/context/validation loop
- `docs/` — risks, traceability, exploratory, defects, automation opportunities
- `ai-prompts/` — prompt history

## Submission

Public GitHub: https://github.com/himanshupawar-1/QA-AI-Assessment

History is split across multiple commits (docs → prompts → framework → tests → reports → review cleanup). Do not squash before evaluation.

