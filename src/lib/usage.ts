const STORAGE_KEY = "quicklist-ai-usage";
const FREE_LIMIT = 3;

interface UsageData {
  date: string;
  count: number;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getUsageData(): UsageData {
  if (typeof window === "undefined") return { date: getToday(), count: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: getToday(), count: 0 };
    const data: UsageData = JSON.parse(raw);
    if (data.date !== getToday()) return { date: getToday(), count: 0 };
    return data;
  } catch {
    return { date: getToday(), count: 0 };
  }
}

export function getUsageCount(): number {
  return getUsageData().count;
}

export function getRemainingGenerations(): number {
  return Math.max(0, FREE_LIMIT - getUsageData().count);
}

export function hasReachedLimit(): boolean {
  return getUsageData().count >= FREE_LIMIT;
}

export function incrementUsage(): void {
  const data = getUsageData();
  data.count += 1;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export const FREE_DAILY_LIMIT = FREE_LIMIT;
