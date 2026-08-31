# Traceability — requirements to tests

| Requirement | Manual | UI | API | Suite |
|-------------|--------|----|-----|-------|
| Catalog list | TC-M-01 | TC-UI-01 | TC-API-05 | Smoke |
| Search | TC-M-02 | TC-UI-02 | TC-API-05 | Smoke |
| Invalid login | TC-M-03 | TC-UI-03 | TC-API-03 | Regression |
| Valid login / token | TC-M-04 | TC-UI-04 | TC-API-02 | Smoke |
| Register | TC-M-05 | TC-UI-05 | TC-API-01 | Regression |
| Cart + quantity | TC-M-06 | TC-UI-06 | TC-API-06 | Smoke / Regression |
| COD invoice (UI double confirm) | TC-M-07 | TC-UI-07 | TC-API-07 | Regression |
| Invoices unauthorized | TC-M-08 | — | TC-API-08 | Regression |
| Create cart | AC1 API | — | TC-API-04 | Smoke |

Counts stay within 5–8 cases per tier (8 manual, 7 UI, 8 API).
