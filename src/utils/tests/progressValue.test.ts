import { describe, it, expect } from "vitest";
import { progressValue } from "../utils";

describe("progressValue", () => {
  it("returns the correct percentage rounded up", () => {
    const result = progressValue({ attempts: 3, total: 10 });
    expect(result).toBe(30);
  });
  it("rounds up decimal values", () => {
    const result = progressValue({ attempts: 1, total: 3 });
    expect(result).toBe(34);
  });

  it("returns undefined when inputs are missing", () => {
    expect(progressValue({ total: 10 })).toBeUndefined();
    expect(progressValue({ attempts: 3 })).toBeUndefined();
    expect(progressValue({})).toBeUndefined();
  });
});
