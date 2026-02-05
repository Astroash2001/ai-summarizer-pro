interface CTABannerProps {
  mockupImage?: string;
}

const CTABanner = ({ mockupImage }: CTABannerProps) => {
  return (
    <section className="gradient-cta section-padding overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Easy AI Summarize Tools Process PDF, Batch, Long Text and YouTube Videos
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Summarize PDF, batch, long text, and YouTube videos for free with our easy AI tool. Get concise summaries in seconds!
            </p>
            <button className="btn-cta">Try Now for Free</button>
          </div>
          
          {mockupImage && (
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-2xl"></div>
                <img 
                  src={mockupImage} 
                  alt="AI Summarizer Tool Interface"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
