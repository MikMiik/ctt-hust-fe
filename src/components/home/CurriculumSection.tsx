"use client";

import { useMemo, useState } from "react";
import CurriculumFilters, { type DisplayMode } from "./CurriculumFilters";
import CurriculumTable from "./CurriculumTable";
import { mockCurricula, mockUsers } from "@/app/data";
import type { CourseAddStatus, CurriculumGroup } from "@/app/types";

interface CurriculumSectionProps {
  onAddCourse: (courseCode: string) => void;
  selectedCodes: Set<string>;
}

function resolveDefaultCurriculumId(): string {
  const preferredId = mockUsers[0]?.curriculumId;
  if (preferredId && mockCurricula.some((p) => p.id === preferredId)) {
    return preferredId;
  }
  return mockCurricula[0]?.id ?? "";
}

export default function CurriculumSection({
  onAddCourse,
  selectedCodes,
}: CurriculumSectionProps) {
  const [selectedCurriculumId, setSelectedCurriculumId] = useState(
    resolveDefaultCurriculumId
  );
  const [searchValue, setSearchValue] = useState("");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("default");

  const activeGroups = useMemo(() => {
    const program =
      mockCurricula.find((p) => p.id === selectedCurriculumId) ??
      mockCurricula[0];
    return program?.groups ?? [];
  }, [selectedCurriculumId]);

  const processedGroups: CurriculumGroup[] = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return activeGroups
      .map((group) => {
        const filteredSubGroups = group.subGroups
          .map((subGroup) => {
            let courses = subGroup.courses.map((course) => {
              const currentStatus: CourseAddStatus =
                course.addStatus === "locked"
                  ? "locked"
                  : selectedCodes.has(course.courseCode)
                  ? "added"
                  : "add";

              return {
                ...course,
                addStatus: currentStatus,
              };
            });

            if (query) {
              courses = courses.filter(
                (c) =>
                  c.courseCode.toLowerCase().includes(query) ||
                  c.courseName.toLowerCase().includes(query)
              );
            }

            if (displayMode === "debt") {
              courses = [...courses].sort((a, b) => {
                const aDebt = a.letterGrade === "F" ? 1 : 0;
                const bDebt = b.letterGrade === "F" ? 1 : 0;
                return bDebt - aDebt;
              });
            } else if (displayMode === "improve") {
              courses = [...courses].sort((a, b) => {
                const aImp =
                  a.letterGrade && ["D", "D+"].includes(a.letterGrade) ? 1 : 0;
                const bImp =
                  b.letterGrade && ["D", "D+"].includes(b.letterGrade) ? 1 : 0;
                return bImp - aImp;
              });
            } else if (displayMode === "semester") {
              courses = [...courses].sort(
                (a, b) =>
                  (a.recommendedSemester ?? 99) - (b.recommendedSemester ?? 99)
              );
            }

            return {
              ...subGroup,
              courseCount: courses.length,
              courses,
            };
          })
          .filter((sg) => sg.courses.length > 0);

        return {
          ...group,
          courseCount: filteredSubGroups.reduce(
            (acc, sg) => acc + sg.courseCount,
            0
          ),
          subGroups: filteredSubGroups,
        };
      })
      .filter((g) => g.subGroups.length > 0);
  }, [activeGroups, searchValue, displayMode, selectedCodes]);

  return (
    <section className="bg-white border border-gray-200 shadow-sm">
      {/* ── Section: Curriculum Filters & Table Container ── */}
      <CurriculumFilters
        curricula={mockCurricula}
        selectedCurriculumId={selectedCurriculumId}
        onCurriculumChange={setSelectedCurriculumId}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
      />
      <CurriculumTable groups={processedGroups} onAddCourse={onAddCourse} />
    </section>
  );
}
