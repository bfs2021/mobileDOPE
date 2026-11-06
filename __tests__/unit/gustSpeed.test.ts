import { gustSpeedError } from '../../src/utils/calculatorInputs';

/**
 * The calculator's optional gust speed (#220).
 *
 * With a gust entered, Wind Speed is the lull. A gust that is not stronger than
 * the lull is not a gust: solving it would show a bracket whose two ends are the
 * same hold, or the wrong way round, so the calculator refuses it and says why.
 */
describe('gustSpeedError', () => {
  it('accepts no gust at all: the field is optional', () => {
    expect(gustSpeedError(10, undefined)).toBeUndefined();
  });

  it('accepts a gust stronger than the lull', () => {
    expect(gustSpeedError(8, 14)).toBeUndefined();
    expect(gustSpeedError(0, 5)).toBeUndefined();
  });

  it('refuses a gust equal to the lull', () => {
    expect(gustSpeedError(10, 10)).toMatch(/greater than the wind speed/i);
  });

  it('refuses a gust weaker than the lull', () => {
    expect(gustSpeedError(12, 6)).toMatch(/greater than the wind speed/i);
  });
});
