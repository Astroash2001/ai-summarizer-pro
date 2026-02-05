import { FileText, ThumbsUp, Clock } from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  heading: string;
  text: string;
}

const featuresSet1: FeatureCard[] = [
  {
    icon: <FileText className="w-8 h-8 text-icon-blue" />,
    heading: "Text AI Summarize Documents",
    text: "Summarize lengthy documents with our advanced AI summarizer. Our AI tool condenses complex texts into concise summaries, saving you time and effort. Whether it's a research paper, article, or report, our summarizer extracts key points and delivers a comprehensive overview. Experience the power of AI summarization for efficient information processing."
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-icon-blue" />,
    heading: "Easy Copy PDF Summarization",
    text: "Summarize PDF documents effortlessly with our PDF summarizer. Our advanced tool extracts key information from PDF files, condensing them into concise summaries. Save time and get the main points without reading the entire document. Try our PDF summarizer for quick and efficient document analysis."
  },
  {
    icon: <Clock className="w-8 h-8 text-icon-blue" />,
    heading: "Easy Scheduling Tool No Signup",
    text: "Summarize your text in seconds with our easy text summarization tool. No signup required! Simply paste your text, and our AI-powered summarizer will generate a concise summary instantly. Save time and get the main points without reading lengthy documents. Try our free text summarizer now!"
  }
];

const featuresSet2: FeatureCard[] = [
  {
    icon: <FileText className="w-8 h-8 text-icon-blue" />,
    heading: "Text AI Summarize Documents",
    text: "Summarize text effortlessly with our advanced AI-powered tool. Our text summarizer condenses lengthy content into concise summaries, saving you time and effort. Whether it's an article, blog post, or document, our AI analyzes the text and extracts key information. Experience the convenience of automated text summarization for efficient information processing."
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-icon-blue" />,
    heading: "Easy Copy PDF Summarization",
    text: "Summarize PDF documents effortlessly with our advanced AI-powered tool. Our PDF summarizer condenses lengthy files into concise summaries, saving you time and effort. Simply upload your PDF, and our AI extracts key information, delivering a comprehensive overview. Experience efficient document processing with our PDF summarization tool."
  },
  {
    icon: <Clock className="w-8 h-8 text-icon-blue" />,
    heading: "Easy Scheduling Tool No Signup",
    text: "Summarize your text in seconds with our easy text summarization tool. No signup required! Simply paste your text, and our AI-powered summarizer will generate a concise summary instantly. Save time and get the main points without reading lengthy documents. Try our free text summarizer now!"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-background">
      <div className="container-custom">
        {/* First Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuresSet1.map((feature, index) => (
            <div key={index} className="card-feature">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="heading-3 mb-4">{feature.heading}</h3>
              <p className="text-body text-sm">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Second Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresSet2.map((feature, index) => (
            <div key={index} className="card-feature">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="heading-3 mb-4">{feature.heading}</h3>
              <p className="text-body text-sm">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
