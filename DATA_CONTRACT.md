# Data contract

This document describes the minimum fields needed to power the showcase and a production implementation.

## Incident record

| Field | Type | Description |
| --- | --- | --- |
| `incident_number` | string | FireHydrant incident identifier, such as `1747` |
| `name` | string | Human-readable incident title |
| `severity` | enum | `SEV1`, `SEV2`, `SEV3`, or `SEV4` |
| `status` | string | Current FireHydrant lifecycle status |
| `started_at` | timestamp | Incident start time |
| `mitigated_at` | timestamp | Time mitigation was recorded, if present |
| `resolved_at` | timestamp | Time resolution was recorded, if present |
| `postmortem_completed_at` | timestamp | Retrospective completion timestamp, if present |
| `source_url` | URL | FireHydrant drill-through URL |

## Jira Epic record

| Field | Type | Description |
| --- | --- | --- |
| `incident_number` | string | FireHydrant incident number used for mapping |
| `epic_key` | string | Jira key, such as `IR-521` |
| `summary` | string | Epic title |
| `status` | string | Jira status |
| `source_url` | URL | Jira drill-through URL |

## Jira action item record

| Field | Type | Description |
| --- | --- | --- |
| `key` | string | Jira issue key |
| `summary` | string | Work item title |
| `incident_number` | string | Related FireHydrant incident number |
| `parent_key` | string | Related Jira Epic key, if known |
| `status` | string | Jira status |
| `priority` | string | Jira priority |
| `assignee` | string or null | Current owner |
| `created_at` | timestamp | Work item creation time |
| `completed_at` | timestamp or null | Completion time, if resolved |
| `source_url` | URL | Jira drill-through URL |

## Identity and reconciliation rules

1. Never synthesize a Jira key from a FireHydrant incident number.
2. Display both identifiers when both are available.
3. Prefer explicit parent or issue links for action-item mapping.
4. If mapping is inferred from title or metadata, label it as inferred and surface it as a data-quality signal.
5. Keep unmatched records visible in a review queue instead of silently dropping them.

## Privacy requirements

Do not commit raw incident exports or Jira responses to a public repository. Use synthetic fixtures, redacted exports, or a private data service. Review URLs, names, summaries, and timestamps before publication.
