# Execution evidence

Latest HTML report: `execution-reports/html/index.html`  
JUnit: `execution-reports/junit/results.xml`

## How to regenerate

```bash
npm test
npm run report
```

## Notes from last green-path run

- UI TC-UI-01 … TC-UI-07 passed after house_number, Confirm twice, and `Thanks for your order` / `INV-` asserts.
- API TC-API-01, 04–08 passed on unique users.
- Demo user login can return **423 Locked** if overused; tests no longer depend on it.
- Screenshots on failure remain under `test-results/` (not committed).

Copy the HTML report into git after a full `npm test` so evaluators can open it without re-running.
