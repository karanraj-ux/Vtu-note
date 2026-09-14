import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { ChevronLeft, Loader2 } from 'lucide-react';

export default function NoteReader() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`/notes/${noteId}.md`);
        if (!res.ok) throw new Error('Note not found');
        const text = await res.text();
        setContent(text);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-sm font-bold text-zinc-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Subject
      </button>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-500/20 p-6 rounded-3xl text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Note Not Found</h2>
          <p className="text-zinc-400">The study material you are looking for is currently unavailable.</p>
        </div>
      ) : (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
          <div className="prose prose-invert prose-blue max-w-none">
            {/* Custom styling for markdown elements since we are not using the full typography plugin to avoid conflicts */}
            <div className="markdown-body text-zinc-300 leading-relaxed space-y-6 
              [&>h1]:text-3xl [&>h1]:font-extrabold [&>h1]:text-white [&>h1]:mb-6 [&>h1]:border-b [&>h1]:border-zinc-800 [&>h1]:pb-4
              [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-zinc-100 [&>h2]:mt-10 [&>h2]:mb-4
              [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-blue-400 [&>h3]:mt-8 [&>h3]:mb-3
              [&>p]:text-base [&>p]:text-zinc-300 [&>p]:leading-7
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul>li]:text-zinc-300
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol>li]:text-zinc-300
              [&>hr]:border-zinc-800 [&>hr]:my-8
              [&_strong]:text-zinc-100 [&_strong]:font-bold
              [&_em]:text-zinc-400 [&_em]:italic
              [&_code]:bg-zinc-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-blue-300 [&_code]:text-sm
            ">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
