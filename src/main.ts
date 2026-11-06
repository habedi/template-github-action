import * as core from '@actions/core';
import { formatGreeting } from './action';

/**
 * The primary execution function for the GitHub Action.
 */
export async function run(): Promise<void> {
  try {
    const name = core.getInput('name', { required: false }) || 'World';
    const greetingPrefix = core.getInput('greeting-prefix', { required: false }) || 'Hello';

    core.debug(`Received inputs: name="${name}", greetingPrefix="${greetingPrefix}"`);

    const result = formatGreeting({ name, greetingPrefix });

    core.info(result.greeting);
    core.setOutput('greeting', result.greeting);
    core.setOutput('timestamp', result.timestamp);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed(`Unexpected failure: ${String(error)}`);
    }
  }
}
