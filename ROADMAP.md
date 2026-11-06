# Roadmap

## Near term

- Replace synthetic fixtures with an authenticated API or scheduled export pipeline.
- Add automated schema validation for FireHydrant and Jira payloads.
- Add an explicit mapping table for incident number, Jira Epic, and child action items.
- Add snapshot tests for MTTM, retro eligibility, and action-item counts.

## Medium term

- Add historical trend storage so MTTM and retro compliance can be compared week over week.
- Add configurable severity SLOs and action-item aging policies.
- Add data-quality panels for unmatched, inferred, and stale relationships.
- Add a review note workflow so leadership decisions are captured beside exceptions.

## Production hardening

- Keep operational data private by default.
- Use role-based access for incident and employee information.
- Redact or tokenize personal data in exports.
- Monitor refresh failures and stale-data age.
- Keep source adapters versioned independently from the UI.
