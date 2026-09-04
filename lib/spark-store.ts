/**
 * In-memory hunt state: survives client-side navigation (module singleton),
 * resets on page refresh — so the byte hunt is replayable every visit.
 */
export const sparkStore = {
  /* The hunt is dormant until a visitor releases it (⌘K → Secret). */
  active: false,
  found: new Set<string>(),
  celebrated: false,
};
