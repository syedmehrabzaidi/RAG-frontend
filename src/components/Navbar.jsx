
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, FileText, MessageSquare, History } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center">
        <Link to="/" className="font-bold text-xl mr-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          PDF Chat
        </Link>
        
        <div className="flex gap-2">
          <Link to="/upload">
            <Button 
              variant={isActive('/upload') ? "default" : "ghost"} 
              className={`gap-2 ${isActive('/upload') ? 'bg-gradient-to-r from-purple-600 to-blue-500' : ''}`}
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </Link>
          <Link to="/documents">
            <Button 
              variant={isActive('/documents') ? "default" : "ghost"}
              className={`gap-2 ${isActive('/documents') ? 'bg-gradient-to-r from-purple-600 to-blue-500' : ''}`}
            >
              <FileText className="h-4 w-4" />
              Documents
            </Button>
          </Link>
          <Link to="/history">
            <Button 
              variant={isActive('/history') ? "default" : "ghost"}
              className={`gap-2 ${isActive('/history') ? 'bg-gradient-to-r from-purple-600 to-blue-500' : ''}`}
            >
              <History className="h-4 w-4" />
              History
            </Button>
          </Link>
          <Link to="/ask">
            <Button 
              variant={isActive('/ask') ? "default" : "ghost"}
              className={`gap-2 ${isActive('/ask') ? 'bg-gradient-to-r from-purple-600 to-blue-500' : ''}`}
            >
              <MessageSquare className="h-4 w-4" />
              Ask Question
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
