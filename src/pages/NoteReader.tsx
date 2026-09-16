import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, Loader2, BookOpen, Download, ExternalLink, FileText, Layers, Printer, Check, Copy } from 'lucide-react';

const pdfMap: Record<string, { title: string; driveId: string; pageCount: string; size: string }> = {
  'ai-module-1': { title: 'Module 1: Introduction to AI & Intelligent Agents', driveId: '1mOWeYRy_qV9mmSCykIpuhDv4j96UUPrx', pageCount: '28 Pages', size: '4.2 MB' },
  'ai-module-2': { title: 'Module 2: Problem Solving & Search Strategies', driveId: '1HiAp5__YrLO0j9AnN1qaZ9Qhh6wESzua', pageCount: '32 Pages', size: '4.5 MB' },
  'ai-module-3': { title: 'Module 3: Knowledge Representation & Logic', driveId: '1WNKkLqFUGeMpz4q7zYdD1zVrgx5ao1EQ', pageCount: '26 Pages', size: '3.8 MB' },
  'ai-module-4': { title: 'Module 4: Reasoning under Uncertainty & Probabilistic Reasoning', driveId: '1YUYrH-d7A0PNbEoOu8nCTk3znY_W2ps5', pageCount: '29 Pages', size: '4.1 MB' },
  'ai-module-5': { title: 'Module 5: Machine Learning Foundations & Ethics', driveId: '1DGXmm9bfdj4bAw7NKw--HyXbNJWiMjyc', pageCount: '30 Pages', size: '3.9 MB' },
  'math-module-1': { title: 'Module 1: Calculus — Polar Curves & Curvature', driveId: '1s__ib0S7BVMtYVWCU6G3wiwJqXlyDpXk', pageCount: '32 Pages', size: '4.2 MB' },
  'math-module-2': { title: 'Module 2: Multivariable Calculus & Series Expansion', driveId: '1KHVZG-p6tFYMfcRhgj8GJ2y6v7xBqI2C', pageCount: '30 Pages', size: '3.8 MB' },
  'math-module-3': { title: 'Module 3: Linear Algebra — Matrices & System of Equations', driveId: '1-IwKiWyX413t3ttm_nLlX1DHeMTIBZsG', pageCount: '28 Pages', size: '3.5 MB' },
  'math-module-4': { title: 'Module 4: Linear Algebra — Eigenvalues & Diagonalization', driveId: '1OnesfEvKWdqHx2HfXV046dx-QN7eZXSc', pageCount: '31 Pages', size: '4.0 MB' },
  'math-module-5': { title: 'Module 5: Ordinary Differential Equations of Higher Order', driveId: '1Mxfj8jZl1T9NlM8Mu-5MHiFEsninrxFV', pageCount: '34 Pages', size: '3.9 MB' },
  'phy-module-1': { title: 'Module 1: Quantum Mechanics & Wave-Particle Duality', driveId: '1fxNcviU2MkJtSpdN3KhF_QuyIBHl4gvo', pageCount: '30 Pages', size: '4.5 MB' },
  'phy-module-2': { title: 'Module 2: Lasers & Optical Fibers', driveId: '174lgTaTm2_2yxxlAjUO-JWAfJt1wHlx8', pageCount: '28 Pages', size: '4.0 MB' },
  'phy-module-3': { title: 'Module 3: Superconductivity & Dielectric Materials', driveId: '1IpCD0rOzck5qE6iVd25Ul5ZksMi_Ulxa', pageCount: '26 Pages', size: '3.8 MB' },
  'phy-module-4': { title: 'Module 4: Semiconductor Physics & Display Devices', driveId: '1fbateF4uIDpn3Wprfm0egzENJMNw8WPE', pageCount: '32 Pages', size: '4.2 MB' },
  'phy-module-5': { title: 'Module 5: Nanomaterials & Shock Waves', driveId: '1QLF1kJz8HpWxQXzUX2pdkrKk6iqgyOe-', pageCount: '27 Pages', size: '3.9 MB' },
  'che-module-1': { title: 'Module 1: Energy Storage Systems & Battery Technology', driveId: '1V1C6Q4kC6bL7X_u00Ea4f4P3k2o1B8rZ', pageCount: '28 Pages', size: '3.8 MB' },
  'che-module-2': { title: 'Module 2: Corrosion Science & Metal Finishing', driveId: '1v6C6Q4kC6bL7X_u00Ea4f4P3k2o1B8rZ', pageCount: '30 Pages', size: '4.0 MB' },
  'che-module-3': { title: 'Module 3: Polymers, Electronic Materials & Nanomaterials', driveId: '1w6C6Q4kC6bL7X_u00Ea4f4P3k2o1B8rZ', pageCount: '28 Pages', size: '3.9 MB' },
  'che-module-4': { title: 'Module 4: Green Chemistry & Environmental Pollution Control', driveId: '1x6C6Q4kC6bL7X_u00Ea4f4P3k2o1B8rZ', pageCount: '26 Pages', size: '3.7 MB' },
  'che-module-5': { title: 'Module 5: Instrumental Methods of Analysis & Chemical Sensors', driveId: '1y6C6Q4kC6bL7X_u00Ea4f4P3k2o1B8rZ', pageCount: '29 Pages', size: '4.1 MB' },
  'cprog-module-1': { title: 'Module 1: Introduction to C Programming & Problem Solving', driveId: '1DOdW_T-H2f4Y_seK2hTuXrleK5bLZX86', pageCount: '34 Pages', size: '4.2 MB' },
  'cprog-module-2': { title: 'Module 2: Branching and Looping Statements in C', driveId: '1EOdW_T-H2f4Y_seK2hTuXrleK5bLZX86', pageCount: '30 Pages', size: '3.9 MB' },
  'cprog-module-3': { title: 'Module 3: Arrays, Matrices & String Manipulation in C', driveId: '1FOdW_T-H2f4Y_seK2hTuXrleK5bLZX86', pageCount: '32 Pages', size: '4.1 MB' },
  'cprog-module-4': { title: 'Module 4: Modular Programming: Functions, Recursion & Storage Classes', driveId: '1GOdW_T-H2f4Y_seK2hTuXrleK5bLZX86', pageCount: '28 Pages', size: '3.8 MB' },
  'cprog-module-5': { title: 'Module 5: Pointers, Structures, Unions & Dynamic Memory Allocation', driveId: '1HOdW_T-H2f4Y_seK2hTuXrleK5bLZX86', pageCount: '35 Pages', size: '4.3 MB' },
};

