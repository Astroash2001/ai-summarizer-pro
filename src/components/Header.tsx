import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-xl font-bold text-foreground">
            <span className="text-primary">UNITE</span>.AI
          </a>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-card border-b border-border animate-fade-in">
          <nav className="container-custom py-4">
            <ul className="space-y-4">
              <li><a href="#features" className="block text-muted-foreground hover:text-primary transition-colors">Features</a></li>
              <li><a href="#security" className="block text-muted-foreground hover:text-primary transition-colors">Security</a></li>
              <li><a href="#how-to" className="block text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#faq" className="block text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
