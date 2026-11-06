# Operating model

## Weekly review flow

The dashboard is designed for a short, exception-focused operational review.

### 1. Start with the health summary

Review incident count, MTTM, open actions, unassigned work, and missing follow-ups for the selected time window.

### 2. Review high-severity incidents

Prioritize SEV1 and SEV2 incidents that are active, recently mitigated, or above the MTTM target.

### 3. Review retrospective backlog

Look for mitigated or resolved incidents without a completed retrospective. Compare completion age with the severity SLO.

### 4. Review action items

Sort by priority and age. Pay special attention to items that are unassigned, blocked, or older than the expected completion threshold.

### 5. Close the loop

Confirm that every incident has a correctly mapped Jira Epic where expected, and that follow-up work is linked to the right incident and owner.

## Metric definitions

### MTTM

Mean Time to Mitigate is the elapsed time from incident start to mitigation. If mitigation is unavailable, a production implementation may fall back to resolution, but it should label that fallback clearly.

### Retro backlog

A retrospective is pending when an incident has been mitigated or resolved, the retrospective completion timestamp is missing, and the incident is not closed.

### Unassigned work

An action item is unassigned when it is open and has no assignee.

### Missing follow-up

An incident is missing follow-up when it is eligible for review and has no direct linked or child Jira action item after identity reconciliation.

### Aged action

An action item is aged when its open duration exceeds the threshold configured for its priority or workflow policy.