export default function NoteReader() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [viewMode, setViewMode] = useState<'pdf' | 'summary'>('summary');

  const pdfInfo = noteId ? pdfMap[noteId] : undefined;
  const pdfPreviewUrl = pdfInfo ? `https://drive.google.com/file/d/${pdfInfo.driveId}/preview` : '';
  const pdfDownloadUrl = pdfInfo ? `https://drive.google.com/uc?export=download&id=${pdfInfo.driveId}` : '';

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`/notes/${noteId}.md`);
        if (!res.ok) throw new Error('Note not found');
        const text = await res.text();
        setContent(text);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-bold text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Subject
        </button>

        {pdfInfo && (
          <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-2xl">
            <button
              onClick={() => setViewMode('summary')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'summary'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              Quick Summary (3-4 pgs)
            </button>
            <button
              onClick={() => setViewMode('pdf')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'pdf'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Full 25-30 Page PDF Notes
            </button>
          </div>
        )}
      </div>

      {/* Official 20-30 Page PDF Banner */}
      {pdfInfo && (
        <div className="bg-gradient-to-r from-blue-950/40 via-zinc-900/60 to-emerald-950/30 border border-blue-500/30 rounded-3xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 shrink-0">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {pdfInfo.pageCount} (Original University Notes)
                </span>
                <span className="text-xs text-zinc-400">
                  {pdfInfo.size}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {pdfInfo.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Complete official faculty notes with diagrams, derivations, and solved university numericals.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {viewMode === 'summary' ? (
              <button
                onClick={() => setViewMode('pdf')}
                className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md"
              >
                <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                Read Full PDF
              </button>
            ) : (
              <button
                onClick={() => setViewMode('summary')}
                className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700"
              >
                <Layers className="h-3.5 w-3.5 mr-1.5" />
                Read Quick Summary
              </button>
            )}

            <button
              onClick={() => window.print()}
              className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors border border-emerald-500/30"
              title="Print or Save Note as PDF"
            >
              <Printer className="h-3.5 w-3.5 sm:mr-1.5" />
              <span className="hidden sm:inline">Print / Save as PDF</span>
            </button>

            <a
              href={pdfDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700"
              title="Download original PDF"
            >
              <Download className="h-3.5 w-3.5 sm:mr-1.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={pdfPreviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 transition-colors border border-zinc-700"
              title="Open full PDF in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      {/* Main Reading View */}
      {viewMode === 'pdf' && pdfInfo ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl h-[85vh] flex flex-col">
          <div className="px-5 py-3.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-bold text-white truncate max-w-md">
                {pdfInfo.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={pdfDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Download PDF ({pdfInfo.size})
              </a>
              <a
                href={pdfPreviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Pop Out
              </a>
            </div>
          </div>
          <iframe
            src={pdfPreviewUrl}
            title={pdfInfo.title}
            className="w-full flex-1 border-0"
            allow="fullscreen"
          />
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-500/20 p-6 rounded-3xl text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Note Not Found</h2>
          <p className="text-zinc-400">The study material you are looking for is currently unavailable.</p>
        </div>
      ) : (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-12 shadow-2xl backdrop-blur-md">
          <div className="prose prose-invert prose-blue max-w-none">
            <div className="markdown-body text-zinc-300 leading-relaxed space-y-6 
              [&>h1]:text-3xl [&>h1]:font-extrabold [&>h1]:text-white [&>h1]:mb-6 [&>h1]:border-b [&>h1]:border-zinc-800 [&>h1]:pb-4
              [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-zinc-100 [&>h2]:mt-10 [&>h2]:mb-4
              [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-blue-400 [&>h3]:mt-8 [&>h3]:mb-3
              [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-zinc-200 [&>h4]:mt-6 [&>h4]:mb-2
              [&>p]:text-base [&>p]:text-zinc-300 [&>p]:leading-7
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul>li]:text-zinc-300
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol>li]:text-zinc-300
              [&>hr]:border-zinc-800 [&>hr]:my-8
              [&_strong]:text-zinc-100 [&_strong]:font-bold
              [&_em]:text-zinc-400 [&_em]:italic
              [&_code]:bg-zinc-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-blue-300 [&_code]:text-sm
              [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:py-1 [&>blockquote]:my-4 [&>blockquote]:text-zinc-300 [&>blockquote]:bg-blue-500/5 [&>blockquote]:rounded-r-xl
              [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:overflow-x-auto [&_table]:block [&_table]:sm:table
              [&_th]:border [&_th]:border-zinc-800 [&_th]:bg-zinc-800/80 [&_th]:p-3 [&_th]:text-left [&_th]:text-zinc-200 [&_th]:font-bold [&_th]:text-sm
              [&_td]:border [&_td]:border-zinc-800 [&_td]:p-3 [&_td]:text-zinc-300 [&_td]:text-sm
            ">
              <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
