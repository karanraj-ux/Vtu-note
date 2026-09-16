import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Download, ExternalLink, Maximize, Minimize, 
  Share2, ZoomIn, ZoomOut, RotateCcw, Eye, BookOpen, 
  FileText, Check, Copy, AlertTriangle, RefreshCw, Moon, Sun, Sparkles
} from 'lucide-react';
import { findModuleByQuery, buildEmbedSrc, buildDownloadUrl } from '../utils/moduleLookup';
import ShareModal from '../components/ShareModal';

export default function PdfViewer() {
  const { pdfUrl, noteId } = useParams<{ pdfUrl?: string; noteId?: string }>();
  const navigate = useNavigate();

  const query = pdfUrl || noteId || '';
  const resolvedInfo = useMemo(() => findModuleByQuery(query), [query]);

  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cinemaMode, setCinemaMode] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Derived URLs
  const embedSrc = resolvedInfo?.embedSrc || buildEmbedSrc(decodeURIComponent(query));
  const downloadUrl = resolvedInfo?.downloadUrl || buildDownloadUrl(decodeURIComponent(query));
  const docTitle = resolvedInfo?.title || 'VTU Document';
  const subjectName = resolvedInfo?.subjectTitle || 'VTU Subject';
  const subjectCode = resolvedInfo?.subjectCode || '';

  // Save to recent reading history
  useEffect(() => {
    if (docTitle && embedSrc) {
      try {
        const rawHistory = localStorage.getItem('vtu_pdf_history');
        const history = rawHistory ? JSON.parse(rawHistory) : [];
        const filtered = history.filter((item: any) => item.embedSrc !== embedSrc);
        filtered.unshift({
          title: docTitle,
          subjectName,
          subjectCode,
          embedSrc,
          downloadUrl,
          timestamp: Date.now(),
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        localStorage.setItem('vtu_pdf_history', JSON.stringify(filtered.slice(0, 10)));
      } catch (err) {
        console.warn('Could not save reading history', err);
      }
    }
  }, [docTitle, embedSrc, subjectName, subjectCode, downloadUrl]);

  // Fullscreen listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && cinemaMode) {
        setCinemaMode(false);
      }
      if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cinemaMode]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 15, 75));
  const handleZoomReset = () => setZoom(100);

  return (
    <div 
      ref={containerRef} 
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        themeMode === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-100 text-zinc-900'
      }`}
    >
      {/* Top Controls Bar */}
      {!cinemaMode && (
        <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-6 py-3 transition-all">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            
            {/* Left: Back button & Document Metadata */}
            <div className="flex items-center space-x-3 min-w-0">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-100 transition-colors shrink-0"
                title="Go Back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {subjectCode || 'VTU'}
                  </span>
                  <span className="text-xs text-zinc-400 truncate hidden sm:inline">
                    {subjectName}
                  </span>
                </div>
                <h1 className="text-sm sm:text-base font-bold text-zinc-100 truncate max-w-xs sm:max-w-md md:max-w-lg">
                  {docTitle}
                </h1>
              </div>
            </div>

            {/* Right: Controls (Zoom, Cinema, Fullscreen, Download, Share) */}
            <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
              {/* Zoom Controls */}
              <div className="hidden md:flex items-center bg-zinc-950/80 rounded-xl p-1 border border-zinc-800 space-x-1">
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 75}
                  className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg disabled:opacity-40 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={handleZoomReset}
                  className="px-2 py-1 text-xs font-mono font-bold text-zinc-300 hover:bg-zinc-800 rounded-lg"
                  title="Reset Zoom"
                >
                  {zoom}%
                </button>
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 160}
                  className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg disabled:opacity-40 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>

              {/* Focus / Cinema Mode */}
              <button
                onClick={() => setCinemaMode(true)}
                className="px-2.5 py-1.5 hidden sm:flex items-center space-x-1 text-xs font-bold text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700 hover:text-white rounded-xl border border-zinc-700/50 transition-colors"
                title="Enter Focus Mode"
              >
                <Eye className="h-3.5 w-3.5 text-blue-400" />
                <span>Focus</span>
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </button>

              {/* Share */}
              <button
                onClick={() => setShowShareModal(true)}
                className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 rounded-xl transition-colors"
                title="Share Document"
              >
                <Share2 className="h-4 w-4" />
              </button>

              {/* Direct Download */}
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all space-x-1.5"
                  title="Download Original PDF"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              )}

              {/* Open External / Google Drive */}
              {embedSrc && embedSrc.includes('drive.google.com') ? (
                <a
                  href={embedSrc.replace('/preview', '/view')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
                  title="Open in Google Drive"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : embedSrc && (
                <a
                  href={embedSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

          </div>
        </header>
      )}

      {/* Floating Exit Cinema Mode Button */}
      {cinemaMode && (
        <button
          onClick={() => setCinemaMode(false)}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white rounded-full border border-zinc-700 text-xs font-bold shadow-2xl backdrop-blur-md flex items-center space-x-2 transition-all"
        >
          <span>Exit Focus Mode (Esc)</span>
        </button>
      )}

      {/* Main Document Frame */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-2 sm:p-4 bg-zinc-950 overflow-hidden">
        {/* Loading Spinner State */}
        {loading && !error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm space-y-4">
            <div className="relative">
              <div className="w-14 h-14 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-400 animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-zinc-200">Loading Authentic VTU Document...</p>
              <p className="text-xs text-zinc-500 mt-1">Connecting to official repository mirror</p>
            </div>
          </div>
        )}

        {/* Error Fallback State */}
        {error && (
          <div className="max-w-md w-full p-8 text-center bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl space-y-4 my-auto">
            <div className="w-14 h-14 mx-auto bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center border border-amber-500/20">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100">Unable to load preview directly</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Google Drive preview might be restricted by your browser cookies or network policies. You can still download or open the file directly in Google Drive.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setError(false);
                  setLoading(true);
                  if (iframeRef.current) {
                    iframeRef.current.src = embedSrc;
                  }
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* The Live PDF Iframe */}
        {embedSrc ? (
          <div 
            className="w-full h-full flex-1 max-w-6xl mx-auto rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shadow-2xl transition-all duration-200 relative"
            style={{
              transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
              transformOrigin: 'top center',
              minHeight: cinemaMode ? '96vh' : 'calc(100vh - 80px)'
            }}
          >
            <iframe
              ref={iframeRef}
              src={embedSrc}
              title={docTitle}
              className="w-full h-full border-none"
              style={{ minHeight: cinemaMode ? '96vh' : 'calc(100vh - 80px)' }}
              allow="autoplay; fullscreen"
              onLoad={() => {
                setLoading(false);
                setIframeLoaded(true);
              }}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
            />
          </div>
        ) : (
          <div className="p-12 text-center text-zinc-400">
            <FileText className="w-12 h-12 mx-auto mb-3 text-zinc-600" />
            <p>No document source specified.</p>
          </div>
        )}
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          isOpen={true}
          title={`${subjectName} - ${docTitle}`}
          subtitle={`${subjectCode} • Official VTU Notes`}
          url={window.location.href}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}
