const SUBTASK_PREFIX_REGEX = /^(subtarefa|subtask|apoio|detalhe|observacao|obs|nota)\s*:/i;
const SUBTASK_BULLET_REGEX = /^[-*\u2022]\s+/;

export function normalizeTaskText(task = '') {
  return String(task).replace(/\s+/g, ' ').trim();
}

export function isSubtask(task = '') {
  const normalizedTask = normalizeTaskText(task);
  if (!normalizedTask) return false;

  return SUBTASK_PREFIX_REGEX.test(normalizedTask) || SUBTASK_BULLET_REGEX.test(normalizedTask);
}

export function isMainContent(task = '') {
  const normalizedTask = normalizeTaskText(task);
  return Boolean(normalizedTask) && !isSubtask(normalizedTask);
}

export function filterMainTasks(tasks = []) {
  return tasks
    .map((task) => normalizeTaskText(task))
    .filter((task) => isMainContent(task));
}
