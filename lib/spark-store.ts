/**
 * In-memory hunt state: survives client-side navigation (module singleton),
 * resets on page refresh — so the byte hunt is replayable every visit.
 */
export const sparkStore = {
  found: new Set<string>(),
  celebrated: false,
};
