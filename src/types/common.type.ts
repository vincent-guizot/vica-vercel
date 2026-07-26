export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuditEntity extends BaseEntity {
  createdBy?: string;
  updatedBy?: string;
}

export type Status = "active" | "inactive";

export type Level = "Beginner" | "Intermediate" | "Advanced";

export type ViewMode = "grid" | "table";

export type ResourceType =
  | "article"
  | "video"
  | "documentation"
  | "repository"
  | "pdf";
