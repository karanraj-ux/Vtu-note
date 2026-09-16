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
import PdfViewer from './pages/PdfViewer';

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
            
            {/* GitHub VTU-NOTES format routes */}
            <Route path="/branch/:branch" element={<Home />} />
            <Route path="/branch/:branch/:semester" element={<Home />} />
            <Route path="/branch/:branch/:semester/modules/:subjectName" element={<SubjectView />} />
            
            {/* Legacy applet format routes */}
            <Route path="/subject/:year/:sem/:subjectCode" element={<SubjectView />} />
            
            {/* Reading Mode & PDF Viewer */}
            <Route path="/pdf/:pdfUrl" element={<PdfViewer />} />
            <Route path="/read/:noteId" element={<PdfViewer />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
