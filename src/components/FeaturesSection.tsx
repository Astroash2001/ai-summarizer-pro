import { FileText, ThumbsUp, FileType } from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  heading: string;
  text: string;
}

const features: FeatureCard[] = [
  {
    icon: <FileText className="w-16 h-16 text-blue-400" strokeWidth={1.5} />,
    heading: "Use AI to Summarize Documents",
    text: "The best AI text summarizer to extract abstracts, key points, and important information from documents and PDFs."
  },
  {
    icon: <FileType className="w-16 h-16 text-blue-400" strokeWidth={1.5} />,
    heading: "Free Online PDF Summarizer",
    text: "Try HiPDF's AI PDF Summarizer online for free. Just upload your PDF file, and instantly get the summary you need."
  },
  {
    icon: <ThumbsUp className="w-16 h-16 text-blue-400" strokeWidth={1.5} />,
    heading: "Best Summarizing Tool for Everyone",
    text: "Effortlessly summarizes entire PDFs or shortens specific parts. Safe, reliable, and accurate for all users."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-gradient-to-b from-[#1a3a52] to-[#0f1f2e]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#1e2936] rounded-2xl p-8 hover:bg-[#243140] transition-all duration-300">
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-200 mb-4">{feature.heading}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
