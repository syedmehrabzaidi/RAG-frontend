
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, FileText, MessageSquare, History } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="font-bold text-lg mr-8">PDF Chat</Link>
        
        <div className="flex gap-4">
          <Link to="/upload">
            <Button variant="ghost" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </Link>
          <Link to="/documents">
            <Button variant="ghost" className="gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </Button>
          </Link>
          <Link to="/history">
            <Button variant="ghost" className="gap-2">
              <History className="h-4 w-4" />
              History
            </Button>
          </Link>

          <Link to="/ask">
            <Button variant="ghost" className="gap-2">
              <History className="h-4 w-4" />
              Ask Question
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

