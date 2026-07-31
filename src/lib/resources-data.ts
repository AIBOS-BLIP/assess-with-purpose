import { modules } from "@/lib/modules";
import { moduleContent } from "@/lib/module-content";

export interface VideoEntry {
  title: string;
  youtubeId: string;
  durationLabel: string;
  moduleTitle: string;
  moduleSlug: string;
}

export interface ReferenceEntry {
  text: string;
  moduleTitle: string;
}

export function getAllVideos(): VideoEntry[] {
  return modules
    .map((mod) => {
      const content = moduleContent[mod.id];
      if (!content.video) return null;
      return {
        title: content.video.title,
        youtubeId: content.video.youtubeId,
        durationLabel: content.video.durationLabel,
        moduleTitle: mod.title,
        moduleSlug: mod.slug,
      };
    })
    .filter((v): v is VideoEntry => v !== null);
}

export function getAllReferences(): ReferenceEntry[] {
  return modules.flatMap((mod) =>
    moduleContent[mod.id].references.map((text) => ({
      text,
      moduleTitle: mod.title,
    }))
  );
}
