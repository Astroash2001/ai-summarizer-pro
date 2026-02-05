import { FileText, MousePointer } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="gradient-hero pt-32 pb-20 min-h-[600px] flex flex-col items-center justify-center">
      <div className="container-custom text-center">
        <h1 className="heading-1 mb-6">AI Summarizer</h1>
        <p className="text-body max-w-3xl mx-auto mb-12">
          शीर्षक संक्षेपण करें आसानी से किसी भी दस्तावेज़, वीडियो या वेब पेज का सारांश पाएं मुफ़्त और ऑनलाइन
        </p>
        
        {/* Document Upload Illustration */}
        <div className="relative max-w-xs mx-auto mb-8">
          <div className="bg-gradient-to-br from-white/90 to-white/70 rounded-2xl p-8 shadow-2xl shadow-primary/20 animate-float">
            <div className="relative">
              <FileText className="w-24 h-24 mx-auto text-accent" strokeWidth={1.5} />
              <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 shadow-lg">
                <MousePointer className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-lg font-medium text-foreground">Select Document</p>
          <button className="text-primary hover:text-cyan-light transition-colors text-sm font-medium">
            + Add File To Summarize
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
