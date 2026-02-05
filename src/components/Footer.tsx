import { Linkedin, Twitter, Youtube } from "lucide-react";

const popularLinks = [
  "Chatbot Arena",
  "AI Tools",
  "News & Learning",
  "AI Courses",
  "AI Consulting"
];

const companyLinks = [
  "About",
  "Partner",
  "Careers",
  "Press"
];

const resourceLinks = [
  "Browse Topics",
  "Newsletter",
  "AI Glossary",
  "Best VPNs"
];

const Footer = () => {
  return (
    <footer className="bg-background section-padding border-t border-border">
      <div className="container-custom">
        {/* Logo and Tagline */}
        <div className="text-center mb-12">
          <a href="/" className="text-2xl font-bold text-foreground">
            <span className="text-primary">UNITE</span>.AI
          </a>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Your trusted resource for AI news, tutorials, and tools to stay ahead in the future.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
          <div>
            <h4 className="font-semibold text-foreground mb-4">Popular links</h4>
            <ul className="space-y-3">
              {popularLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Twitter">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="YouTube">
            <Youtube size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-muted-foreground text-sm">
          © 2025 Unite.AI All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
