import { moduleDetails } from '../data/moduleDetails';
import { subjectsData } from '../data/subjectsData';

export interface ResolvedModuleInfo {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  previewUrl: string;
  downloadUrl: string;
  embedSrc: string;
  type?: string;
  category?: string;
  essential?: boolean;
  uploadedDate?: string;
  fileSize?: string;
  subjectTitle?: string;
  subjectCode?: string;
  branch?: string;
  semester?: string | number;
}

export function extractDriveId(url: string): string | null {
  if (!url) return null;
  const match1 = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match1 && match1[1]) return match1[1];
  
  const match2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match2 && match2[1]) return match2[1];

  // If the string itself is a 33+ character alphanumeric Google Drive ID
  if (/^[a-zA-Z0-9_-]{25,50}$/.test(url.trim())) {
    return url.trim();
  }
  return null;
}

export function buildEmbedSrc(url: string): string {
  const driveId = extractDriveId(url);
  if (driveId) {
    return `https://drive.google.com/file/d/${driveId}/preview`;
  }
  if (!url) return '';
  return url.replace(/(\/view|\/open).*/, '/preview');
}

export function buildDownloadUrl(url: string): string {
  const driveId = extractDriveId(url);
  if (driveId) {
    return `https://drive.google.com/uc?export=download&id=${driveId}`;
  }
  return url || '';
}

export function findModuleByQuery(query: string): ResolvedModuleInfo | null {
  if (!query) return null;
  const decoded = decodeURIComponent(query).trim();
  const driveId = extractDriveId(decoded);

  for (const branch of Object.keys(moduleDetails)) {
    const branchData = (moduleDetails as any)[branch];
    for (const sem of Object.keys(branchData)) {
      const subjects = branchData[sem] || [];
      for (const subject of subjects) {
        const modules = subject.modules || [];
        for (const mod of modules) {
          const modDriveId = extractDriveId(mod.fileUrl || mod.previewUrl || '');
          const matches =
            mod.id === decoded ||
            mod.fileUrl === decoded ||
            mod.previewUrl === decoded ||
            (driveId && modDriveId && driveId === modDriveId) ||
            (decoded.length > 10 && mod.previewUrl?.includes(decoded)) ||
            (decoded.length > 10 && mod.fileUrl?.includes(decoded));

          if (matches) {
            const rawUrl = mod.previewUrl || mod.fileUrl || '';
            return {
              id: mod.id,
              title: mod.title,
              description: mod.description,
              fileUrl: mod.fileUrl,
              previewUrl: mod.previewUrl,
              downloadUrl: buildDownloadUrl(rawUrl),
              embedSrc: buildEmbedSrc(rawUrl),
              type: mod.type,
              category: mod.category,
              essential: mod.essential,
              uploadedDate: mod.uploadedDate,
              fileSize: mod.fileSize,
              subjectTitle: subject.title,
              subjectCode: subject.code,
              branch,
              semester: sem,
            };
          }
        }
      }
    }
  }

  // If not found in moduleDetails, but we have a valid Drive ID or URL, construct a direct link
  if (driveId || decoded.startsWith('http')) {
    return {
      id: driveId || 'custom-doc',
      title: 'VTU Study Document',
      fileUrl: decoded,
      previewUrl: buildEmbedSrc(decoded),
      downloadUrl: buildDownloadUrl(decoded),
      embedSrc: buildEmbedSrc(decoded),
      category: 'notes',
      subjectTitle: 'VTU Study Material',
      subjectCode: 'VTU',
    };
  }

  return null;
}
