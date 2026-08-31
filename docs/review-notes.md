# Review notes (post-implementation)

Checked against the QA AI rubric: prompt quality, context, validation, iteration, responsible AI, documentation.

## Kept after review

- Unique users instead of the shared demo account (423 lock / UI invalid login).
- `data-test` locators; house number on register and billing.
- Double Confirm with Thanks / INV- asserts, not a weakened “any invoice text” matcher.
- Authorization redacted in curl logs; register payload not committed.

## Removed after review

- Template API `loginPage.js` with encrypted email/password blobs.
- Unused Prism pages (`district`, `settings`, `bingeList`) that were not Toolshop.

## Residual risk

Public SUT can still flake (stock, rate limits). `retries: 1` and unique data keep the Core suite green without dropping assertions.
