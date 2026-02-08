import { Waves } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { label: "AI Summarizer", href: "/", path: "/" },
    {
      label: "Chat with Document",
      href: "/chat-with-document",
      path: "/chat-with-document",
    },
    { label: "Audio to Transcribe", href: "#audio", path: "/audio" },
    { label: "Video to Transcribe", href: "#video", path: "/video" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d1b2a] border-b border-gray-800/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold text-white"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Waves className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span>United AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                    isActive
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
