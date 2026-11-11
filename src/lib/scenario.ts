export type ScenarioPreset = "normal" | "warning";

let memoryScenario: ScenarioPreset = "normal";

export function getMemoryScenario(): ScenarioPreset {
  return memoryScenario;
}

export function setMemoryScenario(preset: ScenarioPreset): void {
  memoryScenario = preset;
}

/**
 * Lấy kịch bản hiện tại dựa trên môi trường:
 * 1. Trên browser (Client-side): Đọc cookie `ctt_scenario`.
 * 2. Trên server: Nhận qua tham số hoặc đọc memoryScenario.
 */
export function getActiveScenario(requestedPreset?: string | null): ScenarioPreset {
  if (requestedPreset === "normal" || requestedPreset === "warning") {
    return requestedPreset;
  }

  if (typeof document !== "undefined") {
    const match = document.cookie.match(/ctt_scenario=([^;]+)/);
    if (match && (match[1] === "normal" || match[1] === "warning")) {
      return match[1] as ScenarioPreset;
    }
  }

  return memoryScenario;
}
