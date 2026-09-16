import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { User, Book, GraduationCap, Building, Loader2, BookmarkX, ShieldCheck, Share2, AlertCircle, Sparkles } from 'lucide-react';
import ShareModal from '../components/ShareModal';
import { SECTIONS_TIMETABLES } from '../data/timetableData';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<any>(null);
  const [savedNotes, setSavedNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Sharing document state
  const [shareDoc, setShareDoc] = useState<{ title: string; url: string; subtitle?: string } | null>(null);

  const [editForm, setEditForm] = useState({
    collegeId: '',
    college: '',
    branch: '',
    semester: '',
    section: 'Q'
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
      return;
    }

    const fetchProfileData = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile(data);
          setEditForm({
            collegeId: data.collegeId || '',
            college: data.college || '',
            branch: data.branch || '',
            semester: data.semester || '',
            section: data.section || localStorage.getItem('vtu_my_section') || 'Q'
          });
        } else {
          // Defaults if document doesn't exist yet
          const localSection = localStorage.getItem('vtu_my_section') || 'Q';
          setEditForm(prev => ({ ...prev, section: localSection }));
        }

        const notesRef = collection(db, 'users', user.uid, 'saved_notes');
        const notesSnap = await getDocs(query(notesRef));
        setSavedNotes(notesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, authLoading, navigate]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setErrorMessage(null);
    setSaving(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      const updateData = {
        name: user.displayName,
        email: user.email,
        collegeId: user.email, // Automatically use email as the authoritative college ID
        college: editForm.college.trim(),
        branch: editForm.branch.trim(),
        semester: editForm.semester.trim(),
        section: editForm.section.trim(),
        updatedAt: serverTimestamp()
      };

      await setDoc(docRef, updateData, { merge: true });
      
      // Update local storage for preferred timetable section
      if (editForm.section) {
        localStorage.setItem('vtu_my_section', editForm.section);
      }

      setProfile({ ...profile, ...updateData });
      setEditing(false);
    } catch (error) {
      console.error("Error saving profile", error);
      setErrorMessage("Failed to save profile. Ensure you're connected to the network.");
    } finally {
      setSaving(false);
    }
  };

  const removeNote = async (noteId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'saved_notes', noteId));
      setSavedNotes(savedNotes.filter(n => n.id !== noteId));
    } catch (error) {
      console.error("Error removing note", error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="py-12 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Profile Card */}
        <div className="bg-zinc-900/40 rounded-3xl shadow-xl border border-zinc-800 overflow-hidden backdrop-blur-md">
          <div className="bg-zinc-950 px-6 py-12 sm:px-12 text-center text-white relative border-b border-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="mx-auto h-24 w-24 bg-zinc-900 text-blue-400 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-zinc-800 shadow-lg">
                {user.displayName?.charAt(0) || user.email?.charAt(0)}
              </div>
              <h2 className="mt-5 text-3xl font-extrabold text-zinc-100 tracking-tight">{profile?.name || user.displayName}</h2>
              <p className="text-zinc-400 mt-1">{user.email}</p>
              
              <div className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified College Email</span>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-10 sm:px-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-zinc-100">Academic Credentials</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Your student identity and timetable configuration</p>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {errorMessage && (
              <div className="p-4 mb-6 bg-red-950/40 border border-red-800 rounded-2xl flex items-start space-x-3 text-red-200 text-sm">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Verification Error</p>
                  <p className="text-xs text-red-300 mt-1">{errorMessage}</p>
                </div>
              </div>
            )}

            {editing ? (
              <div className="space-y-5">
                {/* Email identity field - Non-editable */}
                <div className="bg-zinc-950/70 p-4 border border-zinc-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-bold text-zinc-200">
                      College Email ID
                    </label>
                    <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">
                      Verified
                    </span>
                  </div>
                  <input
                    type="text"
                    value={user.email || ''}
                    disabled
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-xl outline-none cursor-not-allowed font-semibold"
                  />
                  <p className="text-xs text-zinc-400">
                    Your college email is permanently linked to your profile via Google Sign-In to prevent spam and verify authenticity.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">College / University</label>
                  <input
                    type="text"
                    value={editForm.college}
                    onChange={e => setEditForm({...editForm, college: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                    placeholder="e.g. Acharya Institute of Technology"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Branch</label>
                    <input
                      type="text"
                      value={editForm.branch}
                      onChange={e => setEditForm({...editForm, branch: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                      placeholder="e.g. CSE / AIML"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Semester</label>
                    <input
                      type="text"
                      value={editForm.semester}
                      onChange={e => setEditForm({...editForm, semester: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                      placeholder="e.g. 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">My Section</label>
                    <select
                      value={editForm.section}
                      onChange={e => setEditForm({...editForm, section: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-semibold"
                    >
                      {Object.keys(SECTIONS_TIMETABLES).map(sec => (
                        <option key={sec} value={sec}>
                          Section {sec} ({SECTIONS_TIMETABLES[sec].branch})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    onClick={() => {
                      setEditing(false);
                      setErrorMessage(null);
                      setEditForm({
                        collegeId: profile?.collegeId || '',
                        college: profile?.college || '',
                        branch: profile?.branch || '',
                        semester: profile?.semester || '',
                        section: profile?.section || 'Q'
                      });
                    }}
                    className="px-5 py-2.5 text-sm font-bold text-zinc-400 hover:text-zinc-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 disabled:opacity-50 flex items-center transition-all shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]"
                  >
                    {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="flex items-center space-x-4 bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-2xl">
                  <div className="bg-zinc-800 p-3 rounded-xl text-emerald-400">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">College ID (USN)</p>
                    <p className="font-mono font-bold text-zinc-100 truncate">{profile?.collegeId || 'Not set'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-2xl">
                  <div className="bg-zinc-800 p-3 rounded-xl text-blue-400">
                    <Building className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">College</p>
                    <p className="font-bold text-zinc-200 truncate">{profile?.college || 'Acharya Institute'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-2xl">
                  <div className="bg-zinc-800 p-3 rounded-xl text-purple-400">
                    <Book className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Branch</p>
                    <p className="font-bold text-zinc-200 truncate">{profile?.branch || 'CSE / AIML'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-2xl">
                  <div className="bg-zinc-800 p-3 rounded-xl text-amber-400">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Section & Sem</p>
                    <p className="font-bold text-zinc-200">
                      Sec {profile?.section || 'Q'} • Sem {profile?.semester || '1'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Saved Notes with 1-Click Share & Open */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-zinc-100">Saved Study Materials</h3>
              <p className="text-xs text-zinc-400 mt-1">Bookmarked modules, question banks, and notes</p>
            </div>
            {savedNotes.length > 0 && (
              <span className="text-xs font-bold px-2.5 py-1 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-full">
                {savedNotes.length} saved
              </span>
            )}
          </div>

          {savedNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {savedNotes.map((note) => (
                <div key={note.id} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between gap-4 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all group">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {note.subjectCode || 'VTU NOTE'}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {note.createdAt?.toDate ? note.createdAt.toDate().toLocaleDateString() : 'SAVED'}
                      </span>
                    </div>
                    <h4 className="font-bold text-zinc-200 group-hover:text-blue-400 transition-colors leading-snug">
                      {note.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/60">
                    <Link 
                      to={note.url?.startsWith('/read/') || note.url?.startsWith('/pdf/') ? note.url : `/pdf/${encodeURIComponent(note.url || '')}`}
                      className="flex-1 text-center px-3 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors shadow-sm"
                    >
                      Read Note (PDF)
                    </Link>

                    {/* 1-Click Share Document Button */}
                    <button
                      onClick={() => setShareDoc({
                        title: note.title,
                        url: note.url || window.location.href,
                        subtitle: `${note.subjectCode || 'VTU'} Notes`
                      })}
                      className="p-2 text-zinc-400 hover:text-blue-400 transition-colors bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800"
                      title="Share PDF Document"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => removeNote(note.id)}
                      className="text-zinc-600 hover:text-red-400 transition-colors p-2 bg-zinc-900 rounded-xl hover:bg-zinc-800 border border-zinc-800"
                      title="Remove saved note"
                    >
                      <BookmarkX className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
              <Book className="mx-auto h-12 w-12 text-zinc-700" />
              <h3 className="mt-4 text-base font-bold text-zinc-300">No saved notes</h3>
              <p className="mt-2 text-sm text-zinc-500 mb-6">
                Save modules and question banks to access and share them anytime.
              </p>
              <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-zinc-100 bg-zinc-800 hover:bg-zinc-700 transition-colors">
                Browse Subjects
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Share Document Modal */}
      {shareDoc && (
        <ShareModal
          isOpen={!!shareDoc}
          onClose={() => setShareDoc(null)}
          title={shareDoc.title}
          url={shareDoc.url}
          subtitle={shareDoc.subtitle}
        />
      )}
    </div>
  );
}
