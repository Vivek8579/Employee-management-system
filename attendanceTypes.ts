// attendanceTypes.ts
// All shared TypeScript interfaces, types and constants for AttendanceTracker

export const CHART_COLORS = ['#3b82f6', '#6b7280', '#1f2937'];

// ── Core record shape ────────────────────────────────────────────────────────
export interface AttendanceRecord {
  id: string;
  admin_id: string;
  date: string;
  status: string;
  check_in_time: string | null;
  marked_at: string | null;
  reason: string | null;
  override_status: string | null;
  override_reason: string | null;
  overridden_by: string | null;
  overridden_at: string | null;
  admin?: { name: string; email: string; role: string };
}

// ── Stats shapes ─────────────────────────────────────────────────────────────
export interface MonthlyStats {
  present: number;
  late: number;
  absent: number;
  totalDays: number;
  score: number;
  percentage: number;
}

export interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  late: number;
  notMarked: number;
  percentage: number;
}

// ── NEW: Streak shape ────────────────────────────────────────────────────────
export interface StreakInfo {
  currentStreak: number;   // consecutive present/late days up to today
  longestStreak: number;   // longest streak in the selected month
}

// ── NEW: Weekly summary shape ────────────────────────────────────────────────
export interface WeeklySummary {
  week: string;            // e.g. "Week 1"
  present: number;
  late: number;
  absent: number;
}

// ── Time window constants ────────────────────────────────────────────────────
export const TIME_WINDOWS = {
  PRESENT_START: 360,  // 06:00 in minutes
  PRESENT_END:   660,  // 11:00 in minutes
  LATE_END:     1020,  // 17:00 in minutes
} as const;
