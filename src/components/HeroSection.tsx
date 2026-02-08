import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { FolderOpen, Loader2, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { summarizeFile } from "@/services/api";

const HeroSection = () => {
  // State management
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  
  // Hidden file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handle file selection from button click
   */
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  /**
   * Handle drag over event
   */
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  /**
   * Handle drag leave event
   */
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  /**
   * Handle file drop
   */
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  /**
   * Process and upload the selected file
   */
  const processFile = async (file: File) => {
    // Reset previous states
    setError("");
    setSummary("");
    setSelectedFile(file);
    setIsLoading(true);

    try {
      // Call API to summarize file
      const summaryText = await summarizeFile(file);
      
      // Update state with summary
      setSummary(summaryText);
      
    } catch (err) {
      // Handle errors
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setSelectedFile(null);
      
    } finally {
      // Always stop loading
      setIsLoading(false);
    }
  };

  /**
   * Trigger file input click
   */
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Reset everything and start over
   */
  const handleReset = () => {
    setSelectedFile(null);
    setSummary("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="gradient-hero pt-32 pb-20 min-h-[700px] flex flex-col items-center justify-center">
      <div className="container-custom text-center">
        <h1 className="heading-1 mb-6">AI Summarizer</h1>
        <p className="text-body max-w-3xl mx-auto mb-12">
          Summarize PDFs, Audio, Video, Paragraphs, and Texts instantly using AI. Generate summaries from your PDFs online for free.
        </p>
        
        {/* File Upload Area */}
        <div className="max-w-3xl mx-auto mb-8">
          <div 
            className={`bg-gradient-to-br from-cyan-100/90 to-blue-200/80 rounded-3xl p-16 shadow-2xl border-2 backdrop-blur-sm transition-all duration-300 ${
              isDragging 
                ? 'border-cyan-500 scale-105' 
                : 'border-white/20'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-8">
              {/* Icon - changes based on state */}
              <div className="relative">
                {isLoading ? (
                  <Loader2 className="w-32 h-32 text-blue-500 animate-spin" strokeWidth={1.5} />
                ) : summary ? (
                  <CheckCircle2 className="w-32 h-32 text-green-500" strokeWidth={1.5} />
                ) : error ? (
                  <AlertCircle className="w-32 h-32 text-red-500" strokeWidth={1.5} />
                ) : (
                  <FolderOpen className="w-32 h-32 text-blue-400/80" strokeWidth={1} />
                )}
              </div>
              
              {/* Status Text */}
              {selectedFile && !error && (
                <div className="text-gray-700">
                  <FileText className="w-6 h-6 inline mr-2" />
                  <span className="font-medium">{selectedFile.name}</span>
                </div>
              )}
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isLoading}
              />
              
              {/* Choose File Button or Reset */}
              {summary ? (
                <button 
                  onClick={handleReset}
                  className="bg-green-500 hover:bg-green-600 text-white px-12 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Summarize Another File
                </button>
              ) : (
                <button 
                  onClick={handleButtonClick}
                  disabled={isLoading}
                  className={`bg-cyan-400 hover:bg-cyan-500 text-white px-12 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg ${
                    isLoading 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:scale-105'
                  }`}
                >
                  {isLoading ? 'Summarizing...' : 'Choose File'}
                </button>
              )}
              
              {/* Loading or Drag & Drop Text */}
              {isLoading ? (
                <p className="text-gray-700 text-base font-medium animate-pulse">
                  AI is analyzing your document...
                </p>
              ) : (
                <p className="text-gray-600 text-base">
                  or drag & drop the files here
                </p>
              )}
              
              {/* Supported formats */}
              <p className="text-gray-500 text-sm">
                Supports PDF and TXT files (max 10MB)
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-2xl flex items-start gap-3">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="font-semibold mb-1">Upload Failed</h3>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Summary Display */}
        {summary && (
          <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
                <h2 className="text-2xl font-bold text-white">Summary</h2>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap">
                  {summary}
                </p>
              </div>
              
              {/* Copy to Clipboard Button */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => navigator.clipboard.writeText(summary)}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                >
                  Copy Summary
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                >
                  New Summary
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
