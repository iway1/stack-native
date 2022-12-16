const logged = new Set<string>();
export function logUsageWarning(
  componentOrHookName: string,
  error: string,
  key: string
) {
  if (logged.has(key)) return;
  console.warn(`${componentOrHookName} usage error: ${error}`);
}
