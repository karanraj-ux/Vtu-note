import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Award, ChevronDown, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Subject {
  code: string;
  name: string;
  credits: number;
}

interface SyllabusData {
  [branch: string]: {
    [semester: string]: Subject[];
  };
}

export default function SgpaCalculator() {
  const navigate = useNavigate();
  const [syllabusData, setSyllabusData] = useState<SyllabusData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [marks, setMarks] = useState<{ [code: string]: number | '' }>({});

  useEffect(() => {
    fetch('/vtu_2022_syllabus.json')
      .then(res => res.json())
      .then((data: SyllabusData) => {
        setSyllabusData(data);
        const branches = Object.keys(data);
        if (branches.length > 0) {
          setBranch(branches[0]);
          const sems = Object.keys(data[branches[0]]);
          if (sems.length > 0) setSemester(sems[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBranch = e.target.value;
    setBranch(newBranch);
    if (syllabusData) {
      const sems = Object.keys(syllabusData[newBranch] || {});
      if (sems.length > 0) setSemester(sems[0]);
    }
    setMarks({});
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSemester(e.target.value);
    setMarks({});
  };

  const handleMarkChange = (code: string, value: string) => {
    if (value === '') {
      setMarks(prev => ({ ...prev, [code]: '' }));
      return;
    }
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setMarks(prev => ({ ...prev, [code]: num }));
    }
  };

  const getGradePoint = (mark: number | '' | undefined) => {
    if (mark === '' || mark === undefined) return 0;
    const m = Number(mark);
    if (m >= 90) return 10;
    if (m >= 80) return 9;
    if (m >= 70) return 8;
    if (m >= 60) return 7;
    if (m >= 45) return 6;
    if (m >= 40) return 5;
    return 0;
  };

  const getGradeLabel = (mark: number | '' | undefined) => {
    if (mark === '' || mark === undefined) return '-';
    const gp = getGradePoint(mark);
    if (gp === 10) return 'O';
    if (gp === 9) return 'A+';
    if (gp === 8) return 'A';
    if (gp === 7) return 'B+';
    if (gp === 6) return 'B';
    if (gp === 5) return 'C';
    if (gp === 0) return 'F';
    return 'P';
  };

  const subjects = syllabusData?.[branch]?.[semester] || [];
  const totalCredits = subjects.reduce((sum, s) => sum + Number(s.credits), 0);
  
  const totalPoints = subjects.reduce((sum, s) => {
    const m = marks[s.code];
    return sum + (m !== '' && m !== undefined ? getGradePoint(m) * Number(s.credits) : 0);
  }, 0);

  const hasEntry = Object.values(marks).some(m => m !== '');
  const sgpa = (hasEntry && totalCredits > 0) ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  const percentage = hasEntry ? ((parseFloat(sgpa) - 0.75) * 10).toFixed(1) : '0.0';
  const displayPercentage = parseFloat(percentage) > 0 ? percentage : '0.0';

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 rounded-full transition-colors border border-zinc-800"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center">
            <Calculator className="h-8 w-8 mr-3 text-blue-500" />
            SGPA Calculator
          </h1>
          <p className="text-zinc-400 mt-1">2022 Scheme VTU Calculator</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Controls & Subjects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Branch</label>
                <div className="relative">
                  <select 
                    value={branch}
                    onChange={handleBranchChange}
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    {syllabusData && Object.keys(syllabusData).map(b => (
                      <option key={b} value={b}>{b.toUpperCase()}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Semester</label>
                <div className="relative">
                  <select 
                    value={semester}
                    onChange={handleSemesterChange}
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    {syllabusData && branch && syllabusData[branch] && Object.keys(syllabusData[branch]).map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-md">
            <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950">
              <h3 className="font-bold text-white flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-blue-500" />
                Enter Subject Marks
              </h3>
            </div>
            
            <div className="divide-y divide-zinc-800/50">
              {subjects.map((sub, index) => (
                <div key={index} className="p-4 sm:p-6 hover:bg-zinc-800/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-zinc-100">{sub.name}</h4>
                    <p className="text-xs text-zinc-500 mt-1 font-medium">
                      CODE: <span className="text-zinc-400">{sub.code}</span> • CREDITS: <span className="text-blue-400">{sub.credits}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4 shrink-0">
                    <div className="w-24">
                      <input 
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Marks"
                        value={marks[sub.code] === undefined ? '' : marks[sub.code]}
                        onChange={(e) => handleMarkChange(sub.code, e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2 px-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                      />
                    </div>
                    
                    <div className={`w-12 h-10 flex items-center justify-center rounded-xl font-bold text-sm border
                      ${getGradePoint(marks[sub.code]) >= 8 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        getGradePoint(marks[sub.code]) >= 5 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                        marks[sub.code] !== undefined && marks[sub.code] !== '' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-zinc-900 border-zinc-800 text-zinc-600'
                      }
                    `}>
                      {getGradeLabel(marks[sub.code])}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Results Dashboard */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl shadow-2xl">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Award className="h-32 w-32" />
            </div>
            
            <div className="relative z-10">
              <p className="text-blue-300 font-bold tracking-wider text-sm mb-2">YOUR SGPA</p>
              <div className="flex items-baseline space-x-2">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={sgpa}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-6xl font-black text-white tracking-tighter"
                  >
                    {sgpa}
                  </motion.span>
                </AnimatePresence>
                <span className="text-xl font-bold text-blue-400/50">/10</span>
              </div>
              
              <div className="mt-8 pt-8 border-t border-blue-500/20 space-y-4">
                <div>
                  <p className="text-zinc-400 text-xs font-bold tracking-wider mb-1">TOTAL CREDITS</p>
                  <p className="text-xl font-bold text-zinc-200">{totalCredits}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-xs font-bold tracking-wider mb-1">ESTIMATED PERCENTAGE</p>
                  <p className="text-xl font-bold text-green-400">{displayPercentage}%</p>
                </div>
              </div>
            </div>
          </div>
          
          {hasEntry && (
             <motion.button 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               onClick={() => setMarks({})}
               className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl text-zinc-400 font-bold transition-colors"
             >
               Clear All Marks
             </motion.button>
          )}
        </div>
        
      </div>
    </div>
  );
}
