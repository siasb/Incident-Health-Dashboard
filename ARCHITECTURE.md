# Architecture

## Overview

The dashboard follows a three-stage pipeline:

```text
Source exports
    |
    v
Normalization and identity reconciliation
    |
    v
Canonical dashboard_state
    |
    v
Views, charts, tables, and drill-through links
```

The key design decision is to make `dashboard_state` the single source of truth for the UI. The Frame or web view renders structured state and does not independently recalculate incident priority, workflow state, or action-item counts.

## Source adapters

### FireHydrant incident adapter

Responsibilities:

- Normalize incident number, name, severity, status, and timestamps.
- Calculate incident age and mitigation or resolution duration.
- Identify whether a retrospective is complete.
- Preserve the original source URL for drill-through.

### Jira Epic adapter

Responsibilities:

- Normalize Jira Epic key, summary, status, and links.
- Map an Epic to the corresponding FireHydrant incident number.
- Keep the Jira key separate from the FireHydrant number.

### Jira action-item adapter

Responsibilities:

- Normalize issue key, summary, status, priority, assignee, and created date.
- Resolve the parent incident or Epic where available.
- Calculate action-item age and completion state.

## Canonical state

A production state object should contain at least:

```text
filters
summary
mttm_by_severity
retro_summary
action_summary
priority_incidents
retro_backlog
action_items
data_quality
```

The UI can then consume the state directly:

- Health summary uses `summary`.
- Attention summary uses `summary`, `data_quality`, and action counts.
- Incident work queue uses `priority_incidents`.
- Retrospective tracker uses `retro_backlog`.
- Action tracker uses `action_items`.
- Selected incident detail uses one incident from `priority_incidents` plus related retros and actions.

## Views

### Incident Response

Shows current incident load, severity filters, status, MTTM, and selected incident detail.

### Incident Retros

Shows completed and pending retrospectives, age, SLO target, and completion performance.

### Incident Action Items

Shows open and completed Jira work, with owner, priority, age, incident number, and Jira Epic key.

### Leadership View

Shows a concise exception list for weekly review: active high-severity incidents, overdue retros, aged actions, unassigned work, and incidents with no linked follow-up.

## Refresh pattern

For a static export, refresh by replacing the source files and regenerating `dashboard_state`. For a production service, put refresh and reconciliation behind a scheduled job or API endpoint, then have the UI request the latest canonical state.
