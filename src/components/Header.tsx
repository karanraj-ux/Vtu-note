import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, LogOut, Calendar, Users, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { PWAInstallButton } from './PWAInstallButton';

export default function Header() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 group">
              <div className="bg-zinc-800 p-2.5 rounded-xl group-hover:bg-zinc-700 transition-colors border border-zinc-700/50 shadow-sm">
                <BookOpen className="h-6 w-6 text-zinc-100" />
              </div>
              <span className="font-bold text-2xl text-zinc-100 tracking-tight">VTU Notes</span>
            </Link>
          </div>

          {/* Unified Big Tools Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 bg-zinc-100 hover:bg-white text-zinc-900 px-4 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 border border-zinc-200"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="hidden sm:inline">Menu</span>
            </button>

            {/* Dropdown Navigation Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] p-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                
                {/* User Profile Section */}
                {user ? (
                  <div className="p-3 mb-2 border-b border-zinc-800">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-zinc-800 transition-colors group">
                      <div className="bg-zinc-800 p-2 rounded-lg group-hover:bg-blue-500/10 group-hover:text-blue-400 text-zinc-400 transition-colors">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-zinc-100 truncate">{user.displayName}</span>
                        <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">View Profile</span>
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className="p-2 mb-2 border-b border-zinc-800">
                    <button
                      onClick={() => { signInWithGoogle(); setIsMenuOpen(false); }}
                      className="w-full flex justify-center items-center px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-bold rounded-xl transition-all border border-zinc-700 shadow-sm"
                    >
                      Sign In with Google
                    </button>
                  </div>
                )}

                {/* Primary Navigation Links */}
                <div className="flex flex-col space-y-1 p-1">
                  <Link to="/timetable" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors font-medium text-sm">
                    <Calendar className="h-5 w-5 text-zinc-400" />
                    <span>My Timetable</span>
                  </Link>

                  <Link to="/community" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors font-medium text-sm">
                    <Users className="h-5 w-5 text-zinc-400" />
                    <span>Community Uploads</span>
                  </Link>
                </div>

                {/* App Installation */}
                <div className="p-2 mt-1">
                  <PWAInstallButton />
                </div>

                {/* Logout Button */}
                {user && (
                  <div className="mt-2 p-2 border-t border-zinc-800">
                    <button
                      onClick={() => { signOut(); setIsMenuOpen(false); }}
                      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors font-medium text-sm"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </header>
  );
}
