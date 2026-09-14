import { useState } from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const timetableData = {
  'Section A (Physics)': [
    { day: 'MON', slots: ['PHY', 'MAT', 'IDT', 'IDT', 'LUNCH', 'C PROG', 'C PROG', 'KAN', '-'] },
    { day: 'TUE', slots: ['PHY LAB', 'PHY LAB', 'IEC', 'PHY', 'LUNCH', 'MAT', 'MAT', '-', '-'] },
    { day: 'WED', slots: ['IEC', 'MAT', 'C PROG', 'PHY', 'LUNCH', '-', '-', '-', '-'] },
    { day: 'THU', slots: ['MAT', 'PHY', 'C PROG', 'IEC', 'LUNCH', 'CAED TH', 'CAED TH', 'SOFT SKILL', 'SOFT SKILL'] },
    { day: 'FRI', slots: ['C PROG', 'MAT', 'SOFT SKILL', 'SOFT SKILL', 'LUNCH', 'CAED LAB', 'CAED LAB', 'CAED LAB', '-'] }
  ],
  'Section N (Chemistry)': [
    { day: 'MON', slots: ['AI', 'CHE', 'C SKILL', 'C SKILL', 'LUNCH', 'MAT', 'MAT', 'PYTHON', '-'] },
    { day: 'TUE', slots: ['MAT', 'AI', 'PYTHON', 'IEE', 'LUNCH', 'C SKILL', 'C SKILL', 'IC', '-'] },
    { day: 'WED', slots: ['IEE', 'CHE', 'PYTHON', 'MAT', 'LUNCH', '-', '-', '-', '-'] },
    { day: 'THU', slots: ['CHE', 'AI', 'MAT', 'IEE', 'LUNCH', 'PYTHON', 'PYTHON', '-', '-'] },
    { day: 'FRI', slots: ['CHE LAB', 'CHE LAB', 'IDT', 'IDT', 'LUNCH', 'CHE', 'MAT', '-', '-'] }
  ]
};

const subjectLinks: Record<string, string> = {
  'PHY': `/subject/first-year/1/${encodeURIComponent('BPHYS102/202')}`,
  'MAT': '/subject/first-year/1/BMATS101',
  'CHE': `/subject/first-year/2/${encodeURIComponent('BCHES102/202')}`,
  'AI': '/subject/first-year/1/1BAIA103',
  'IEE': `/subject/first-year/2/${encodeURIComponent('BESCK104/204B')}`,
  'PYTHON': `/subject/first-year/2/${encodeURIComponent('BPLCK105/205B')}`,
  'C PROG': `/subject/first-year/1/${encodeURIComponent('BPOP103/203')}`,
  'C SKILL': '/subject/first-year/1/BENGK106',
  'IC': '/subject/first-year/1/BICOK107',
  'IDT': '/subject/first-year/2/BIDTK258',
  'IEC': '/subject/first-year/1/BESCK104A',
  'SOFT SKILL': '/subject/first-year/1/BSFHK158',
  'KAN': '/subject/first-year/2/BKSKK207',
  'CAED': '/subject/first-year/2/BCEDK203',
};

const times = [
  '08:45 - 09:40',
  '09:40 - 10:35',
  '10:50 - 11:45',
  '11:45 - 12:40',
  '12:40 - 01:40',
  '01:40 - 02:35',
  '02:35 - 03:30',
  '03:30 - 04:25',
  '04:25 - 05:20'
];

export default function Timetable() {
  const [section, setSection] = useState('Section A (Physics)');

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6 mb-8 flex items-start space-x-4 backdrop-blur-sm">
          <AlertCircle className="h-6 w-6 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-blue-100">Interactive Timetable Map</h3>
            <p className="text-blue-200 mt-1">
              Parsed from the Acharya Institute PDF. <strong>Click on any subject</strong> in the timetable to instantly access its question papers and modules!
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight flex items-center">
            <Calendar className="h-8 w-8 mr-3 text-blue-500" />
            Class Schedule
          </h1>
          
          <select 
            className="bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 shadow-sm font-medium outline-none"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            {Object.keys(timetableData).map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>

        <div className="bg-zinc-900/50 rounded-3xl shadow-xl border border-zinc-800 overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-zinc-400">
              <thead className="text-xs uppercase bg-zinc-900/80 border-b border-zinc-800 text-zinc-300">
                <tr>
                  <th className="px-6 py-5 bg-zinc-900 text-center font-bold tracking-wider">Day / Time</th>
                  {times.map((time, idx) => (
                    <th key={idx} className="px-3 py-5 text-center whitespace-nowrap min-w-[120px] font-medium tracking-wider">
                      <div className="flex flex-col items-center">
                        <Clock className="h-4 w-4 mb-1 text-zinc-500" />
                        {time}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetableData[section as keyof typeof timetableData].map((row, idx) => (
                  <tr key={row.day} className={`border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors ${idx === 4 ? 'border-none' : ''}`}>
                    <td className="px-6 py-4 font-bold text-zinc-200 bg-zinc-900/50 text-center border-r border-zinc-800/50">
                      {row.day}
                    </td>
                    {row.slots.map((subject, sIdx) => {
                      if (subject === 'LUNCH') {
                        return (
                          <td key={sIdx} className="px-3 py-4 text-center font-medium bg-zinc-900/30 text-zinc-600 text-xs tracking-widest uppercase">
                            <div className="-rotate-90 md:rotate-0 whitespace-nowrap">LUNCH BREAK</div>
                          </td>
                        );
                      }
                      
                      if (subject === '-') {
                        return (
                          <td key={sIdx} className="px-3 py-4 text-center font-medium text-zinc-800">-</td>
                        );
                      }

                      const targetLink = subjectLinks[subject] || subjectLinks[subject.replace(' LAB', '')] || subjectLinks[subject.replace(' TH', '')];

                      return (
                        <td key={sIdx} className="px-3 py-4 text-center">
                          {targetLink ? (
                            <Link 
                              to={targetLink}
                              className="flex flex-col items-center justify-center p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-sm min-h-[60px] hover:bg-blue-500/20 hover:border-blue-500/40 hover:scale-105 transition-all cursor-pointer group"
                            >
                              <span className="text-center font-bold text-blue-400 group-hover:text-blue-300">{subject}</span>
                            </Link>
                          ) : (
                            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 shadow-sm min-h-[60px]">
                              <span className="text-center font-medium text-zinc-300">{subject}</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
