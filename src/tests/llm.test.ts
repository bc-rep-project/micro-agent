// src/tests/llm.test.ts

import { generateCode } from '../helpers/llm';
import { MODELS } from '../helpers/config';
import * as genai from 'google-generativeai'; // Import for mocking

vi.mock('google-generativeai'); // Mock the Gemini API library

describe('LLM Integration Tests', () => {
  it('should generate code using OpenAI model', async () => {
    const result = await generateCode('Generate a function', MODELS.OPENAI);
    expect(result).toBeDefined();
  });

  it('should generate code using Gemini model for text tasks', async () => {
    (genai as any).GenerativeModel.mockImplementation(() => ({
      generate_content: vi.fn().mockResolvedValue({
        candidates: [{ content: { parts: [{ text: 'Generated Gemini code' }] } }],
      }),
    }));

    const result = await generateCode('Generate a function', MODELS.GEMINI);
    expect(result).toBe('Generated Gemini code');
  });

  it('should generate code using Gemini model for visual tasks', async () => {
    (genai as any).GenerativeModel.mockImplementation(() => ({
      generate_content: vi.fn().mockResolvedValue({
        candidates: [{ content: { parts: [{ text: 'Generated Gemini diagram' }] } }],
      }),
    }));

    const result = await generateCode('Generate a diagram', MODELS.GEMINI, 'visual');
    expect(result).toBe('Generated Gemini diagram');
  });
});