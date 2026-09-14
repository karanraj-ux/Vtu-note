import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Book, GraduationCap } from 'lucide-react';
import { subjectsData } from '../data/subjectsData';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('first-year');
  const [selectedSem, setSelectedSem] = useState('1');

  const currentSubjects = (subjectsData[selectedYear as keyof typeof subjectsData] as any)?.[selectedSem] || [];
  
  const filteredSubjects = currentSubjects.filter((subject: any) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-zinc-100 tracking-tight sm:text-6xl mb-6">
            Simplify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">VTU Studies</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-zinc-400">
            Access organized notes, previous year question papers, and study materials curated for your syllabus.
          </p>
          
          <div className="mt-10 max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center bg-zinc-900/80 border border-zinc-800 rounded-2xl backdrop-blur-sm overflow-hidden focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
              <Search className="absolute left-5 h-6 w-6 text-zinc-500" />
              <input
                type="text"
                className="block w-full pl-14 pr-6 py-5 text-lg text-zinc-100 placeholder-zinc-500 bg-transparent border-none focus:outline-none focus:ring-0"
                placeholder="Search by subject name or code (e.g. BMATS101)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-72 shrink-0 space-y-8">
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-4">Academic Year</h3>
              <div className="space-y-2">
                {['first-year', 'second-year', 'third-year', 'fourth-year'].map((year) => {
                  const displayNames: any = {
                    'first-year': 'First Year',
                    'second-year': 'Second Year',
                    'third-year': 'Third Year',
                    'fourth-year': 'Fourth Year'
                  };
                  if (!subjectsData[year as keyof typeof subjectsData]) return null;
                  return (
                    <button
                      key={year}
                      onClick={() => { setSelectedYear(year); setSelectedSem('1'); }}
                      className={`w-full flex items-center px-4 py-3.5 text-sm font-bold rounded-xl transition-all ${
                        selectedYear === year ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-zinc-400 hover:bg-zinc-800/50 border border-transparent'
                      }`}
                    >
                      <GraduationCap className={`mr-3 h-5 w-5 ${selectedYear === year ? 'text-blue-400' : 'text-zinc-500'}`} />
                      {displayNames[year] || year}
                    </button>
                  );
                })}
              </div>

              <h3 className="text-xs font-bold text-zinc-500 tracking-widest uppercase mt-8 mb-4">Semester</h3>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
                  const availableSems = Object.keys(subjectsData[selectedYear as keyof typeof subjectsData] || {});
                  if (!availableSems.includes(sem.toString())) return null;
                  return (
                    <button
                      key={sem}
                      onClick={() => setSelectedSem(sem.toString())}
                      className={`px-4 py-3 text-sm font-bold rounded-xl border transition-all ${
                        selectedSem === sem.toString()
                          ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                          : 'border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/50'
                      }`}
                    >
                      Sem {sem}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="flex-1">
            {filteredSubjects.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {filteredSubjects.map((subject: any) => (
                  <Link
                    key={subject.code}
                    to={`/subject/${selectedYear}/${selectedSem}/${encodeURIComponent(subject.code)}`}
                    className="group relative bg-zinc-900/40 border border-zinc-800 rounded-3xl p-7 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all overflow-hidden"
                  >
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/50 transition-all duration-500"></div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="text-xl font-bold text-zinc-100 truncate group-hover:text-blue-400 transition-colors">
                          {subject.name}
                        </h4>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                            {subject.code}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {subject.credits} Credits
                          </span>
                        </div>
                      </div>
                      <div className="bg-zinc-800/50 p-4 rounded-2xl group-hover:bg-blue-500/10 transition-colors border border-zinc-700/50 group-hover:border-blue-500/30">
                        <Book className="h-6 w-6 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                    <p className="mt-5 text-sm text-zinc-400 leading-relaxed line-clamp-2">
                      {subject.info}
                    </p>
                  </Link>
                ))}
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
