import { useState, useRef, ChangeEvent } from "react";
import { MessageSquare, Upload, Send, Loader2, FileText, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatWithDocument = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll to bottom of chat
   */
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Extract text from uploaded file
   */
  const handleFileUpload = async (selectedFile: File) => {
    setError("");
    setIsUploading(true);

    // Validate file
    if (!selectedFile.type.includes('pdf') && !selectedFile.type.includes('text')) {
      setError('Please upload a PDF or TXT file');
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Call backend to extract text (you can create a separate endpoint or reuse summarize)
      const response = await fetch('http://localhost:8000/api/extract-text/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setFile(selectedFile);
        setExtractedText(data.text);
        setMessages([
          {
            role: 'assistant',
            content: `I've read your document "${selectedFile.name}". You can now ask me questions about it!`
          }
        ]);
      } else {
        setError(data.error || 'Failed to process document');
      }
    } catch (err) {
      setError('Failed to upload document. Make sure the backend is running.');
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Handle file selection
   */
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  };

  /**
   * Send message and get AI response
   */
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !extractedText) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    
    // Add user message to chat
    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    setMessages(newMessages);
    setIsSending(true);

    try {
      // Send question with document context to backend
      const response = await fetch('http://localhost:8000/api/chat-document/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage,
          context: extractedText,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Add AI response to chat
        setMessages([
          ...newMessages,
          { role: 'assistant', content: data.answer }
        ]);
        scrollToBottom();
      } else {
        setError(data.error || 'Failed to get response');
      }
    } catch (err) {
      setError('Failed to send message. Make sure the backend is running.');
    } finally {
      setIsSending(false);
    }
  };

  /**
   * Handle Enter key press
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Remove document and reset
   */
  const handleRemoveDocument = () => {
    setFile(null);
    setExtractedText("");
    setMessages([]);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="gradient-hero pt-32 pb-20 flex-1">
        <div className="container-custom">
          <h1 className="heading-1 text-center mb-6">Chat with Document</h1>
          <p className="text-body text-center max-w-3xl mx-auto mb-12">
            Upload a document and ask questions about it. AI will answer based on the document content.
          </p>

        <div className="max-w-5xl mx-auto">
          {/* Upload Section */}
          {!file ? (
            <div className="bg-gradient-to-br from-cyan-100/90 to-blue-200/80 rounded-3xl p-16 shadow-2xl border border-white/20 backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  {isUploading ? (
                    <Loader2 className="w-32 h-32 text-blue-500 animate-spin" strokeWidth={1.5} />
                  ) : (
                    <Upload className="w-32 h-32 text-blue-400/80" strokeWidth={1} />
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isUploading}
                />

                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className={`bg-cyan-400 hover:bg-cyan-500 text-white px-12 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                  }`}
                >
                  {isUploading ? 'Processing...' : 'Upload Document'}
                </button>

                <p className="text-gray-600 text-base">
                  PDF or TXT files (max 10MB)
                </p>
              </div>
            </div>
          ) : (
            /* Chat Interface */
            <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
              {/* Document Header */}
              <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-cyan-400" />
                  <span className="text-white font-medium">{file.name}</span>
                </div>
                <button
                  onClick={handleRemoveDocument}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Remove document"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-slate-900">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-6 py-3 ${
                        message.role === 'user'
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-800 text-gray-200 border border-slate-700'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 rounded-2xl px-6 py-3 border border-slate-700">
                      <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="bg-slate-800 p-4 border-t border-slate-700">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question about the document..."
                    disabled={isSending || !extractedText}
                    className="flex-1 bg-slate-900 text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-700"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isSending || !inputMessage.trim() || !extractedText}
                    className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full p-3 transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-2xl">
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </section>
    <Footer />
  </div>
  );
};

export default ChatWithDocument;
