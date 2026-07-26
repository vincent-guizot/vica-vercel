export interface GithubItem {
  name: string;
  path: string;
  type: "dir" | "file";
  download_url?: string | null;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  githubPath: string;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  programSlug: string;
  githubPath: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  programSlug: string;
  moduleSlug: string;
  githubPath: string;
}

export interface Assignment {
  id: string;
  slug: string;
  title: string;
  programSlug: string;
  moduleSlug: string;
  githubPath: string;
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  programSlug: string;
  moduleSlug: string;
  githubPath: string;
  downloadUrl?: string | null;
}

export interface IndexData {
  programs: Program[];
  modules: Module[];
  lessons: Lesson[];
  assignments: Assignment[];
  resources: Resource[];
}
