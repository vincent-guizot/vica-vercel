import { data } from "@/lib/data";

import GithubService from "@/services/github.service";

export async function getAssignments() {
  return data.assignments;
}

export async function getAssignmentMarkdown(githubPath: string) {
  return GithubService.getMarkdown(`${githubPath}/README.md`);
}
