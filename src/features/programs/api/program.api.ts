import { data } from "@/lib/data";

import { Program } from "../types/program.type";

export async function getPrograms(): Promise<Program[]> {
  return data.programs.map((program) => ({
    id: program.id,
    slug: program.slug,
    title: program.title,
    githubPath: program.githubPath,

    description: "",
    level: "",

    modules: [],

    createdAt: "",
    updatedAt: "",
  }));
}
