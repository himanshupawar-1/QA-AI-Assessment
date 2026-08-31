# AI workflow (tool-workflow.md)

This is the working loop used in Cursor for this assessment.

## 1. Context packing (once)

- `.cursor/rules/prism-playwright.mdc` — folders, tags, double Confirm
- `.cursor/rules/responsible-ai.mdc` — no secrets, no fake-green tests
- `.cursor/skills/` — short prompts, prompt-history format, Toolshop API sequence
- SUT URLs and ACs in `docs/requirement-and-risk-analysis.md`

New chats do not paste the full participant guide again.

## 2. Prompt pattern (caveman)

One task per message:

1. Goal  
2. File or AC id  
3. Constraint (Prism path, `@smoke`, locator style)

Example: `Create authApi.js endpoints only. Follow API/pageobjects style. No specs.`

## 3. Iteration

| Round | What AI produced | Human check | Keep / change |
|-------|------------------|-------------|----------------|
| 1 | Register POM without house number | Screenshot: field required | Added `data-test="house_number"` |
| 2 | `proceed-3` click immediately | Button disabled until house number | Fill billing then wait enabled |
| 3 | `getByText(/invoice/i)` | Matched hidden nav “My invoices” | Exact “Payment was successful” + `INV-` |
| 4 | Password `Welcome01!` | API 422 leak list | Factory `Qa#` + random |
| 5 | Curl logger with raw JWT | Responsible AI | Redact Authorization |

## 4. Validation gates

- API: status + body fields (`access_token`, `cart_items`, `invoice_number`)
- UI: `data-test` locators; screenshot on fail
- Count: ≤8 cases per tier
- Suite runnable from `readme.md` (`npm test`)

## 5. Evidence

Prompt history: `ai-prompts/`  
Reports: `execution-reports/`  
Manual: `FunctionalTestCase.csv`
