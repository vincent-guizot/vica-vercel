import axios from "@/lib/axios";
import { cache } from "react";
import { BASE_URL, GITHUB_BRANCH, GITHUB_OWNER, GITHUB_REPO } from "./constant";

class GithubService {
  private static request = cache(async (path = "") => {
    const url = `${BASE_URL}/${path}`;

    try {
      const response = await axios.get(url, {
        params: {
          ref: GITHUB_BRANCH,
        },
        headers: {
          Accept: "application/vnd.github+json",
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || `GitHub request failed: ${path}`,
      );
    }
  });

  private static requestRaw = cache(async (path: string) => {
    const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${encodeURI(
      path,
    )}`;

    try {
      const response = await axios.get(url, {
        responseType: "text",
      });

      return response.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || `Failed to load markdown: ${path}`,
      );
    }
  });

  static async getPrograms() {
    return this.request();
  }

  static async getModules(programName: string) {
    return this.request(encodeURIComponent(programName));
  }

  static async getLessons(programName: string, moduleName: string) {
    return this.request(
      `${encodeURIComponent(programName)}/${encodeURIComponent(
        moduleName,
      )}/lessons`,
    );
  }

  static async getAssignments(programName: string, moduleName: string) {
    return this.request(
      `${encodeURIComponent(programName)}/${encodeURIComponent(
        moduleName,
      )}/assignments`,
    );
  }

  static async getResources(programName: string, moduleName: string) {
    return this.request(
      `${encodeURIComponent(programName)}/${encodeURIComponent(
        moduleName,
      )}/resources`,
    );
  }

  static async getFileInfo(path: string) {
    return this.request(path);
  }

  static async getMarkdown(path: string): Promise<string> {
    return this.requestRaw(path);
  }

  static async getDownloadUrl(path: string): Promise<string> {
    const file = await this.request(path);

    if (!file?.download_url) {
      throw new Error(`Download URL not found: ${path}`);
    }

    return file.download_url;
  }

  static getRawUrl(path: string) {
    return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${encodeURI(
      path,
    )}`;
  }
}

export default GithubService;
