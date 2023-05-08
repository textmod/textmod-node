import { Sentiment, TextMod } from '../src';
import {describe, expect, test} from '@jest/globals';
const authToken = process.env.TEXTMOD_AUTH_TOKEN;

if (!authToken) {
  throw new Error('No TextMod auth token found in environment variables');
}

describe('TextMod moderate() method', () => {
  test('moderates text and returns a ModerationResult object', async () => {
    const textMod = new TextMod({ authToken });
    const text = 'This is some test text';
    const moderationResult = await textMod.moderate(text);
    expect(moderationResult).toBeTruthy();
    expect(typeof moderationResult).toBe('object');
    expect(Object.keys(moderationResult).length).toBeGreaterThan(0);
    expect(moderationResult.spam).toBeDefined();
    expect(typeof moderationResult.spam).toBe('boolean');
  });

  test('moderates text with custom filterSentiments and returns a filtered ModerationResult object', async () => {
    const text = 'This is some test text';
    const filterSentiments = ['spam', 'hate', 'self-promoting'] as Sentiment[];
    const textModWithFilter = new TextMod({ authToken, filterSentiments  });
    const moderationResult = await textModWithFilter.moderate(text);
    expect(moderationResult).toBeTruthy();
    expect(typeof moderationResult).toBe('object');
    expect(Object.keys(moderationResult).length).toBe(filterSentiments.length);
    expect(moderationResult.spam).toBeDefined();
    expect(typeof moderationResult.spam).toBe('boolean');
    expect(moderationResult.hate).toBeDefined();
    expect(typeof moderationResult.hate).toBe('boolean');
    expect(moderationResult.terrorism).toBeUndefined();
  });
});
