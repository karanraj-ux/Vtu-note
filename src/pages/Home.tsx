import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Book, GraduationCap, Laptop, Cpu, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { subjectsData } from '../data/subjectsData';
import { moduleDetails } from '../data/moduleDetails';

const STREAMS = [
  { id: 'first-year', label: 'First Year / P-Cycle', icon: GraduationCap, defaultSem: '1', desc: '1st & 2nd Semesters' },
  { id: 'cse', label: 'CSE & ISE Stream', icon: Laptop, defaultSem: '3', desc: '3rd to 7th Semesters' },
  { id: 'ece', label: 'Electronics (ECE)', icon: Cpu, defaultSem: '3', desc: '3rd to 6th Semesters' },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('first-year');
  const [selectedSem, setSelectedSem] = useState('1');

  // Helper to count modules in moduleDetails for a given subject
  const getSubjectModuleCount = (stream: string, sem: string, code: string, name: string) => {
    const list = (moduleDetails as any)[stream]?.[sem] || [];
    const match = list.find((s: any) => 
      s.code === code || 
      (s.title && s.title.toLowerCase().trim() === name.toLowerCase().trim()) ||
      (s.title && s.title.toLowerCase().includes(name.toLowerCase()))
    );
    if (!match) return 0;
    return (match.modules?.length || 0) + (match.questionPapers?.length || 0);
  };

  // When search is active, search globally across all streams and semesters
  const allFlattenedSubjects = useMemo(() => {
    const list: Array<{ stream: string; sem: string; subject: any }> = [];
    for (const st of Object.keys(subjectsData)) {
      const sems = (subjectsData as any)[st];
      for (const s of Object.keys(sems)) {
        for (const sub of sems[s]) {
          list.push({ stream: st, sem: s, subject: sub });
        }
      }
    }
    return list;
  }, []);

  const isGlobalSearch = searchTerm.trim().length > 0;

  const currentSubjects = (subjectsData[selectedYear as keyof typeof subjectsData] as any)?.[selectedSem] || [];

  const displayList = isGlobalSearch
    ? allFlattenedSubjects.filter(({ subject }) =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentSubjects.map((sub: any) => ({ stream: selectedYear, sem: selectedSem, subject: sub }));

  const availableSems = Object.keys((subjectsData as any)[selectedYear] || {});

  return (
    <div className="py-10">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Official VTU Scheme Materials & Notes</span>
          </div>

          <h1 className="text-4xl font-extrabold text-zinc-100 tracking-tight sm:text-6xl mb-6">
            Simplify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">VTU Studies</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed">
            Direct access to genuine VTU module notes, solved model question papers, question banks, and lab manuals organized precisely according to the university syllabus.
          </p>
          
          <div className="mt-8 max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center bg-zinc-900/90 border border-zinc-800 rounded-2xl backdrop-blur-md overflow-hidden focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all shadow-xl">
              <Search className="absolute left-5 h-5 w-5 text-zinc-500" />
              <input
                type="text"
                className="block w-full pl-14 pr-6 py-4 text-base text-zinc-100 placeholder-zinc-500 bg-transparent border-none focus:outline-none focus:ring-0"
                placeholder="Search across all 68+ subjects by name or code (e.g. BCS302, OS, Math)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mr-4 px-2.5 py-1 text-xs text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          {!isGlobalSearch && (
            <div className="w-full md:w-72 shrink-0 space-y-6">
              {/* Stream / Branch Selector */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-3xl p-5 backdrop-blur-sm shadow-sm">
                <h3 className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-3 px-1">
                  Select Stream
                </h3>
                <div className="space-y-2">
                  {STREAMS.map((stream) => {
                    const Icon = stream.icon;
                    const isSelected = selectedYear === stream.id;
                    return (
                      <button
                        key={stream.id}
                        onClick={() => {
                          setSelectedYear(stream.id);
                          setSelectedSem(stream.defaultSem);
                        }}
                        className={`w-full flex items-center p-3 text-left rounded-2xl transition-all ${
                          isSelected 
                            ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30 shadow-sm' 
                            : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent'
                        }`}
                      >
                        <div className={`p-2 rounded-xl mr-3 ${isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-500'}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold truncate">{stream.label}</p>
                          <p className="text-[11px] text-zinc-500">{stream.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Semester Selector */}
                <h3 className="text-xs font-bold text-zinc-500 tracking-widest uppercase mt-6 mb-3 px-1">
                  Semester
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {availableSems.map((sem) => {
                    const isSelected = selectedSem === sem;
                    return (
                      <button
                        key={sem}
                        onClick={() => setSelectedSem(sem)}
                        className={`px-3 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                          isSelected
                            ? 'border-blue-500/40 bg-blue-500/15 text-blue-300 shadow-sm'
                            : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/60 hover:text-zinc-200'
                        }`}
                      >
                        Semester {sem}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Subjects Grid */}
          <div className="flex-1 min-w-0">
            {isGlobalSearch && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-zinc-400">
                  Search results for <span className="text-zinc-100 font-bold">"{searchTerm}"</span> ({displayList.length} subjects found)
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-blue-400 hover:underline"
                >
                  Back to browse
                </button>
              </div>
            )}

            {displayList.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
                {displayList.map(({ stream, sem, subject }) => {
                  const moduleCount = getSubjectModuleCount(stream, sem, subject.code, subject.name);
                  const streamLabel = STREAMS.find(s => s.id === stream)?.label || stream;
                  return (
                    <Link
                      key={`${stream}-${sem}-${subject.code}`}
                      to={`/branch/${stream}/${sem}/modules/${encodeURIComponent(subject.name)}`}
                      className="group relative bg-zinc-900/50 border border-zinc-800/80 hover:border-blue-500/40 rounded-3xl p-6 hover:bg-zinc-900/90 transition-all overflow-hidden flex flex-col justify-between shadow-md"
                    >
                      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/60 transition-all duration-500" />
                      
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-bold text-zinc-100 group-hover:text-blue-400 transition-colors leading-snug">
                              {subject.name}
                            </h4>
                            <div className="mt-2.5 flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                                {subject.code}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {subject.credits} Credits
                              </span>
                              {moduleCount > 0 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  <FileText className="h-3 w-3 mr-1" />
                                  {moduleCount} Official Files
                                </span>
                              )}
                              {isGlobalSearch && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] text-zinc-500 bg-zinc-900 border border-zinc-800">
                                  Sem {sem} • {streamLabel}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="bg-zinc-800/60 p-3 rounded-2xl group-hover:bg-blue-500/10 transition-colors border border-zinc-700/40 group-hover:border-blue-500/30 shrink-0">
                            <Book className="h-5 w-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                          </div>
                        </div>

                        {subject.info && (
                          <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                            {subject.info}
                          </p>
                        )}
                      </div>

                      <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                        <span className="text-zinc-500 font-medium group-hover:text-zinc-400">
                          Module 1-5 notes & question bank
                        </span>
                        <span className="font-bold text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                          View Modules →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-24 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800 backdrop-blur-sm">
                <Book className="mx-auto h-12 w-12 text-zinc-700" />
                <h3 className="mt-4 text-base font-bold text-zinc-300">No subjects found</h3>
                <p className="mt-2 text-sm text-zinc-500 max-w-sm mx-auto">
                  Try adjusting your search query or selecting a different academic semester.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
