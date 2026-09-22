const STATUS_CLASS = Object.freeze({
  VERIFIED: "verified",
  OBSERVED: "verified",
  OBSERVED_PARTIAL: "partial",
  LOCAL_ASSAY_PASS: "tested",
  INTERNAL_REPLAY_PASS: "tested",
  HISTORICAL_COMPLETED: "historical",
  SUPERSEDED_PACKAGING: "historical"
});

export function classifyTruthStatus(value) {
  const label = String(value ?? "").trim().toUpperCase();
  return STATUS_CLASS[label] || "unknown";
}
