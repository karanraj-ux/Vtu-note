import { Link } from 'react-router-dom';
import { BookOpen, User, LogOut, Upload, Rocket } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <header className="bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-zinc-800 p-2 rounded-xl group-hover:bg-zinc-700 transition-colors border border-zinc-700/50">
                <BookOpen className="h-5 w-5 text-zinc-100" />
              </div>
              <span className="font-bold text-xl text-zinc-100 tracking-tight">VTU Notes</span>
            </Link>

            <Link 
              to="/deploy" 
              className="hidden md:inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
              title="GitHub Pages & Actions Deployment"
            >
              <Rocket className="h-3.5 w-3.5 text-blue-400" />
              <span>GitHub Actions</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-6">
                <Link to="/sgpa" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
                  SGPA Calc
                </Link>
                <Link to="/timetable" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
                  Timetables
                </Link>
                <Link to="/community" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
                  Community Feed
                </Link>
                <Link to="/deploy" className="md:hidden text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
                  Deploy
                </Link>
                <Link to="/profile" className="flex items-center space-x-2 text-zinc-400 hover:text-zinc-100 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline font-medium text-sm">{user.displayName}</span>
                </Link>
                <button
                  onClick={signOut}
                  className="p-2 text-zinc-500 hover:text-red-400 transition-colors rounded-full hover:bg-zinc-800/50"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/deploy" 
                  className="md:hidden inline-flex items-center text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Deploy
                </Link>
                <button
                  onClick={signInWithGoogle}
                  className="inline-flex items-center px-4 py-2 border border-zinc-700/50 text-sm font-medium rounded-full shadow-sm text-zinc-100 bg-zinc-800 hover:bg-zinc-700 hover:border-zinc-600 focus:outline-none transition-all"
                >
                  Sign in with College Gmail
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
