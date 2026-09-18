const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

const apiBaseUrl = configuredApiUrl?.replace(/\/$/, "");

function sendToBackend(path, method, body) {
  if (!apiBaseUrl) return;

  void fetch(`${apiBaseUrl}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => {
    // The local experience remains usable when the optional backend is offline.
  });
}

export function syncQuizResult(result) {
  sendToBackend("/quiz-results", "POST", result);
}

export function syncLearningProgress(completedLessons) {
  sendToBackend("/learning-progress", "PUT", { completedLessons });
}

export function syncChecklistProgress(completedItems) {
  sendToBackend("/checklist-progress", "PUT", { completedItems });
}

export function syncMarketingPlan(plan) {
  sendToBackend("/marketing-plans", "POST", plan);
}
