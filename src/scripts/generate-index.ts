import fs from "fs/promises";
import path from "path";

import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import slugify from "../utils/slugify";

import type {
  Assignment,
  GithubItem,
  IndexData,
  Lesson,
  Module,
  Program,
  Resource,
} from "./types";

async function generate() {
  console.log("");
  console.log("========================================");
  console.log("🚀 VICA Index Generator");
  console.log("========================================");
  console.log("");

  const { default: GithubService } = await import("../services/github.service");

  const programs: Program[] = [];
  const modules: Module[] = [];
  const lessons: Lesson[] = [];
  const assignments: Assignment[] = [];
  const resources: Resource[] = [];

  console.log("📦 Fetching API...");

  const githubPrograms = (await GithubService.getPrograms()) as GithubItem[];

  const programFolders = githubPrograms.filter((item) => item.type === "dir");

  for (const program of programFolders) {
    const programSlug = slugify(program.name);

    programs.push({
      id: programSlug,
      slug: programSlug,
      title: program.name,
      githubPath: program.path,
    });

    let githubModules: GithubItem[];

    try {
      githubModules = (await GithubService.getModules(
        program.name,
      )) as GithubItem[];
    } catch {
      continue;
    }

    const moduleFolders = githubModules.filter((item) => item.type === "dir");

    for (const module of moduleFolders) {
      const moduleSlug = `${programSlug}-${slugify(module.name)}`;

      modules.push({
        id: moduleSlug,
        slug: moduleSlug,
        title: module.name,
        programSlug,
        githubPath: module.path,
      });

      try {
        const lessonFolders = (await GithubService.getLessons(
          program.name,
          module.name,
        )) as GithubItem[];

        lessons.push(
          ...lessonFolders
            .filter((item) => item.type === "dir")
            .map(
              (item): Lesson => ({
                id: `${moduleSlug}-${slugify(item.name)}`,
                slug: `${moduleSlug}-${slugify(item.name)}`,
                title: item.name,
                programSlug,
                moduleSlug,
                githubPath: item.path,
              }),
            ),
        );
      } catch {}

      try {
        const assignmentFolders = (await GithubService.getAssignments(
          program.name,
          module.name,
        )) as GithubItem[];

        assignments.push(
          ...assignmentFolders
            .filter((item) => item.type === "dir")
            .map(
              (item): Assignment => ({
                id: `${moduleSlug}-${slugify(item.name)}`,
                slug: `${moduleSlug}-${slugify(item.name)}`,
                title: item.name,
                programSlug,
                moduleSlug,
                githubPath: item.path,
              }),
            ),
        );
      } catch {}

      try {
        const resourceFiles = (await GithubService.getResources(
          program.name,
          module.name,
        )) as GithubItem[];

        resources.push(
          ...resourceFiles
            .filter((item) => item.type === "file")
            .map(
              (item): Resource => ({
                id: slugify(item.path),
                slug: slugify(item.path),
                title: item.name,
                programSlug,
                moduleSlug,
                githubPath: item.path,
                downloadUrl: item.download_url ?? null,
              }),
            ),
        );
      } catch {}
    }
  }

  const output: IndexData = {
    programs,
    modules,
    lessons,
    assignments,
    resources,
  };

  const outputDir = path.join(process.cwd(), "src", "data");

  await fs.mkdir(outputDir, {
    recursive: true,
  });

  await fs.writeFile(
    path.join(outputDir, "index.json"),
    JSON.stringify(output, null, 2),
  );

  console.log("✅ index.json generated");

  console.table({
    Programs: programs.length,
    Modules: modules.length,
    Lessons: lessons.length,
    Assignments: assignments.length,
    Resources: resources.length,
  });
}

generate().catch((error) => {
  console.error("❌ Failed to generate index.json");
  console.error(error);
  process.exit(1);
});
