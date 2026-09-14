import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, setDoc, collection, query, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { User, Book, GraduationCap, Building, Loader2, BookmarkX } from 'lucide-react';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<any>(null);
  const [savedNotes, setSavedNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [editForm, setEditForm] = useState({
    college: '',
    branch: '',
    semester: ''
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
            college: data.college || '',
            branch: data.branch || '',
            semester: data.semester || ''
          });
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
    setSaving(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        college: editForm.college,
        branch: editForm.branch,
        semester: editForm.semester,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      setProfile({ ...profile, ...editForm });
      setEditing(false);
    } catch (error) {
      console.error("Error saving profile", error);
      alert("Failed to save profile. Ensure you're logged in with your college Gmail.");
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
            </div>
          </div>
          
          <div className="px-6 py-10 sm:px-12">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-zinc-100">Academic Profile</h3>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">College / University</label>
                  <input
                    type="text"
                    value={editForm.college}
                    onChange={e => setEditForm({...editForm, college: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                    placeholder="e.g. RV College of Engineering"
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Branch</label>
                    <input
                      type="text"
                      value={editForm.branch}
                      onChange={e => setEditForm({...editForm, branch: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                      placeholder="e.g. CSE"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Semester</label>
                    <input
                      type="text"
                      value={editForm.semester}
                      onChange={e => setEditForm({...editForm, semester: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                      placeholder="e.g. 5"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    onClick={() => {
                      setEditing(false);
                      setEditForm({
                        college: profile?.college || '',
                        branch: profile?.branch || '',
                        semester: profile?.semester || ''
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4 bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-2xl">
                  <div className="bg-zinc-800 p-3 rounded-xl">
                    <Building className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">College</p>
                    <p className="font-bold text-zinc-200">{profile?.college || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-2xl">
                  <div className="bg-zinc-800 p-3 rounded-xl">
                    <Book className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Branch</p>
                    <p className="font-bold text-zinc-200">{profile?.branch || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-2xl">
                  <div className="bg-zinc-800 p-3 rounded-xl">
                    <GraduationCap className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Semester</p>
                    <p className="font-bold text-zinc-200">{profile?.semester ? `Sem ${profile.semester}` : 'Not set'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Saved Notes */}
        <div>
          <h3 className="text-2xl font-bold text-zinc-100 mb-6">Saved Study Materials</h3>
          {savedNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {savedNotes.map((note) => (
                <div key={note.id} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all group">
                  <div className="pr-4">
                    <h4 className="font-bold text-zinc-200 group-hover:text-blue-400 transition-colors">{note.title}</h4>
                    <p className="text-xs text-zinc-500 mt-2 font-medium tracking-wide">
                      {note.subjectCode} • SAVED ON {note.createdAt?.toDate ? note.createdAt.toDate().toLocaleDateString().toUpperCase() : new Date().toLocaleDateString().toUpperCase()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                    {note.url?.startsWith('/read/') ? (
                      <Link 
                        to={note.url}
                        className="flex-1 sm:flex-none text-center px-4 py-2 text-sm font-bold text-blue-400 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-colors"
                      >
                        Read Note
                      </Link>
                    ) : (
                      <a 
                        href={note.url || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none text-center px-4 py-2 text-sm font-bold text-blue-400 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-colors"
                      >
                        Open File
                      </a>
                    )}
                    <button
                      onClick={() => removeNote(note.id)}
                      className="text-zinc-600 hover:text-red-400 transition-colors p-2 bg-zinc-900 rounded-xl group-hover:bg-zinc-800"
                      title="Remove saved note"
                    >
                      <BookmarkX className="h-5 w-5" />
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
                You haven't saved any study materials yet.
              </p>
              <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-zinc-100 bg-zinc-800 hover:bg-zinc-700 transition-colors">
                Browse Subjects
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
