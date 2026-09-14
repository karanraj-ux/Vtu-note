import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { ChevronLeft, FileText, Download, Bookmark, BookmarkCheck, Loader2, Eye } from 'lucide-react';
import { subjectsData } from '../data/subjectsData';
import { moduleDetails } from '../data/moduleDetails';

export default function SubjectView() {
  const { year, sem, subjectCode } = useParams<{ year: string; sem: string; subjectCode: string }>();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'modules' | 'papers'>('modules');
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const currentSemSubjects = (subjectsData[year as keyof typeof subjectsData] as any)?.[sem as string] || [];
  const subject = currentSemSubjects.find((s: any) => s.code === subjectCode);
  
  const currentSemDetails = (moduleDetails[year as keyof typeof moduleDetails] as any)?.[sem as string] || [];
  const details = currentSemDetails.find((d: any) => d.code === subjectCode);

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!user || !details) {
        setLoading(false);
        return;
      }

      const status: Record<string, boolean> = {};
      const promises = [];

      if (details.modules) {
        for (const mod of details.modules) {
          const promise = getDoc(doc(db, 'users', user.uid, 'saved_notes', mod.id)).then(docSnap => {
            status[mod.id] = docSnap.exists();
          });
          promises.push(promise);
        }
      }

      if (details.questionPapers) {
        for (const paper of details.questionPapers) {
          const promise = getDoc(doc(db, 'users', user.uid, 'saved_notes', paper.id)).then(docSnap => {
            status[paper.id] = docSnap.exists();
          });
          promises.push(promise);
        }
      }

      await Promise.all(promises);
      setSavedStatus(status);
      setLoading(false);
    };

    checkSavedStatus();
  }, [user, details]);

  const toggleSave = async (item: any) => {
    if (!user) {
      alert('Please sign in to save materials.');
      return;
    }

    const isSaved = savedStatus[item.id];
    const docRef = doc(db, 'users', user.uid, 'saved_notes', item.id);

    try {
      if (isSaved) {
        await deleteDoc(docRef);
        setSavedStatus({ ...savedStatus, [item.id]: false });
      } else {
        await setDoc(docRef, {
          id: item.id,
          title: item.title,
          url: item.fileUrl || item.previewUrl || item.url || '',
          subjectCode,
          subjectName: subject?.name || '',
          createdAt: serverTimestamp()
        });
        setSavedStatus({ ...savedStatus, [item.id]: true });
      }
    } catch (error) {
      console.error("Error saving note", error);
    }
  };

  if (!subject) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-zinc-100">Subject not found</h2>
        <Link to="/" className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300">
          <ChevronLeft className="h-5 w-5 mr-1" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <Link to="/" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-200 mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Subjects
        </Link>

        {/* Subject Header */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 mb-10 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-16 bg-blue-500/5 rounded-full blur-3xl -mr-8 -mt-8"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                {subject.code}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {subject.credits} Credits
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
              {subject.name}
            </h1>
            <p className="mt-4 text-zinc-400 max-w-2xl text-lg leading-relaxed">
              {subject.info}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-zinc-800 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('modules')}
              className={`whitespace-nowrap pb-4 px-2 border-b-2 font-bold text-base transition-colors ${
                activeTab === 'modules'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              }`}
            >
              Study Modules
            </button>
            <button
              onClick={() => setActiveTab('papers')}
              className={`whitespace-nowrap pb-4 px-2 border-b-2 font-bold text-base transition-colors ${
                activeTab === 'papers'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              }`}
            >
              Question Papers
            </button>
          </nav>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === 'modules' && (
              <>
                {details?.modules && details.modules.length > 0 ? (
                  details.modules.map((mod: any) => (
                    <div key={mod.id} className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
                      <div className="flex items-start space-x-5">
                        <div className="bg-zinc-800 p-4 rounded-2xl group-hover:bg-blue-500/10 transition-colors border border-zinc-700/50">
                          <FileText className="h-7 w-7 text-zinc-400 group-hover:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-zinc-200 group-hover:text-blue-400 transition-colors">{mod.title}</h3>
                          <p className="text-sm text-zinc-500 mt-2 line-clamp-2 pr-4">{mod.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 sm:shrink-0 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-zinc-800 sm:border-0 justify-end">
                        <button
                          onClick={() => toggleSave(mod)}
                          className="p-3 text-zinc-500 hover:text-blue-400 hover:bg-zinc-800 rounded-xl transition-colors bg-zinc-900/50 border border-zinc-800"
                          title={savedStatus[mod.id] ? "Remove from saved" : "Save for later"}
                        >
                          {savedStatus[mod.id] ? (
                            <BookmarkCheck className="h-5 w-5 text-blue-400" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </button>
                        {mod.type === 'smart-note' ? (
                          <Link
                            to={mod.fileUrl}
                            className="inline-flex items-center px-6 py-3 border border-blue-500/30 text-sm font-bold rounded-xl shadow-sm text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 focus:outline-none transition-all w-full sm:w-auto justify-center"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Read Note
                          </Link>
                        ) : (
                          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <a
                              href={mod.previewUrl || mod.fileUrl || mod.url || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-6 py-3 border border-zinc-700 text-sm font-bold rounded-xl shadow-sm text-zinc-300 bg-zinc-800 hover:bg-zinc-700 focus:outline-none transition-all w-full sm:w-auto justify-center"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </a>
                            <a
                              href={mod.fileUrl || mod.previewUrl || mod.url || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-500 focus:outline-none transition-all w-full sm:w-auto justify-center"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-24 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800 backdrop-blur-sm">
                    <FileText className="mx-auto h-12 w-12 text-zinc-700" />
                    <h3 className="mt-4 text-base font-bold text-zinc-300">No modules available</h3>
                    <p className="mt-2 text-sm text-zinc-500">Modules for this subject haven't been uploaded yet.</p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'papers' && (
              <>
                {details?.questionPapers && details.questionPapers.length > 0 ? (
                  details.questionPapers.map((paper: any) => (
                    <div key={paper.id} className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
                      <div className="flex items-center space-x-5">
                        <div className="bg-zinc-800 p-4 rounded-2xl group-hover:bg-blue-500/10 transition-colors border border-zinc-700/50">
                          <FileText className="h-7 w-7 text-zinc-400 group-hover:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-200 group-hover:text-blue-400 transition-colors">{paper.title}</h3>
                      </div>
                      <div className="flex items-center space-x-3 sm:shrink-0 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-zinc-800 sm:border-0 justify-end">
                        <button
                          onClick={() => toggleSave(paper)}
                          className="p-3 text-zinc-500 hover:text-blue-400 hover:bg-zinc-800 rounded-xl transition-colors bg-zinc-900/50 border border-zinc-800"
                        >
                          {savedStatus[paper.id] ? (
                            <BookmarkCheck className="h-5 w-5 text-blue-400" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </button>
                        <a
                          href={paper.fileUrl || paper.previewUrl || paper.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 border border-zinc-700 text-sm font-bold rounded-xl text-zinc-200 bg-zinc-800 hover:bg-zinc-700 transition-all w-full sm:w-auto justify-center"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          View Paper
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-24 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800 backdrop-blur-sm">
                    <FileText className="mx-auto h-12 w-12 text-zinc-700" />
                    <h3 className="mt-4 text-base font-bold text-zinc-300">No question papers</h3>
                    <p className="mt-2 text-sm text-zinc-500">Question papers for this subject haven't been uploaded yet.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
