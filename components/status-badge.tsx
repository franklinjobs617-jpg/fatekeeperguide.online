import type { ContentStatus } from "@/lib/guides";

const statusClass: Record<ContentStatus, string> = {
  "Official Info": "status-official",
  "Pre-release Analysis": "status-analysis",
  "Needs Post-Launch Testing": "status-testing",
  "Community Verified": "status-verified"
};

export function StatusBadge({ status }: { status: ContentStatus }) {
  return <span className={`status-pill ${statusClass[status]}`}>{status}</span>;
}
