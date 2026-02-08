import { FileText, FileEdit, Download } from "lucide-react";

const steps = [
  {
    number: 1,
    badgeColor: "bg-blue-500",
    icon: <FileText className="w-12 h-12 text-blue-400" strokeWidth={1.5} />,
    title: "Upload PDF, Audio, Video to the AI PDF Summarizer",
    description: "Import your PDF file to the AI PDF Summarizer page by selecting or dragging it."
  },
  {
    number: 2,
    badgeColor: "bg-green-500",
    icon: <FileEdit className="w-12 h-12 text-blue-400" strokeWidth={1.5} />,
    title: "Choose to Summarize PDF or Text",
    description: "Once your PDF is uploaded, select the Summarize function. You will have the option to summarize the entire PDF or specific content. Choose \"The entire PDF\" to generate a summary from your PDF directly, or select \"Specified content\" to summarize any texts."
  },
  {
    number: 3,
    badgeColor: "bg-cyan-400",
    icon: <Download className="w-12 h-12 text-blue-400" strokeWidth={1.5} />,
    title: "Upload PDF, Audio, Video to the AI PDF Summarizer",
    description: "Import your PDF file to the AI PDF Summarizer page by selecting or dragging it."
  }
];

const HowToSection = () => {
  return (
    <section id="how-to" className="section-padding bg-[#0a1628]">
      <div className="container-custom">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          How to AI Summarize Online for Free
        </h2>
        
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 mb-12 items-start">
              {/* Left side - Icon and Number */}
              <div className="flex items-center gap-6 justify-center md:justify-end">
                <div className="flex-shrink-0">
                  {step.icon}
                </div>
                <div className={`w-12 h-12 ${step.badgeColor} rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                  {step.number}
                </div>
              </div>
              
              {/* Right side - Content */}
              <div className="bg-[#0d1f36] rounded-lg p-8">
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white px-12 py-3 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            AI Summarizer free now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
