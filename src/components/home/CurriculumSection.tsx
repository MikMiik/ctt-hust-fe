"use client";

import { useMemo, useState } from "react";
import CurriculumFilters, { type DisplayMode } from "./CurriculumFilters";
import CurriculumTable from "./CurriculumTable";
import { mockCurriculumGroups } from "@/app/data";
import type { CourseAddStatus, CurriculumGroup } from "@/app/types";

interface CurriculumSectionProps {
  onAddCourse: (courseCode: string) => void;
  selectedCodes: Set<string>;
}

export default function CurriculumSection({
  onAddCourse,
  selectedCodes,
}: CurriculumSectionProps) {
  const [searchValue, setSearchValue] = useState("");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("default");

  const processedGroups: CurriculumGroup[] = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return mockCurriculumGroups
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
                const aImp = a.letterGrade && ["D", "D+"].includes(a.letterGrade) ? 1 : 0;
                const bImp = b.letterGrade && ["D", "D+"].includes(b.letterGrade) ? 1 : 0;
                return bImp - aImp;
              });
            } else if (displayMode === "semester") {
              courses = [...courses].sort((a, b) => (a.recommendedSemester ?? 99) - (b.recommendedSemester ?? 99));
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
          courseCount: filteredSubGroups.reduce((acc, sg) => acc + sg.courseCount, 0),
          subGroups: filteredSubGroups,
        };
      })
      .filter((g) => g.subGroups.length > 0);
  }, [searchValue, displayMode, selectedCodes]);

  return (
    <section className="bg-white border border-gray-300">
      {/* ── Section: Curriculum Filters & Table Container ── */}
      <CurriculumFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
      />
      <CurriculumTable groups={processedGroups} onAddCourse={onAddCourse} />
    </section>
  );
}
