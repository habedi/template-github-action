import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as core from '@actions/core';
import { formatGreeting } from '../src/action';
import { run } from '../src/main';

vi.mock('@actions/core', () => ({
  getInput: vi.fn(),
  setOutput: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
  setFailed: vi.fn()
}));

describe('formatGreeting', () => {
  it('formats a standard greeting with default prefix', () => {
    const result = formatGreeting({ name: 'GitHub Actions' });
    expect(result.greeting).toBe('Hello, GitHub Actions!');
    expect(result.timestamp).toBeDefined();
    expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
  });

  it('respects a custom greeting prefix', () => {
    const result = formatGreeting({ name: 'TypeScript', greetingPrefix: 'Welcome' });
    expect(result.greeting).toBe('Welcome, TypeScript!');
  });

  it('throws an error when name is empty or only whitespace', () => {
    expect(() => formatGreeting({ name: '' })).toThrow('Input "name" must not be empty.');
    expect(() => formatGreeting({ name: '   ' })).toThrow('Input "name" must not be empty.');
  });
});

describe('run', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('executes the action successfully with default values', async () => {
    vi.mocked(core.getInput).mockImplementation((name: string) => {
      if (name === 'name') return 'World';
      if (name === 'greeting-prefix') return 'Hello';
      return '';
    });

    await run();

    expect(core.info).toHaveBeenCalledWith('Hello, World!');
    expect(core.setOutput).toHaveBeenCalledWith('greeting', 'Hello, World!');
    expect(core.setOutput).toHaveBeenCalledWith('timestamp', expect.any(String));
    expect(core.setFailed).not.toHaveBeenCalled();
  });

  it('handles custom inputs properly', async () => {
    vi.mocked(core.getInput).mockImplementation((name: string) => {
      if (name === 'name') return 'Developer';
      if (name === 'greeting-prefix') return 'Hi';
      return '';
    });

    await run();

    expect(core.info).toHaveBeenCalledWith('Hi, Developer!');
    expect(core.setOutput).toHaveBeenCalledWith('greeting', 'Hi, Developer!');
    expect(core.setFailed).not.toHaveBeenCalled();
  });

  it('calls setFailed when an error occurs', async () => {
    vi.mocked(core.getInput).mockImplementation((name: string) => {
      if (name === 'name') return '   ';
      return '';
    });

    await run();

    expect(core.setFailed).toHaveBeenCalledWith('Input "name" must not be empty.');
  });
});
