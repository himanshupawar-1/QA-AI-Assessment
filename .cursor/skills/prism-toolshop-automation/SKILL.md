---
name: prism-toolshop-automation
description: Implement Toolshop Playwright tests using Prism page objects, API helpers, and smoke/regression tags. Use when adding or fixing UI/API automation for practicesoftwaretesting.com.
---

# Prism Toolshop automation

## UI

- Pages via `POManager`.
- Base URL from `BASE_URL`.
- Invoice: click Confirm **twice**.

## API

- `commonMethods` in `API/utilities/apiHelper.js`.
- Endpoints in `API/pageobjects`.
- Unique register payload from `testDataFactory.js` (password must not be a known leaked string).
- Invoice POST body uses `cash-on-delivery` and `cart_id`.

## Limits

At most 5–8 tests per tier (manual CSV, UI specs, API specs), tagged `@smoke` / `@regression`.
