import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  X, Download, ExternalLink, Printer, Share2, 
  BookOpen, Eye, FileText, Loader2, Check, Copy, Maximize2, AlertCircle
} from 'lucide-react';

export interface DocumentPdfModalProps {
  id?: string;
  title: string;
  description?: string;
  previewUrl?: string;
  downloadUrl?: string;
  readUrl?: string;
  fileSize?: string;
  pageCount?: string;
  subjectCode?: string;
  subjectName?: string;
  onClose: () => void;
  onShare?: () => void;
}

export default function DocumentPdfModal({
  id,
  title,
  description,
  previewUrl,
  downloadUrl,
  readUrl,
  fileSize,
  pageCount = '28 Pages',
  subjectCode = 'VTU',
  subjectName = 'Engineering Notes',
  onClose,
  onShare
}: DocumentPdfModalProps) {
  const [activeTab, setActiveTab] = useState<'document' | 'drive' | 'print'>('document');
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [iframeError, setIframeError] = useState<boolean>(false);

  // Derive the markdown filename
  const getNoteSlug = (): string => {
    if (readUrl && readUrl.startsWith('/read/')) {
      return readUrl.replace('/read/', '');
    }
    if (id) {
      if (id.startsWith('math-')) return `math-module-${id.replace('math-', '')}`;
      if (id.startsWith('phy-')) return `phy-module-${id.replace('phy-', '')}`;
      if (id.startsWith('che-')) return `che-module-${id.replace('che-', '')}`;
      if (id.startsWith('cprog-')) return `cprog-module-${id.replace('cprog-', '')}`;
      if (id.startsWith('ai-')) return `ai-module-${id.replace('ai-', '')}`;
      if (id.startsWith('dc-')) return `dc-module-${id.replace('dc-', '')}`;
    }
    return '';
  };

  useEffect(() => {
    const slug = getNoteSlug();
    if (!slug) {
      setLoading(false);
      // If no local markdown, fallback to drive view if available
      if (previewUrl) setActiveTab('drive');
      return;
    }

    setLoading(true);
    fetch(`/notes/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Note not found');
        return res.text();
      })
      .then((text) => {
        setMarkdownContent(text);
        setActiveTab('document');
      })
      .catch((err) => {
        console.warn('Local note fetch failed, using fallback or drive preview:', err);
        if (previewUrl) {
          setActiveTab('drive');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, readUrl, previewUrl]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    if (markdownContent) {
      navigator.clipboard.writeText(markdownContent.slice(0, 1500));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-6xl h-[94vh] rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {subjectCode}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {pageCount}
              </span>
              {fileSize && (
                <span className="text-xs text-zinc-400 hidden sm:inline">
                  {fileSize} MB
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white truncate mt-1">
              {title}
            </h3>
          </div>

          {/* Navigation and Action Controls */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-zinc-950 border border-zinc-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('document')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'document'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Notes & Formulas
              </button>
              {previewUrl && (
                <button
                  onClick={() => setActiveTab('drive')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'drive'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  Drive Mirror
                </button>
              )}
            </div>

            {/* Print / Save to PDF Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors border border-emerald-500/30 cursor-pointer shadow-sm"
              title="Print or Save Note directly as PDF"
            >
              <Printer className="h-3.5 w-3.5 mr-1" />
              <span>Print / Save PDF</span>
            </button>

            {/* Read URL full-page router link */}
            {readUrl && (
              <Link
                to={readUrl}
                target="_blank"
                className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-white transition-colors border border-zinc-700"
                title="Open in dedicated full reader"
              >
                <Maximize2 className="h-3.5 w-3.5 mr-1" />
                <span className="hidden md:inline">Full Reader</span>
              </Link>
            )}

            {/* Share Document */}
            {onShare && (
              <button
                onClick={onShare}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors border border-zinc-700"
                title="Share Document"
              >
                <Share2 className="h-4 w-4" />
              </button>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors border border-zinc-700 ml-1 cursor-pointer"
              title="Close modal (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 w-full h-full bg-zinc-950 overflow-y-auto relative">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-zinc-400">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-3" />
              <p className="text-sm font-medium">Loading official university study notes...</p>
            </div>
          ) : activeTab === 'document' && markdownContent ? (
            <div className="p-6 sm:p-10 max-w-4xl mx-auto printable-document">
              {/* Document Header for Print / View */}
              <div className="border-b border-zinc-800 pb-6 mb-8">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                    {subjectName} • {subjectCode}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopySummary}
                      className="no-print inline-flex items-center px-2.5 py-1 text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          Copy Key Formulas
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {title}
                </h1>
                {description && (
                  <p className="text-sm text-zinc-400 mt-2">
                    {description}
                  </p>
                )}
              </div>

              {/* Formatted Markdown Content */}
              <div className="prose prose-invert prose-blue max-w-none">
                <div className="markdown-body text-zinc-300 leading-relaxed space-y-6 
                  [&>h1]:text-2xl [&>h1]:font-black [&>h1]:text-white [&>h1]:border-b [&>h1]:border-zinc-800 [&>h1]:pb-3
                  [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-zinc-100 [&>h2]:mt-8 [&>h2]:mb-3
                  [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-blue-400 [&>h3]:mt-6 [&>h3]:mb-2
                  [&>p]:text-base [&>p]:text-zinc-300 [&>p]:leading-7
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2
                  [&>table]:w-full [&>table]:border-collapse [&>table]:my-6
                  [&>table_th]:border [&>table_th]:border-zinc-800 [&>table_th]:bg-zinc-900/80 [&>table_th]:p-3 [&>table_th]:text-left [&>table_th]:text-xs [&>table_th]:font-bold [&>table_th]:text-zinc-200
                  [&>table_td]:border [&>table_td]:border-zinc-800 [&>table_td]:p-3 [&>table_td]:text-xs [&>table_td]:text-zinc-300
                  [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-zinc-400 [&>blockquote]:bg-blue-500/5 [&>blockquote]:py-2 [&>blockquote]:rounded-r-xl
                  [&>pre]:bg-zinc-900/90 [&>pre]:border [&>pre]:border-zinc-800 [&>pre]:p-4 [&>pre]:rounded-2xl [&>pre]:overflow-x-auto [&>pre]:text-sm
                  [&>code]:bg-zinc-900 [&>code]:text-blue-300 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs
                  [&>hr]:border-zinc-800 [&>hr]:my-8"
                >
                  <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
                </div>
              </div>
            </div>
          ) : activeTab === 'drive' && previewUrl ? (
            <div className="w-full h-full flex flex-col">
              {iframeError ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <AlertCircle className="h-12 w-12 text-amber-400 mb-3" />
                  <h4 className="text-lg font-bold text-white mb-1">External Drive Preview Blocked or Unavailable</h4>
                  <p className="text-sm text-zinc-400 max-w-md mb-6">
                    Google Drive preview is unavailable or has strict iframe restrictions. You can open the note in our built-in interactive notes view or pop it out in a new tab.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveTab('document')}
                      className="px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                    >
                      Switch to In-App Notes
                    </button>
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-sm font-bold bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors border border-zinc-700"
                    >
                      Open in External Tab
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  src={previewUrl}
                  title={title}
                  className="w-full h-full border-0 flex-1"
                  allow="fullscreen"
                  onError={() => setIframeError(true)}
                />
              )}
            </div>
          ) : (
            /* Fallback when note is not in markdown and no drive link */
            <div className="p-8 max-w-2xl mx-auto text-center py-20">
              <FileText className="h-16 w-16 text-blue-400 mx-auto mb-4 opacity-70" />
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-zinc-400 text-sm mb-6">
                Official syllabus study material and question bank for {subjectName} ({subjectCode}).
              </p>
              <div className="flex items-center justify-center gap-3">
                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Study Material
                  </a>
                )}
                {readUrl && (
                  <Link
                    to={readUrl}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700"
                  >
                    Open Reader
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
