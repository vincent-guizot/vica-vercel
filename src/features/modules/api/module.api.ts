import { data } from "@/lib/data";

export async function getModules() {
  return data.modules.map((module) => ({
    ...module,
    lessons: data.lessons.filter((lesson) => lesson.moduleSlug === module.slug),
    assignments: data.assignments.filter(
      (assignment) => assignment.moduleSlug === module.slug,
    ),
    resources: data.resources.filter(
      (resource) => resource.moduleSlug === module.slug,
    ),
  }));
}
