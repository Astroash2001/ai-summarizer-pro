import { Shield, Lock, FileText, Code } from "lucide-react";

const securityItems = [
  { icon: <Shield className="w-12 h-12" />, label: "SECURE" },
  { icon: <Lock className="w-12 h-12" />, label: "ENCRYPTED" },
  { icon: <FileText className="w-12 h-12" />, label: "PDF" },
  { icon: <Code className="w-12 h-12" />, label: "HTML" },
];

const SecuritySection = () => {
  return (
    <section id="security" className="section-padding bg-card">
      <div className="container-custom text-center">
        <h2 className="heading-2 mb-6">Your file security and privacy are guaranteed.</h2>
        <p className="text-body max-w-3xl mx-auto mb-12">
          We prioritize the confidentiality of your data. With advanced security measures in place, 
          your uploaded files are kept secure. We value your privacy, and you can trust that your 
          documents remain private throughout the summarization process.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          {securityItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
