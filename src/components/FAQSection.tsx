import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the best AI for summarizing?",
    answer: "Our AI Summarizer uses advanced natural language processing to provide accurate and concise summaries. It's designed to handle various document types and delivers high-quality results quickly."
  },
  {
    question: "Can AI summarize a PowerPoint?",
    answer: "Yes, our AI can process PowerPoint presentations and extract key points from slides, providing you with a comprehensive summary of the content."
  },
  {
    question: "What is the best AI PDF summarizer?",
    answer: "Our PDF summarizer is one of the most advanced tools available, capable of extracting and condensing information from PDF documents while maintaining context and accuracy."
  },
  {
    question: "Is Gemini AI FREE summarizer online?",
    answer: "Our AI Summarizer offers free online access with powerful summarization capabilities. You can summarize documents, text, and more without any signup required."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container-custom">
        <h2 className="heading-2 text-center mb-12">FAQs about AI Summarizing Using AI</h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card overflow-hidden"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5 [&>svg]:hidden">
                  <span className="flex items-center gap-3 w-full">
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    <span className="flex-1">{faq.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <button className="btn-primary">Try Now for Free</button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
