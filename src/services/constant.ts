export const GITHUB_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER!;
export const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO!;
export const GITHUB_BRANCH = process.env.NEXT_PUBLIC_GITHUB_BRANCH || "main";

export const BASE_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;
