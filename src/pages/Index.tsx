import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecuritySection from "@/components/SecuritySection";
import HowToSection from "@/components/HowToSection";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

// Import CTA mockup image
import ctaMockup from "@/assets/cta-mockup.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <SecuritySection />
        <HowToSection />
        <FAQSection />
        <CTABanner mockupImage={ctaMockup} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
