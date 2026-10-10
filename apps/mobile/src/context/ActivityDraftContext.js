import { createContext, useContext, useMemo, useState } from 'react';
import { createEmptyActivityDraft } from '../studio/activityDraft';

const ActivityDraftContext = createContext(null);

export function ActivityDraftProvider({ children }) {
  const [draft, setDraft] = useState(createEmptyActivityDraft);

  const value = useMemo(
    () => ({
      draft,
      setDraft,
      updateDraft: (patch) => setDraft((prev) => ({ ...prev, ...patch })),
      addRepeatCycle: (cycle) =>
        setDraft((prev) => ({
          ...prev,
          repeatCycles: [...prev.repeatCycles, cycle],
        })),
      updateRepeatCycle: (id, patch) =>
        setDraft((prev) => ({
          ...prev,
          repeatCycles: prev.repeatCycles.map((c) =>
            c.id === id ? { ...c, ...patch } : c
          ),
        })),
      removeRepeatCycle: (id) =>
        setDraft((prev) => ({
          ...prev,
          repeatCycles: prev.repeatCycles.filter((c) => c.id !== id),
        })),
      resetDraft: () => setDraft(createEmptyActivityDraft()),
    }),
    [draft]
  );

  return (
    <ActivityDraftContext.Provider value={value}>
      {children}
    </ActivityDraftContext.Provider>
  );
}

export function useActivityDraft() {
  const ctx = useContext(ActivityDraftContext);
  if (!ctx) {
    throw new Error('useActivityDraft must be used within ActivityDraftProvider');
  }
  return ctx;
}
