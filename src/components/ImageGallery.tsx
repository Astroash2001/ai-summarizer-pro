interface ImageGalleryProps {
  images: { src: string; caption: string }[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const defaultCaption = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <h2 className="heading-2 text-center mb-12">How to AI Summarizer Online for Free</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {images.slice(0, 2).map((image, index) => (
            <div key={index} className="space-y-4">
              <div className="overflow-hidden rounded-xl aspect-video bg-secondary">
                <img 
                  src={image.src} 
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-body text-sm">{image.caption || defaultCaption}</p>
            </div>
          ))}
        </div>

        {images[2] && (
          <div className="max-w-lg mx-auto mt-8 space-y-4">
            <div className="overflow-hidden rounded-xl aspect-video bg-secondary">
              <img 
                src={images[2].src} 
                alt="Gallery image 3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-body text-sm text-center">{images[2].caption || defaultCaption}</p>
          </div>
        )}

        <div className="text-center mt-12">
          <button className="btn-primary">Try Now for Free</button>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
