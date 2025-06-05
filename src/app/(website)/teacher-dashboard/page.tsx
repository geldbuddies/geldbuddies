// src/app/(website)/teacher-dashboard/page.tsx
"use client";

import { TeacherDashboardWelcomeSection } from "@/components/sections/teacher-dashboard-welcome-section";
import { TeacherDashboardStatsSection } from "@/components/sections/teacher-dashboard-stats-section";
import { TeacherDashboardClassesSection } from "@/components/sections/teacher-dashboard-classes-section";
import { TeacherDashboardHistorySection } from "@/components/sections/teacher-dashboard-history-section";

export default function TeacherDashboard() {
  return (
    <div className="container mx-auto p-6">
      <TeacherDashboardWelcomeSection />
      <TeacherDashboardStatsSection />
      <TeacherDashboardClassesSection />
      <TeacherDashboardHistorySection />
    </div>
  );
}
