import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, AlertCircle, Share2, Printer, 
  Upload, Check, Heart, ExternalLink, Phone, Mail, FileText, ArrowRight, X, Sparkles,
  Edit3, RotateCcw, Eye, EyeOff, Save
} from 'lucide-react';
import { 
  SECTIONS_TIMETABLES, 
  PHYSICS_SECTIONS, 
  CHEMISTRY_SECTIONS, 
  TIME_SLOTS, 
  SUBJECT_MAP_LINKS,
  SectionTimetable,
  DaySchedule
} from '../data/timetableData';
import ShareModal from '../components/ShareModal';

export default function Timetable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSec = searchParams.get('sec') || searchParams.get('section');
  
  // Default section precedence: URL param -> localStorage -> 'Q' (user's section)
  const [savedSection, setSavedSection] = useState<string>(() => {
    return localStorage.getItem('vtu_my_section') || 'Q';
  });

  const initialSection = (urlSec && SECTIONS_TIMETABLES[urlSec.toUpperCase()]) 
    ? urlSec.toUpperCase() 
    : savedSection;

  const [currentSection, setCurrentSection] = useState<string>(initialSection);
  const [activeCycle, setActiveCycle] = useState<'physics' | 'chemistry'>(
    PHYSICS_SECTIONS.includes(initialSection) ? 'physics' : 'chemistry'
  );

  // Custom timetable upload state
  const [uploadedTimetable, setUploadedTimetable] = useState<{ url: string; name: string; date: string; isPdf?: boolean } | null>(() => {
    const cached = localStorage.getItem('vtu_custom_timetable');
    return cached ? JSON.parse(cached) : null;
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFilePreview, setShowFilePreview] = useState(true);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // User customized schedule overrides
  const [customSchedules, setCustomSchedules] = useState<Record<string, DaySchedule[]>>(() => {
    try {
      const stored = localStorage.getItem('vtu_custom_schedules');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Interactive editing mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSlot, setEditingSlot] = useState<{ day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI'; periodKey: keyof DaySchedule; currentVal: string } | null>(null);
  const [slotValueInput, setSlotValueInput] = useState('');

  // Share modal state
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [justSavedDefault, setJustSavedDefault] = useState(false);

  const timetableRef = useRef<HTMLDivElement>(null);

  // Sync state if URL changes
  useEffect(() => {
    if (urlSec && SECTIONS_TIMETABLES[urlSec.toUpperCase()]) {
      const sec = urlSec.toUpperCase();
      setCurrentSection(sec);
      setActiveCycle(PHYSICS_SECTIONS.includes(sec) ? 'physics' : 'chemistry');
    }
  }, [urlSec]);

  const handleSelectSection = (sec: string) => {
    setCurrentSection(sec);
    setSearchParams({ section: sec });
    if (PHYSICS_SECTIONS.includes(sec)) {
      setActiveCycle('physics');
    } else {
      setActiveCycle('chemistry');
    }
  };

  const handleSetDefault = () => {
    localStorage.setItem('vtu_my_section', currentSection);
    setSavedSection(currentSection);
    setJustSavedDefault(true);
    setTimeout(() => setJustSavedDefault(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCustomUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    try {
      const isPdf = uploadFile.name.toLowerCase().endsWith('.pdf') || uploadFile.type === 'application/pdf';
      let finalUrl = '';

      const reader = new FileReader();
      finalUrl = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(uploadFile);
      });

      const customData = {
        url: finalUrl,
        name: uploadFile.name,
        date: new Date().toLocaleDateString(),
        isPdf
      };

      setUploadedTimetable(customData);
      localStorage.setItem('vtu_custom_timetable', JSON.stringify(customData));
      setShowUploadModal(false);
      setUploadFile(null);
      setShowFilePreview(true);
    } catch (err) {
      console.error('Error uploading custom timetable:', err);
      alert('Failed to upload timetable file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveSlot = () => {
    if (!editingSlot) return;
    const baseSchedule = customSchedules[currentSection] || SECTIONS_TIMETABLES[currentSection]?.schedule || SECTIONS_TIMETABLES['Q'].schedule;
    const updated = baseSchedule.map(row => {
      if (row.day === editingSlot.day) {
        return {
          ...row,
          [editingSlot.periodKey]: slotValueInput.trim().toUpperCase() || '—'
        };
      }
      return row;
    });

    const newAll = {
      ...customSchedules,
      [currentSection]: updated
    };
    setCustomSchedules(newAll);
    localStorage.setItem('vtu_custom_schedules', JSON.stringify(newAll));
    setEditingSlot(null);
  };

  const handleResetSchedule = () => {
    const newAll = { ...customSchedules };
    delete newAll[currentSection];
    setCustomSchedules(newAll);
    localStorage.setItem('vtu_custom_schedules', JSON.stringify(newAll));
  };

  const currentData: SectionTimetable = SECTIONS_TIMETABLES[currentSection] || SECTIONS_TIMETABLES['Q'];
  const officialData = currentData;
  const activeSchedule: DaySchedule[] = customSchedules[currentSection] || currentData.schedule;
  const isCustomized = Boolean(customSchedules[currentSection]);

  return (
    <div className="py-8 md:py-12 print:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with section notice & quick help */}
        <div className="no-print bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/20 border border-blue-500/30 rounded-3xl p-6 mb-8 backdrop-blur-md relative overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400 shrink-0 border border-blue-500/30 mt-0.5">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-zinc-100">Official Semester Timetable 2026-27</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    Acharya Institute of Technology
                  </span>
                </div>
                <p className="text-zinc-300 text-sm mt-1">
                  Choose your Section (<strong>P-Cycle A to M</strong> or <strong>C-Cycle N to Y</strong>) to view your exact official schedule. 
                  Click any subject pill to open its study material & question papers instantly!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-sm font-semibold border border-zinc-700 transition-all shadow-sm"
              >
                <Upload className="w-4 h-4 text-blue-400" />
                <span>Upload Custom</span>
              </button>

              <button
                onClick={() => setIsShareOpen(true)}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)]"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Section {currentSection}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Uploaded Custom Timetable Alert & In-Page Viewer (if available) */}
        {uploadedTimetable && (
          <div className="no-print mb-8 bg-zinc-900/80 border border-zinc-800 rounded-3xl p-5 shadow-xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-bold text-zinc-100">{uploadedTimetable.name}</p>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Uploaded File
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">Uploaded on {uploadedTimetable.date} • Interactive Preview Active</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFilePreview(!showFilePreview)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-bold border border-zinc-700 transition-all"
                >
                  {showFilePreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showFilePreview ? 'Collapse Preview' : 'Show Preview'}</span>
                </button>
                <a
                  href={uploadedTimetable.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => {
                    localStorage.removeItem('vtu_custom_timetable');
                    setUploadedTimetable(null);
                  }}
                  className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                  title="Remove Uploaded Timetable"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {showFilePreview && (
              <div className="mt-4 rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 flex items-center justify-center min-h-[220px] max-h-[500px]">
                {uploadedTimetable.isPdf ? (
                  <iframe
                    src={uploadedTimetable.url}
                    className="w-full h-[480px] rounded-2xl border-0"
                    title="Uploaded Timetable Document"
                  />
                ) : (
                  <img
                    src={uploadedTimetable.url}
                    alt="Uploaded Timetable"
                    className="max-h-[480px] w-auto max-w-full object-contain mx-auto rounded-xl p-2"
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Cycle & Section Switcher */}
        <div className="no-print bg-zinc-900/70 border border-zinc-800 rounded-3xl p-5 mb-8 backdrop-blur-xl shadow-lg">
          {/* Cycle Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-800/80 pb-4 mb-4 gap-3">
            <div className="flex items-center space-x-2 p-1 bg-zinc-950/80 rounded-2xl border border-zinc-800">
              <button
                onClick={() => {
                  setActiveCycle('chemistry');
                  if (!CHEMISTRY_SECTIONS.includes(currentSection)) {
                    handleSelectSection('Q'); // default to Q
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCycle === 'chemistry'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Chemistry Cycle (Sec N - Y)
              </button>
              <button
                onClick={() => {
                  setActiveCycle('physics');
                  if (!PHYSICS_SECTIONS.includes(currentSection)) {
                    handleSelectSection('A'); // default to A
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCycle === 'physics'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Physics Cycle (Sec A - M)
              </button>
            </div>

            {/* Timetable Interactive Customizer Toolbar */}
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isEditMode
                    ? 'bg-amber-500 text-zinc-950 font-black shadow-lg ring-2 ring-amber-400'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
                }`}
                title="Click any period in the table to edit its subject, lab, or timings"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditMode ? 'Done Editing' : 'Customize Periods'}</span>
              </button>

              {isCustomized && (
                <button
                  onClick={handleResetSchedule}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800/90 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-xl text-xs font-bold border border-zinc-700 transition-all"
                  title="Revert Section to Official Institute Schedule"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>
              )}

              <button
                onClick={handleSetDefault}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  savedSection === currentSection
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
                }`}
                title="Set as my default section"
              >
                {justSavedDefault ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Saved Default!</span>
                  </>
                ) : savedSection === currentSection ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>My Section</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-3.5 h-3.5" />
                    <span>Set as My Section</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Section Pills Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Select Section ({activeCycle === 'physics' ? 'Physics Cycle: 13 Sections' : 'Chemistry Cycle: 12 Sections'})
              </span>
              <span className="text-xs text-zinc-500">
                User Section Q, E, P, A, etc.
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {(activeCycle === 'physics' ? PHYSICS_SECTIONS : CHEMISTRY_SECTIONS).map((sec) => {
                const secInfo = SECTIONS_TIMETABLES[sec];
                const isSelected = currentSection === sec;
                const isMySection = savedSection === sec;

                return (
                  <button
                    key={sec}
                    onClick={() => handleSelectSection(sec)}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all relative ${
                      isSelected
                        ? 'bg-blue-600 text-white ring-2 ring-blue-400 shadow-lg scale-105'
                        : 'bg-zinc-950/70 hover:bg-zinc-800 text-zinc-300 border border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <span>Sec {sec}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-blue-800/80 text-blue-100' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {secInfo.branch}
                    </span>
                    {isMySection && (
                      <span className="w-2 h-2 rounded-full bg-amber-400" title="My Section"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timetable Sheet Canvas (Matches exact PDF print & layout) */}
        <div 
          ref={timetableRef}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md print:border-black print:bg-white print:text-black print:shadow-none"
        >
          {/* Institutional Official Header Banner */}
          <div className="bg-gradient-to-r from-blue-950 via-zinc-900 to-indigo-950 border-b border-zinc-800 p-6 text-center relative print:bg-white print:text-black print:border-b-2 print:border-black">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2">
              <div className="text-left">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest print:text-black">
                  Ref: {currentData.documentRef}
                </span>
              </div>
              <div className="no-print flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl text-xs font-bold border border-zinc-700 transition-all"
                  title="Print official timetable sheet"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setIsShareOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600/90 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-zinc-100 uppercase print:text-black">
              ACHARYA INSTITUTE OF TECHNOLOGY
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 print:text-gray-600 font-medium">
              Soldevanahalli, Bengaluru- 560 107
            </p>
            <div className="mt-2 inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-wider print:border-black print:text-black">
              Tentative Time Table for First Semester BE, {currentData.cycleName}
            </div>

            {/* Section Specific Metadata Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-4 border-t border-zinc-800/80 text-left print:border-black">
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 print:bg-gray-100 print:border-black">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Section</span>
                <span className="text-lg font-black text-blue-400 print:text-black">SECTION {currentData.section}</span>
              </div>
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 print:bg-gray-100 print:border-black">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Branch</span>
                <span className="text-base font-bold text-zinc-200 print:text-black">{currentData.branch}</span>
              </div>
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 print:bg-gray-100 print:border-black">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Class Teacher</span>
                <span className="text-sm font-bold text-zinc-200 truncate block print:text-black">{currentData.classTeacher}</span>
              </div>
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 print:bg-gray-100 print:border-black">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Room No</span>
                <span className="text-base font-bold text-zinc-200 print:text-black">{currentData.roomNo}</span>
              </div>
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-zinc-300 border-b border-zinc-800 text-xs font-bold uppercase tracking-wider print:bg-gray-200 print:text-black print:border-black">
                  <th className="px-4 py-4 text-center border-r border-zinc-800 min-w-[70px] print:border-black">
                    DAY
                  </th>
                  <th className="px-3 py-4 text-center border-r border-zinc-800 min-w-[100px] print:border-black">
                    <div className="text-[11px] font-mono">08:45 - 09:40</div>
                  </th>
                  <th className="px-3 py-4 text-center border-r border-zinc-800 min-w-[100px] print:border-black">
                    <div className="text-[11px] font-mono">09:40 - 10:35</div>
                  </th>
                  <th className="px-2 py-4 text-center border-r border-zinc-800 bg-amber-500/10 text-amber-300 min-w-[60px] print:bg-gray-100 print:text-black print:border-black">
                    <div className="text-[10px] tracking-tighter">TEA BREAK<br/>10:35-10:50</div>
                  </th>
                  <th className="px-3 py-4 text-center border-r border-zinc-800 min-w-[100px] print:border-black">
                    <div className="text-[11px] font-mono">10:50 - 11:45</div>
                  </th>
                  <th className="px-3 py-4 text-center border-r border-zinc-800 min-w-[100px] print:border-black">
                    <div className="text-[11px] font-mono">11:45 - 12:40</div>
                  </th>
                  <th className="px-2 py-4 text-center border-r border-zinc-800 bg-emerald-500/10 text-emerald-300 min-w-[70px] print:bg-gray-100 print:text-black print:border-black">
                    <div className="text-[10px] tracking-tighter">LUNCH BREAK<br/>12:40-01:40</div>
                  </th>
                  <th className="px-3 py-4 text-center border-r border-zinc-800 min-w-[100px] print:border-black">
                    <div className="text-[11px] font-mono">01:40 - 02:35</div>
                  </th>
                  <th className="px-3 py-4 text-center border-r border-zinc-800 min-w-[100px] print:border-black">
                    <div className="text-[11px] font-mono">02:35 - 03:30</div>
                  </th>
                  <th className="px-3 py-4 text-center border-r border-zinc-800 min-w-[100px] print:border-black">
                    <div className="text-[11px] font-mono">03:30 - 04:25</div>
                  </th>
                  <th className="px-3 py-4 text-center min-w-[100px] print:border-black">
                    <div className="text-[11px] font-mono">04:25 - 05:20</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeSchedule.map((dayRow, idx) => {
                  return (
                    <tr 
                      key={dayRow.day}
                      className={`border-b border-zinc-800/80 hover:bg-zinc-800/30 transition-colors print:border-black ${
                        idx % 2 === 1 ? 'bg-zinc-950/30' : ''
                      }`}
                    >
                      {/* Day Column */}
                      <td className="px-4 py-4 font-black text-zinc-100 text-center border-r border-zinc-800 bg-zinc-950/60 print:bg-gray-100 print:text-black print:border-black">
                        {dayRow.day}
                      </td>

                      {/* Period 1 */}
                      <td className="p-2 text-center border-r border-zinc-800 print:border-black">
                        <PeriodCell 
                          subject={dayRow.p1} 
                          isEditMode={isEditMode}
                          onEdit={() => {
                            setEditingSlot({ day: dayRow.day, periodKey: 'p1', currentVal: dayRow.p1 });
                            setSlotValueInput(dayRow.p1 === '—' ? '' : dayRow.p1);
                          }}
                        />
                      </td>

                      {/* Period 2 */}
                      <td className="p-2 text-center border-r border-zinc-800 print:border-black">
                        <PeriodCell 
                          subject={dayRow.p2} 
                          isEditMode={isEditMode}
                          onEdit={() => {
                            setEditingSlot({ day: dayRow.day, periodKey: 'p2', currentVal: dayRow.p2 });
                            setSlotValueInput(dayRow.p2 === '—' ? '' : dayRow.p2);
                          }}
                        />
                      </td>

                      {/* Tea Break (across all days) */}
                      {idx === 0 ? (
                        <td 
                          rowSpan={5} 
                          className="px-1 py-4 text-center bg-amber-500/5 text-amber-400 font-bold border-r border-zinc-800 print:border-black print:text-black print:bg-gray-50"
                        >
                          <div className="[writing-mode:vertical-lr] rotate-180 uppercase tracking-widest text-xs mx-auto py-2">
                            TEA BREAK (10:35 - 10:50 AM)
                          </div>
                        </td>
                      ) : null}

                      {/* Period 3 */}
                      <td className="p-2 text-center border-r border-zinc-800 print:border-black">
                        <PeriodCell 
                          subject={dayRow.p3} 
                          isEditMode={isEditMode}
                          onEdit={() => {
                            setEditingSlot({ day: dayRow.day, periodKey: 'p3', currentVal: dayRow.p3 });
                            setSlotValueInput(dayRow.p3 === '—' ? '' : dayRow.p3);
                          }}
                        />
                      </td>

                      {/* Period 4 */}
                      <td className="p-2 text-center border-r border-zinc-800 print:border-black">
                        <PeriodCell 
                          subject={dayRow.p4} 
                          isEditMode={isEditMode}
                          onEdit={() => {
                            setEditingSlot({ day: dayRow.day, periodKey: 'p4', currentVal: dayRow.p4 });
                            setSlotValueInput(dayRow.p4 === '—' ? '' : dayRow.p4);
                          }}
                        />
                      </td>

                      {/* Lunch Break (across all days) */}
                      {idx === 0 ? (
                        <td 
                          rowSpan={5} 
                          className="px-1 py-4 text-center bg-emerald-500/5 text-emerald-400 font-bold border-r border-zinc-800 print:border-black print:text-black print:bg-gray-50"
                        >
                          <div className="[writing-mode:vertical-lr] rotate-180 uppercase tracking-widest text-xs mx-auto py-2">
                            LUNCH BREAK (12:40 PM TO 01:40 PM)
                          </div>
                        </td>
                      ) : null}

                      {/* Period 5 */}
                      <td className="p-2 text-center border-r border-zinc-800 print:border-black">
                        <PeriodCell 
                          subject={dayRow.p5} 
                          isEditMode={isEditMode}
                          onEdit={() => {
                            setEditingSlot({ day: dayRow.day, periodKey: 'p5', currentVal: dayRow.p5 });
                            setSlotValueInput(dayRow.p5 === '—' ? '' : dayRow.p5);
                          }}
                        />
                      </td>

                      {/* Period 6 */}
                      <td className="p-2 text-center border-r border-zinc-800 print:border-black">
                        <PeriodCell 
                          subject={dayRow.p6} 
                          isEditMode={isEditMode}
                          onEdit={() => {
                            setEditingSlot({ day: dayRow.day, periodKey: 'p6', currentVal: dayRow.p6 });
                            setSlotValueInput(dayRow.p6 === '—' ? '' : dayRow.p6);
                          }}
                        />
                      </td>

                      {/* Period 7 */}
                      <td className="p-2 text-center border-r border-zinc-800 print:border-black">
                        <PeriodCell 
                          subject={dayRow.p7} 
                          isEditMode={isEditMode}
                          onEdit={() => {
                            setEditingSlot({ day: dayRow.day, periodKey: 'p7', currentVal: dayRow.p7 });
                            setSlotValueInput(dayRow.p7 === '—' ? '' : dayRow.p7);
                          }}
                        />
                      </td>

                      {/* Period 8 */}
                      <td className="p-2 text-center">
                        <PeriodCell 
                          subject={dayRow.p8} 
                          isEditMode={isEditMode}
                          onEdit={() => {
                            setEditingSlot({ day: dayRow.day, periodKey: 'p8', currentVal: dayRow.p8 });
                            setSlotValueInput(dayRow.p8 === '—' ? '' : dayRow.p8);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Subject & Faculty Information Table (Matches exact bottom section of official PDF) */}
          <div className="p-6 bg-zinc-950/80 border-t border-zinc-800 print:bg-white print:text-black print:border-black">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 mb-4 flex items-center print:text-black">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              Course and Faculty Details (Section {currentData.section})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-zinc-800 rounded-xl overflow-hidden print:border-black">
                <thead className="bg-zinc-900 text-zinc-400 uppercase font-bold border-b border-zinc-800 print:bg-gray-200 print:text-black print:border-black">
                  <tr>
                    <th className="px-3 py-2.5 text-center w-12 border-r border-zinc-800 print:border-black">Sl. No</th>
                    <th className="px-3 py-2.5 w-36 border-r border-zinc-800 print:border-black">Sub. Code</th>
                    <th className="px-4 py-2.5 border-r border-zinc-800 print:border-black">Course Name</th>
                    <th className="px-4 py-2.5 border-r border-zinc-800 print:border-black">Faculty Name</th>
                    <th className="px-3 py-2.5 border-r border-zinc-800 print:border-black">Mobile No.</th>
                    <th className="px-4 py-2.5 print:border-black">Email Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 print:divide-black">
                  {currentData.faculty.map((f) => (
                    <tr key={f.slNo} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-3 py-2 text-center text-zinc-400 font-mono border-r border-zinc-800 print:border-black print:text-black">
                        {f.slNo}
                      </td>
                      <td className="px-3 py-2 font-mono font-bold text-blue-400 border-r border-zinc-800 print:border-black print:text-black">
                        {f.subCode}
                      </td>
                      <td className="px-4 py-2 font-medium text-zinc-200 border-r border-zinc-800 print:border-black print:text-black">
                        {f.subName}
                      </td>
                      <td className="px-4 py-2 font-semibold text-zinc-300 border-r border-zinc-800 print:border-black print:text-black">
                        {f.facultyName}
                      </td>
                      <td className="px-3 py-2 font-mono text-zinc-400 border-r border-zinc-800 print:border-black print:text-black">
                        {f.mobileNo !== '—' && f.mobileNo !== '0' ? (
                          <a href={`tel:${f.mobileNo}`} className="hover:text-blue-400 flex items-center space-x-1">
                            <Phone className="w-3 h-3 text-zinc-500" />
                            <span>{f.mobileNo}</span>
                          </a>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-2 font-mono text-zinc-400 print:border-black print:text-black">
                        {f.email !== '—' && f.email !== '0' ? (
                          <a href={`mailto:${f.email}`} className="hover:text-blue-400 flex items-center space-x-1">
                            <Mail className="w-3 h-3 text-zinc-500" />
                            <span className="truncate">{f.email}</span>
                          </a>
                        ) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Official Signatories Footer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-zinc-800/80 text-center text-xs font-bold text-zinc-400 print:border-black print:text-black">
              <div>
                <p className="border-b border-zinc-800 pb-2 mb-2 print:border-black text-zinc-500 uppercase tracking-wider text-[10px]">Verified By</p>
                <p className="text-zinc-200 print:text-black">Time Table Coordinator</p>
              </div>
              <div>
                <p className="border-b border-zinc-800 pb-2 mb-2 print:border-black text-zinc-500 uppercase tracking-wider text-[10px]">Endorsed By</p>
                <p className="text-zinc-200 print:text-black">Head - First Year Academics</p>
              </div>
              <div>
                <p className="border-b border-zinc-800 pb-2 mb-2 print:border-black text-zinc-500 uppercase tracking-wider text-[10px]">Approved By</p>
                <p className="text-zinc-200 print:text-black">Dean Academics</p>
              </div>
              <div>
                <p className="border-b border-zinc-800 pb-2 mb-2 print:border-black text-zinc-500 uppercase tracking-wider text-[10px]">Authorized By</p>
                <p className="text-zinc-200 print:text-black">Principal</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={`Acharya Institute Timetable - Section ${currentData.section} (${currentData.branch})`}
        url={`/timetable?section=${currentData.section}`}
        subtitle={`${currentData.cycleName} • Class Teacher: ${currentData.classTeacher}`}
      />

      {/* Upload Custom Timetable Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-zinc-100 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-100">Upload Your Section Timetable</h3>
                <p className="text-xs text-zinc-400">Upload a revised PDF or photo of your class schedule</p>
              </div>
            </div>

            <form onSubmit={handleCustomUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  Select Timetable File (PDF, PNG, JPG)
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,image/*"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-zinc-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer bg-zinc-950 border border-zinc-800 rounded-2xl p-2"
                />
              </div>

              <p className="text-xs text-zinc-500">
                Tip: Once uploaded, you can access your section schedule directly alongside the official institute timetable.
              </p>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-zinc-400 hover:text-zinc-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !uploadFile}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)]"
                >
                  {uploading ? 'Uploading...' : 'Save Timetable'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Slot Edit Modal */}
      {editingSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingSlot(null)}
              className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-zinc-100 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
                <Edit3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-100">
                  Edit {editingSlot.day} — Period {editingSlot.periodKey.replace('p', '')}
                </h3>
                <p className="text-xs text-zinc-400">Customize or replace this slot in Section {currentSection}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  Subject / Lab Name
                </label>
                <input
                  type="text"
                  value={slotValueInput}
                  onChange={(e) => setSlotValueInput(e.target.value)}
                  placeholder="e.g. MAT, PHY, CHE LAB, PYTHON, FREE"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-zinc-100 font-bold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              {/* Quick Course Presets */}
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Quick Shortcuts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['MAT', 'PHY', 'CHE', 'AI', 'C PROG', 'PYTHON', 'PHY LAB', 'CHE LAB', 'C PROG LAB', 'CAED LAB', 'IDT', 'FREE'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setSlotValueInput(preset)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-blue-600/30 text-zinc-300 hover:text-blue-300 border border-zinc-700 hover:border-blue-500/40 transition-all"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingSlot(null)}
                  className="px-4 py-2.5 text-sm font-semibold text-zinc-400 hover:text-zinc-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSlot}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] flex items-center space-x-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Slot</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-component for individual period cells
function PeriodCell({ 
  subject, 
  isEditMode, 
  onEdit 
}: { 
  subject: string; 
  isEditMode?: boolean; 
  onEdit?: () => void;
}) {
  const isBlank = !subject || subject === '0' || subject === '-' || subject === '—';

  // Check if subject maps to a known subject route
  const lookupKey = subject?.trim() || '';
  const directLink = !isBlank ? (
    SUBJECT_MAP_LINKS[lookupKey] || 
    SUBJECT_MAP_LINKS[lookupKey.split(' ')[0]] ||
    SUBJECT_MAP_LINKS[lookupKey.replace(' LAB', '')] ||
    SUBJECT_MAP_LINKS[lookupKey.replace(' TH', '')]
  ) : null;

  const isLab = !isBlank && subject.includes('LAB');
  const isSoft = !isBlank && (subject.includes('SOFT') || subject.includes('SKILL') || subject.includes('IDT'));

  const badgeColor = isBlank
    ? 'bg-zinc-950/40 border-zinc-850 text-zinc-600'
    : isLab 
    ? 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20'
    : isSoft
    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
    : 'bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20';

  if (isEditMode) {
    return (
      <button
        onClick={onEdit}
        className="w-full p-2 rounded-xl border border-dashed border-amber-500/60 bg-amber-500/5 hover:bg-amber-500/15 text-center min-h-[52px] flex flex-col items-center justify-center transition-all group cursor-pointer"
        title="Click to edit this slot"
      >
        <span className="font-bold text-xs tracking-tight text-amber-200">
          {isBlank ? '—' : subject}
        </span>
        <span className="text-[9px] text-amber-400 flex items-center space-x-0.5 mt-0.5 opacity-80 group-hover:opacity-100">
          <Edit3 className="w-2.5 h-2.5" />
          <span>Edit</span>
        </span>
      </button>
    );
  }

  if (isBlank) {
    return (
      <div className="flex items-center justify-center min-h-[52px] text-zinc-700 font-mono text-xs select-none">
        —
      </div>
    );
  }

  if (directLink) {
    return (
      <Link
        to={directLink}
        className={`group block p-2 rounded-xl border text-center transition-all hover:scale-105 shadow-sm min-h-[52px] flex flex-col items-center justify-center print:border-black print:bg-white print:text-black ${badgeColor}`}
        title={`Click to open ${subject} notes & question bank`}
      >
        <span className="font-bold text-xs tracking-tight">{subject}</span>
        <span className="text-[9px] text-zinc-500 group-hover:text-blue-400 transition-colors flex items-center space-x-0.5 mt-0.5 print:hidden">
          <span>Notes</span>
          <ArrowRight className="w-2.5 h-2.5" />
        </span>
      </Link>
    );
  }

  return (
    <div className={`p-2 rounded-xl border text-center min-h-[52px] flex items-center justify-center print:border-black print:bg-white print:text-black ${badgeColor}`}>
      <span className="font-bold text-xs tracking-tight">{subject}</span>
    </div>
  );
}
