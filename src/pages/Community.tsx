import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, setDoc, updateDoc, deleteDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { Upload, FileText, Trash2, Edit2, Loader2, Building, AlertCircle, Share2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShareModal from '../components/ShareModal';

export default function Community() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // Share modal state
  const [shareDoc, setShareDoc] = useState<{ title: string; url: string; subtitle?: string } | null>(null);

  useEffect(() => {
    const fetchProfileAndNotes = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const profileData = userDoc.data();
          setProfile(profileData);
          
          let q;
          if (profileData.college) {
            q = query(
              collection(db, 'community_notes'),
              where('college', '==', profileData.college)
            );
          } else {
            q = collection(db, 'community_notes');
          }
          const querySnapshot = await getDocs(q);
          const fetchedNotes: Array<Record<string, any>> = querySnapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data()));
          setNotes(fetchedNotes.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0)));
        }
      } catch (error) {
        console.error("Error fetching community data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileAndNotes();
  }, [user]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle.trim() || !user) return;

    // Anti-spam requirement: College ID / USN verification
    if (!profile?.collegeId) {
      alert('Anti-Spam Verification: Please set your unique College ID (USN) in your Profile before publishing documents.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('document', uploadFile);

      // Upload to our Express backend
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.url) {
        const noteId = Date.now().toString();
        const noteData = {
          title: uploadTitle.trim(),
          fileUrl: data.url,
          uploaderId: user.uid,
          uploaderName: profile?.name || user.displayName || 'Anonymous',
          collegeId: profile.collegeId,
          college: profile?.college || 'Global',
          createdAt: serverTimestamp()
        };
        
        await setDoc(doc(db, 'community_notes', noteId), noteData);
        
        // Optimistic UI update
        setNotes([{ id: noteId, ...noteData, createdAt: { toDate: () => new Date() } }, ...notes]);
        setUploadFile(null);
        setUploadTitle('');
        alert('Document published successfully!');
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Error uploading document.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    try {
      await deleteDoc(doc(db, 'community_notes', noteId));
      setNotes(notes.filter(n => n.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note.');
    }
  };

  const startEdit = (note: any) => {
    setEditingId(note.id);
    setEditTitle(note.title);
  };

  const handleSaveEdit = async (noteId: string) => {
    if (!editTitle.trim()) return;
    try {
      await updateDoc(doc(db, 'community_notes', noteId), {
        title: editTitle.trim()
      });
      setNotes(notes.map(n => n.id === noteId ? { ...n, title: editTitle.trim() } : n));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update title.');
    }
  };

  if (!user) {
    return (
      <div className="py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-zinc-900/50 p-8 rounded-3xl shadow-xl border border-zinc-800 backdrop-blur-md">
          <AlertCircle className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <h2 className="text-xl font-bold text-zinc-100 mb-2">Sign in Required</h2>
          <p className="text-zinc-400">Please sign in to access community notes.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-zinc-100 tracking-tight">Community Feed</h1>
          <p className="text-zinc-400 mt-3 flex items-center justify-center text-lg">
            <Building className="h-5 w-5 mr-2 text-zinc-500" />
            {profile?.college ? `${profile.college} Community` : 'Global Community'}
          </p>
          {!profile?.collegeId && (
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-2xl max-w-md mx-auto text-xs text-blue-300">
              Set your unique <strong>College ID (USN)</strong> in your profile to verify your account and upload study notes.
              <Link to="/profile" className="ml-2 underline font-bold hover:text-white">
                Set USN in Profile &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Central Upload Section */}
        <div className="bg-zinc-900/40 rounded-3xl shadow-xl border border-zinc-800/80 p-8 mb-12 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center justify-center">
              <div className="bg-blue-500/20 p-2 rounded-xl mr-3">
                <Upload className="h-6 w-6 text-blue-400" />
              </div>
              Upload & Share a Document
            </h2>

            {profile?.collegeId ? (
              <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between text-xs text-emerald-300">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Authenticated USN: <strong>{profile.collegeId}</strong></span>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-400">Anti-Spam Protected</span>
              </div>
            ) : (
              <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between text-xs text-amber-300">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Please configure your unique USN before uploading</span>
                </div>
                <Link to="/profile" className="font-bold underline text-amber-200 hover:text-white">
                  Profile
                </Link>
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Document Title</label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-5 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-zinc-100 transition-all"
                  placeholder="e.g. Module 1 Notes - Operating Systems"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">File (PDF, DOCX, TXT)</label>
                <div className="relative">
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="w-full text-sm text-zinc-400 file:mr-5 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20 hover:file:text-blue-300 file:transition-all cursor-pointer bg-zinc-950/50 border border-zinc-800 rounded-xl"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={uploading || !uploadFile || !uploadTitle.trim() || !profile?.collegeId}
                className="w-full flex justify-center items-center px-6 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] cursor-pointer"
              >
                {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Publish to Community'}
              </button>
            </form>
          </div>
        </div>

        {/* Feed Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-zinc-100 mb-4 px-2">Recent Community Uploads</h3>
          {notes.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
              <FileText className="mx-auto h-12 w-12 text-zinc-700 mb-4" />
              <h3 className="text-base font-bold text-zinc-300">No notes yet</h3>
              <p className="text-sm text-zinc-500 mt-1">Be the first to upload a document for {profile?.college || 'the community'}!</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-zinc-700 transition-all hover:bg-zinc-900/80 group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex items-start space-x-5">
                    <div className="bg-zinc-800/50 p-4 rounded-2xl shrink-0 border border-zinc-700/30 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-colors">
                      <FileText className="h-8 w-8 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div>
                      {editingId === note.id ? (
                        <div className="flex items-center space-x-3 mt-1">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-base font-bold text-zinc-100 w-full max-w-xs"
                          />
                          <button onClick={() => handleSaveEdit(note.id)} className="text-sm text-green-400 font-bold hover:text-green-300">Save</button>
                          <button onClick={() => setEditingId(null)} className="text-sm text-zinc-500 font-medium hover:text-zinc-300">Cancel</button>
                        </div>
                      ) : (
                        <h3 className="text-xl font-bold text-zinc-100">{note.title}</h3>
                      )}
                      
                      <div className="flex flex-wrap items-center text-xs text-zinc-400 mt-2 gap-2">
                        <span>Uploaded by <strong className="text-zinc-200 font-medium">{note.uploaderName}</strong></span>
                        {note.collegeId && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold">
                            USN: {note.collegeId}
                          </span>
                        )}
                        <span className="text-zinc-700">•</span>
                        <span>{note.createdAt?.toDate ? note.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 shrink-0 ml-16 md:ml-0">
                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-all"
                    >
                      View Doc
                    </a>

                    {/* Dedicated PDF / Doc Share Button */}
                    <button
                      onClick={() => setShareDoc({
                        title: note.title,
                        url: note.fileUrl,
                        subtitle: `Uploaded by ${note.uploaderName} • USN: ${note.collegeId || 'Verified'}`
                      })}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all"
                      title="Share PDF Document via WhatsApp/Telegram/Link"
                    >
                      <Share2 className="h-4 w-4 text-blue-400" />
                      <span>Share</span>
                    </button>

                    {note.uploaderId === user.uid && editingId !== note.id && (
                      <>
                        <button onClick={() => startEdit(note)} className="p-2 text-zinc-500 hover:text-blue-400 transition-colors rounded-xl hover:bg-zinc-800" title="Edit Title">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(note.id)} className="p-2 text-zinc-500 hover:text-red-400 transition-colors rounded-xl hover:bg-zinc-800" title="Delete Note">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
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
