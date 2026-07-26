import { data } from "@/lib/data";

import { Resource, ResourceType } from "../types/resource.type";

export async function getResources(): Promise<Resource[]> {
  return data.resources.map((resource) => ({
    id: resource.id,
    slug: resource.slug,

    title: resource.title,

    description: (resource as any).description ?? "",

    type: ((resource as any).type as ResourceType) ?? "pdf",

    size: (resource as any).size ?? "0 KB",

    programSlug: resource.programSlug,

    moduleSlug: resource.moduleSlug,

    githubPath: resource.githubPath,

    downloadUrl: resource.downloadUrl,

    createdAt: (resource as any).createdAt ?? "",

    updatedAt: (resource as any).updatedAt ?? "",
  })) as Resource[];
}
