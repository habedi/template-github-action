/**
 * Options passed to the action executor.
 */
export interface ActionOptions {
  name: string;
  greetingPrefix?: string;
}

/**
 * Result returned by the action executor.
 */
export interface ActionResult {
  greeting: string;
  timestamp: string;
}

/**
 * Generates a formatted greeting message and current timestamp.
 *
 * @param options - Configuration containing name and optional prefix.
 * @returns An object containing the formatted greeting and timestamp.
 */
export function formatGreeting(options: ActionOptions): ActionResult {
  const trimmedName = options.name.trim();

  if (!trimmedName) {
    throw new Error('Input "name" must not be empty.');
  }

  const prefix = (options.greetingPrefix ?? 'Hello').trim();
  const greeting = `${prefix}, ${trimmedName}!`;
  const timestamp = new Date().toISOString();

  return { greeting, timestamp };
}
