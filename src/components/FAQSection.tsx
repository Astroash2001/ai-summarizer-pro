import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does this AI summarizer work?",
    answer: "Our AI analyzes your document using advanced language processing to identify the most important ideas and key points. It then condenses the content into a clear, easy-to-read summary — helping you understand information faster without losing essential context."
  },
  {
    question: "Can AI summarize a PowerPoint?",
    answer: "Yes, our AI can process PowerPoint presentations and extract key points from slides, providing you with a comprehensive summary of the content."
  },
  {
    question: "How can AI save time when summarizing PDFs?",
    answer: "AI saves time by instantly scanning your PDF and extracting the most important points, so you don't have to read every page manually. Instead of spending minutes or hours reviewing long documents, the AI delivers a concise summary in seconds — helping you understand key information faster and focus on what matters most."
  },
  {
    question: "How accurate are AI summaries?",
    answer: "AI summaries are designed to capture the key points and main ideas from your content with high accuracy. While the AI aims to preserve meaning and context, the quality of the summary depends on the clarity and structure of the original text. For most documents, summaries are reliable and consistent — but we always recommend a quick review for critical or sensitive information."
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
