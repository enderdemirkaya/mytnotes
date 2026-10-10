import { DEFAULT_ACTIVITY_ICON } from './iconLibraries';

export const REPEAT_PERIODS = ['day', 'week', 'month'];

export function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createEmptyRepeatCycle() {
  return {
    id: createId(),
    period: 'week',
    timesPerPeriod: 3,
    setsPerSession: 3,
    repsOrDuration: '',
  };
}

export function createEmptyActivityDraft() {
  return {
    name: '',
    icon: { ...DEFAULT_ACTIVITY_ICON },
    summary: '',
    repeatCycles: [],
  };
}

export function formatRepeatCycle(cycle) {
  const periodLabel =
    cycle.period === 'day' ? 'day' : cycle.period === 'week' ? 'week' : 'month';
  const times = cycle.timesPerPeriod;
  const freq =
    times === 1
      ? `Once per ${periodLabel}`
      : `${times}× per ${periodLabel}`;
  const sets =
    cycle.setsPerSession > 0 ? `, ${cycle.setsPerSession} sets` : '';
  const detail = cycle.repsOrDuration.trim()
    ? ` · ${cycle.repsOrDuration.trim()}`
    : '';
  return `${freq}${sets}${detail}`;
}
