/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SubjectView from './pages/SubjectView';
import Community from './pages/Community';
import Timetable from './pages/Timetable';
import NoteReader from './pages/NoteReader';
import SgpaCalculator from './pages/SgpaCalculator';
import GitHubDeploy from './pages/GitHubDeploy';

export default function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/community" element={<Community />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/subject/:year/:sem/:subjectCode" element={<SubjectView />} />
            <Route path="/read/:noteId" element={<NoteReader />} />
            <Route path="/sgpa" element={<SgpaCalculator />} />
            <Route path="/deploy" element={<GitHubDeploy />} />
            <Route path="/github-actions" element={<GitHubDeploy />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
