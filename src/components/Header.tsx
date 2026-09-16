import { Link } from 'react-router-dom';
import { BookOpen, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { PWAInstallButton } from './PWAInstallButton';

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
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <PWAInstallButton />
            </div>
            
            {user ? (
              <div className="flex items-center space-x-3 sm:space-x-6">
                <Link to="/timetable" className="hidden sm:block text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
                  Timetable
                </Link>
                <Link to="/community" className="hidden sm:block text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
                  Community Feed
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
                <button
                  onClick={signInWithGoogle}
                  className="inline-flex items-center px-4 py-2 border border-zinc-700/50 text-sm font-medium rounded-full shadow-sm text-zinc-100 bg-zinc-800 hover:bg-zinc-700 hover:border-zinc-600 focus:outline-none transition-all"
                >
                  <span className="hidden sm:inline">Sign in with College Gmail</span>
                  <span className="inline sm:hidden">Sign In</span>
                </button>
              </div>
            )}
            
            <div className="block md:hidden">
              <PWAInstallButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
