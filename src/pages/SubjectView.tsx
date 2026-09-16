import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { 
  ChevronLeft, FileText, Download, Bookmark, BookmarkCheck, 
  Eye, HelpCircle, FileQuestion, CheckCircle2, Share2, 
  Search, BookOpen, Layers, Sparkles, Filter
} from 'lucide-react';
import { subjectsData } from '../data/subjectsData';
import { moduleDetails } from '../data/moduleDetails';
import { buildEmbedSrc, buildDownloadUrl } from '../utils/moduleLookup';
import ShareModal from '../components/ShareModal';

export default function SubjectView() {
  const params = useParams<any>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Support both /branch/:branch/:semester/modules/:subjectName and /subject/:year/:sem/:subjectCode
  const stream = params.branch || params.year || 'first-year';
  const semester = params.semester || params.sem || '1';
  const rawQuery = params.subjectName || params.subjectCode || '';
  const decodedQuery = decodeURIComponent(rawQuery).trim();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [moduleSearch, setModuleSearch] = useState<string>('');
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [shareDoc, setShareDoc] = useState<{ title: string; url: string; subtitle?: string } | null>(null);

  // Multi-tier resilient Subject & Details resolution
  const { subject, details, resolvedStream, resolvedSem } = useMemo(() => {
    let matchDetails: any = null;
    let matchSubject: any = null;
    let foundStream = stream;
    let foundSem = semester;

    // 1. Try specified stream and semester
    const branchModules = (moduleDetails as any)[stream]?.[semester] || [];
    matchDetails = branchModules.find((d: any) =>
      d.code === decodedQuery ||
      d.vtuCode === decodedQuery ||
      d.title?.toLowerCase().trim() === decodedQuery.toLowerCase() ||
      (d.code && decodedQuery && (d.code.includes(decodedQuery) || decodedQuery.includes(d.code))) ||
      (d.title && decodedQuery && (d.title.toLowerCase().includes(decodedQuery.toLowerCase()) || decodedQuery.toLowerCase().includes(d.title.toLowerCase())))
    );

    // 2. Search all streams and semesters if not matched in current
    if (!matchDetails) {
      for (const bKey of Object.keys(moduleDetails)) {
        for (const sKey of Object.keys((moduleDetails as any)[bKey])) {
          const list = (moduleDetails as any)[bKey][sKey] || [];
          const found = list.find((d: any) =>
            d.code === decodedQuery ||
            d.vtuCode === decodedQuery ||
            d.title?.toLowerCase().trim() === decodedQuery.toLowerCase() ||
            (d.code && decodedQuery && (d.code.includes(decodedQuery) || decodedQuery.includes(d.code))) ||
            (d.title && decodedQuery && (d.title.toLowerCase().includes(decodedQuery.toLowerCase()) || decodedQuery.toLowerCase().includes(d.title.toLowerCase())))
          );
          if (found) {
            matchDetails = found;
            foundStream = bKey;
            foundSem = sKey;
            break;
          }
        }
        if (matchDetails) break;
      }
    }

    // Now look for corresponding entry in subjectsData
    const streamSubs = (subjectsData as any)[foundStream]?.[foundSem] || [];
    matchSubject = streamSubs.find((s: any) =>
      s.code === decodedQuery ||
      (matchDetails && s.code === matchDetails.code) ||
      s.name.toLowerCase().trim() === decodedQuery.toLowerCase() ||
      (matchDetails && s.name.toLowerCase().trim() === matchDetails.title?.toLowerCase().trim())
    );

    if (!matchSubject) {
      for (const bKey of Object.keys(subjectsData)) {
        for (const sKey of Object.keys((subjectsData as any)[bKey])) {
          const list = (subjectsData as any)[bKey][sKey] || [];
          const found = list.find((s: any) =>
            s.code === decodedQuery ||
            (matchDetails && s.code === matchDetails.code) ||
            s.name.toLowerCase().trim() === decodedQuery.toLowerCase() ||
            (matchDetails && s.name.toLowerCase().trim() === matchDetails.title?.toLowerCase().trim())
          );
          if (found) {
            matchSubject = found;
            break;
          }
        }
        if (matchSubject) break;
      }
    }

    // Fallback subject if details exists but subject didn't
    if (!matchSubject && matchDetails) {
      matchSubject = {
        name: matchDetails.title,
        code: matchDetails.code || matchDetails.vtuCode || 'VTU',
        credits: 4,
        info: matchDetails.description || `${matchDetails.title} VTU Syllabus Course`
      };
    }

    return {
      subject: matchSubject,
      details: matchDetails,
      resolvedStream: foundStream,
      resolvedSem: foundSem
    };
  }, [stream, semester, decodedQuery]);

  // Combine and normalize all modules & question papers
  const allMaterials = useMemo(() => {
    if (!details) return [];
    const mods = (details.modules || []).map((m: any) => ({ ...m, sourceSection: 'modules' }));
    const papers = (details.questionPapers || []).map((p: any) => ({ ...p, sourceSection: 'papers' }));
    
    // Merge without duplicates by id
    const seen = new Set<string>();
    const list: any[] = [];
    for (const item of [...mods, ...papers]) {
      if (item.id && !seen.has(item.id)) {
        seen.add(item.id);
        list.push(item);
      }
    }
    return list;
  }, [details]);

  // Categorize an individual item
  const getItemCategory = (item: any): string => {
    const cat = (item.category || '').toLowerCase();
    const type = (item.type || '').toLowerCase();
    const title = (item.title || '').toLowerCase();

    if (cat === 'question-bank' || type === 'questions' || title.includes('question bank') || title.includes('important q/a') || title.includes('important qa')) {
      return 'bank';
    }
    if (cat === 'solved-qp' || type === 'solutions' || title.includes('solved') || title.includes('solution') || title.includes('answers') || title.includes('mqps')) {
      return 'solved';
    }
    if (type === 'important-questions' || title.includes('important questions') || title.includes('important question')) {
      return 'important';
    }
    if (cat === 'pyq' || cat === 'question-papers' || type === 'paper' || title.includes('question paper') || title.includes('pyq') || title.includes('model qp')) {
      return 'pyq';
    }
    if (cat === 'lab-manual' || title.includes('lab manual') || title.includes('laboratory') || title.includes('lab')) {
      return 'lab';
    }
    return 'notes';
  };

  // Sync saved status with Firestore
  useEffect(() => {
    const checkSaved = async () => {
      if (!user || allMaterials.length === 0) {
        setLoadingSaved(false);
        return;
      }

      const status: Record<string, boolean> = {};
      const promises = allMaterials.map(item =>
        getDoc(doc(db, 'users', user.uid, 'saved_notes', item.id))
          .then(snap => { status[item.id] = snap.exists(); })
          .catch(() => { status[item.id] = false; })
      );

      await Promise.all(promises);
      setSavedStatus(status);
      setLoadingSaved(false);
    };

    checkSaved();
  }, [user, allMaterials]);

  const toggleSave = async (item: any) => {
    if (!user) {
      alert('Please sign in to save materials to your account.');
      return;
    }

    const isSaved = savedStatus[item.id];
    const docRef = doc(db, 'users', user.uid, 'saved_notes', item.id);

    try {
      if (isSaved) {
        await deleteDoc(docRef);
        setSavedStatus(prev => ({ ...prev, [item.id]: false }));
      } else {
        await setDoc(docRef, {
          id: item.id,
          title: item.title,
          url: item.fileUrl || item.previewUrl || '',
          subjectCode: subject?.code || details?.code,
          subjectName: subject?.name || details?.title,
          createdAt: serverTimestamp()
        });
        setSavedStatus(prev => ({ ...prev, [item.id]: true }));
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  // Filtered materials
  const filteredMaterials = useMemo(() => {
    return allMaterials.filter(item => {
      const cat = getItemCategory(item);
      const matchesCategory = activeCategory === 'all' || cat === activeCategory;
      const matchesSearch = !moduleSearch.trim() || 
        item.title?.toLowerCase().includes(moduleSearch.toLowerCase()) ||
        item.description?.toLowerCase().includes(moduleSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allMaterials, activeCategory, moduleSearch]);

  // Statistics
  const stats = useMemo(() => {
    let notes = 0, pyq = 0, solved = 0, bank = 0, important = 0, lab = 0;
    for (const item of allMaterials) {
      const cat = getItemCategory(item);
      if (cat === 'notes') notes++;
      else if (cat === 'pyq') pyq++;
      else if (cat === 'solved') solved++;
      else if (cat === 'bank') bank++;
      else if (cat === 'important') important++;
      else if (cat === 'lab') lab++;
    }
    return { total: allMaterials.length, notes, pyq, solved, bank, important, lab };
  }, [allMaterials]);

  const handleOpenPdf = (item: any) => {
    const rawUrl = item.previewUrl || item.fileUrl || item.id;
    navigate(`/pdf/${encodeURIComponent(rawUrl)}`);
  };

  if (!details && !subject) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-4 text-zinc-500">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-100">Subject Not Found</h2>
        <p className="mt-2 text-sm text-zinc-400">
          We could not find modules for "{decodedQuery}". Please browse the available subjects from the catalog.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-md transition-all"
        >
          <ChevronLeft className="h-4 w-4 mr-1.5" /> Back to Subjects
        </Link>
      </div>
    );
  }

  const subjectTitle = details?.title || subject?.name;
  const subjectCode = details?.code || details?.vtuCode || subject?.code;

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link & Breadcrumbs */}
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center text-xs sm:text-sm font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to All Subjects
          </Link>
          <span className="text-xs text-zinc-500 font-mono">
            {resolvedStream.toUpperCase()} • Sem {resolvedSem}
          </span>
        </div>

        {/* Hero Banner */}
        <div className="relative bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {subjectCode}
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                  {subject?.credits || 4} Credits
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {stats.total} Official VTU Files
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight leading-tight">
                {subjectTitle}
              </h1>

              {subject?.info && (
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-xl">
                  {subject.info}
                </p>
              )}
            </div>

            {/* Quick Share Subject Button */}
            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => setShareDoc({
                  title: `${subjectTitle} (${subjectCode}) Notes`,
                  url: window.location.href,
                  subtitle: `VTU Official Module Notes & Question Papers`
                })}
                className="inline-flex items-center px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs sm:text-sm font-bold rounded-2xl border border-zinc-700/50 transition-colors shadow-sm"
              >
                <Share2 className="h-4 w-4 mr-2 text-zinc-400" />
                Share Subject
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mt-8 pt-6 border-t border-zinc-800/80">
            <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-2xl p-3 text-center">
              <p className="text-xl font-bold text-zinc-100">{stats.total}</p>
              <p className="text-xs text-zinc-500 mt-0.5">Total Materials</p>
            </div>
            <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-2xl p-3 text-center">
              <p className="text-xl font-bold text-blue-400">{stats.notes}</p>
              <p className="text-xs text-zinc-500 mt-0.5">Module Notes</p>
            </div>
            <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-2xl p-3 text-center">
              <p className="text-xl font-bold text-amber-400">{stats.pyq}</p>
              <p className="text-xs text-zinc-500 mt-0.5">Question Papers</p>
            </div>
            <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-2xl p-3 text-center">
              <p className="text-xl font-bold text-emerald-400">{stats.solved}</p>
              <p className="text-xs text-zinc-500 mt-0.5">Solved Papers</p>
            </div>
            <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-2xl p-3 text-center col-span-2 sm:col-span-1">
              <p className="text-xl font-bold text-purple-400">{stats.bank + stats.important}</p>
              <p className="text-xs text-zinc-500 mt-0.5">Question Banks</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                All Materials ({stats.total})
              </button>

              {stats.notes > 0 && (
                <button
                  onClick={() => setActiveCategory('notes')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeCategory === 'notes'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Notes ({stats.notes})
                </button>
              )}

              {stats.pyq > 0 && (
                <button
                  onClick={() => setActiveCategory('pyq')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeCategory === 'pyq'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  <FileQuestion className="h-3.5 w-3.5" />
                  Exam Papers ({stats.pyq})
                </button>
              )}

              {stats.solved > 0 && (
                <button
                  onClick={() => setActiveCategory('solved')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeCategory === 'solved'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Solved Answers ({stats.solved})
                </button>
              )}

              {stats.bank > 0 && (
                <button
                  onClick={() => setActiveCategory('bank')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeCategory === 'bank'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  Question Bank ({stats.bank})
                </button>
              )}

              {stats.lab > 0 && (
                <button
                  onClick={() => setActiveCategory('lab')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeCategory === 'lab'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  Lab Manuals ({stats.lab})
                </button>
              )}
            </div>

            {/* Quick search input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search modules..."
                value={moduleSearch}
                onChange={(e) => setModuleSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>
        </div>

        {/* Modules List Grid */}
        <div className="space-y-4">
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((item: any) => {
              const cat = getItemCategory(item);
              const downloadUrl = buildDownloadUrl(item.fileUrl || item.previewUrl || '');
              const isSaved = Boolean(savedStatus[item.id]);

              return (
                <div
                  key={item.id}
                  className="bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all hover:bg-zinc-900/80 flex flex-col lg:flex-row lg:items-center justify-between gap-5 group shadow-md"
                >
                  {/* Left: Icon and info */}
                  <div className="flex items-start space-x-4 sm:space-x-5 flex-1 min-w-0">
                    <div className="bg-zinc-800/90 p-3 sm:p-3.5 rounded-2xl group-hover:bg-blue-500/10 transition-colors border border-zinc-700/50 shrink-0">
                      {cat === 'bank' && <HelpCircle className="h-6 w-6 text-purple-400" />}
                      {cat === 'solved' && <CheckCircle2 className="h-6 w-6 text-emerald-400" />}
                      {cat === 'pyq' && <FileQuestion className="h-6 w-6 text-amber-400" />}
                      {cat === 'lab' && <Layers className="h-6 w-6 text-cyan-400" />}
                      {cat === 'notes' && <FileText className="h-6 w-6 text-blue-400" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {item.essential && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-red-500/15 text-red-400 border border-red-500/30">
                            ESSENTIAL
                          </span>
                        )}

                        <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${
                          cat === 'bank' ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' :
                          cat === 'solved' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' :
                          cat === 'pyq' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                          cat === 'lab' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' :
                          'bg-blue-500/10 text-blue-300 border-blue-500/20'
                        }`}>
                          {cat === 'bank' ? 'Question Bank' :
                           cat === 'solved' ? 'Solved Paper' :
                           cat === 'pyq' ? 'Model Exam Paper' :
                           cat === 'lab' ? 'Lab Manual' : 'Syllabus Notes'}
                        </span>

                        {item.fileSize && item.fileSize !== '—' && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-400 bg-zinc-800/80 border border-zinc-700/50">
                            {item.fileSize} MB
                          </span>
                        )}

                        {item.uploadedDate && (
                          <span className="text-[11px] text-zinc-500">
                            Updated {item.uploadedDate}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-blue-400 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end shrink-0 pt-3 lg:pt-0 border-t border-zinc-800/80 lg:border-0">
                    {/* Bookmark */}
                    <button
                      onClick={() => toggleSave(item)}
                      className="p-2.5 text-zinc-500 hover:text-blue-400 hover:bg-zinc-800 rounded-xl transition-colors bg-zinc-900/50 border border-zinc-800"
                      title={isSaved ? "Remove from saved notes" : "Save for offline study"}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="h-4 w-4 text-blue-400" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>

                    {/* Preview / Read Button -> Opens Authentic PdfViewer */}
                    <button
                      onClick={() => handleOpenPdf(item)}
                      className="inline-flex items-center px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all space-x-1.5 cursor-pointer"
                      title="Read full authentic VTU PDF document"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview / Read</span>
                    </button>

                    {/* Direct Download */}
                    {downloadUrl && (
                      <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3.5 py-2.5 border border-zinc-700 text-xs sm:text-sm font-bold rounded-xl shadow-sm text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-white transition-all space-x-1.5"
                        title="Direct Download PDF"
                      >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Download</span>
                      </a>
                    )}

                    {/* Share */}
                    <button
                      onClick={() => setShareDoc({
                        title: `${subjectTitle} - ${item.title}`,
                        url: `${window.location.origin}/pdf/${encodeURIComponent(item.previewUrl || item.fileUrl || item.id)}`,
                        subtitle: `${subjectCode} VTU Material`
                      })}
                      className="p-2.5 text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 rounded-xl transition-colors bg-zinc-900/50 border border-zinc-800"
                      title="Share Material"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800 backdrop-blur-sm">
              <FileText className="mx-auto h-12 w-12 text-zinc-700" />
              <h3 className="mt-4 text-base font-bold text-zinc-300">No materials found in this category</h3>
              <p className="mt-2 text-sm text-zinc-500">Try choosing a different filter tab or clearing your search.</p>
            </div>
          )}
        </div>

      </div>

      {/* Share Modal */}
      {shareDoc && (
        <ShareModal
          isOpen={true}
          title={shareDoc.title}
          subtitle={shareDoc.subtitle}
          url={shareDoc.url}
          onClose={() => setShareDoc(null)}
        />
      )}
    </div>
  );
}
