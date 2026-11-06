/**
 * Framework-neutral example of the state boundary used by the dashboard.
 * Replace the sample inputs with private, authenticated adapters in production.
 */
export type Severity = "SEV1" | "SEV2" | "SEV3" | "SEV4";

export type Incident = {
  incident_number: string;
  name: string;
  severity: Severity;
  status: string;
  mttm_minutes: number | null;
  retro_status: "Pending" | "Complete" | "Not due";
  jira_epic: string | null;
  age_days: number;
};

export type ActionItem = {
  key: string;
  summary: string;
  incident_number: string;
  parent_key: string | null;
  status: string;
  priority: string;
  assignee: string | null;
  age_days: number;
};

export type DashboardState = {
  generated_at: string;
  filters: { window: string; severity: string; team: string };
  summary: {
    incident_count: number;
    active_incident_count: number;
    mttm_minutes: number;
    open_action_count: number;
    unassigned_action_count: number;
    retro_overdue_count: number;
    incidents_without_follow_up: number;
  };
  mttm_by_severity: Array<{ severity: Severity; value: number; target: number }>;
  incidents: Incident[];
  actions: ActionItem[];
};

export function isOpenAction(item: ActionItem): boolean {
  return !["Done", "Released", "Merged", "Cancelled"].includes(item.status);
}

export function isOverdueRetro(incident: Incident): boolean {
  return incident.retro_status === "Pending";
}

export function buildExceptionSummary(state: DashboardState) {
  return {
    highSeverity: state.incidents.filter((row) => row.severity === "SEV1" || row.severity === "SEV2"),
    overdueRetros: state.incidents.filter(isOverdueRetro),
    unassignedActions: state.actions.filter((item) => isOpenAction(item) && !item.assignee),
    agedActions: state.actions.filter((item) => isOpenAction(item) && item.age_days >= 30),
  };
}
