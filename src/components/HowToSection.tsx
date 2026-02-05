import { Upload, Settings, FileCheck } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-10 h-10 text-icon-blue" />,
    title: "Upload PDF, TXT/DOC, DOCX online or enter URL to summarize",
    description: "To begin, simply upload your PDF, TXT, DOC, or DOCX file to our online platform. Alternatively, you can enter the URL of the document you wish to summarize. Our user-friendly interface ensures a seamless experience, allowing you to quickly access the AI summarization capabilities."
  },
  {
    icon: <Settings className="w-10 h-10 text-icon-blue" />,
    title: "Set Summarize Parameters PDF or Text",
    description: "Once your file is uploaded or URL is entered, you can customize the summarization parameters. Specify whether you want a summary of a PDF or text document. Adjust settings such as summary length, key points extraction, or specific sections to focus on. Tailor the summarization process to meet your specific needs."
  },
  {
    icon: <FileCheck className="w-10 h-10 text-icon-blue" />,
    title: "Get summarized content or key points from uploaded file",
    description: "After setting your preferences, click the 'Summarize' button and let our AI do the work. Within moments, you'll receive a concise summary highlighting the key points and essential information from your document. Review the summary and utilize it for quick reference or further analysis."
  }
];

const HowToSection = () => {
  return (
    <section id="how-to" className="section-padding bg-background">
      <div className="container-custom">
        <h2 className="heading-2 text-center mb-12">How to AI Summarizer Online for Free</h2>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="card-feature flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0 flex items-start justify-center">
                <div className="p-4 bg-secondary rounded-xl">
                  {step.icon}
                </div>
              </div>
              <div>
                <h3 className="heading-3 mb-3">{step.title}</h3>
                <p className="text-body text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-primary">Try Now for Free</button>
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
