
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import Documents from "./pages/Documents";
import Chat from "./pages/Chat";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import Ask from "./pages/Ask";
import SignInPage from "./pages/SignInPage";

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        <Route path="/sign-in/*" element={<SignInPage />} />
        
        <Route 
          path="/" 
          element={
            <SignedIn>
              <Documents />
            </SignedIn>
          } 
        />
        
        <Route 
          path="/upload" 
          element={
            <SignedIn>
              <Upload />
            </SignedIn>
          } 
        />
        
        <Route 
          path="/documents" 
          element={
            <SignedIn>
              <Documents />
            </SignedIn>
          } 
        />
        
        <Route 
          path="/chat/:docId" 
          element={
            <SignedIn>
              <Chat />
            </SignedIn>
          } 
        />
        
        <Route 
          path="/history" 
          element={
            <SignedIn>
              <History />
            </SignedIn>
          } 
        />
        
        <Route 
          path="/ask" 
          element={
            <SignedIn>
              <Ask />
            </SignedIn>
          } 
        />
        
        {/* Redirect to sign-in for protected pages when user is not authenticated */}
        <Route 
          path="*" 
          element={
            <SignedOut>
              <Navigate to="/sign-in" replace />
            </SignedOut>
          } 
        />
        
        {/* 404 page for authenticated users */}
        <Route 
          path="*" 
          element={
            <SignedIn>
              <NotFound />
            </SignedIn>
          } 
        />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
