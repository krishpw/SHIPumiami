import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ChevronRight, Check, AlertTriangle, Terminal, Loader2, Disc } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  linkedin: string;
  clubs: string;
  track: 'analyst' | 'founder' | '';
  essay: string; // Used for "The Thesis" (Analyst) or "The Payload" (Founder)
}

export const Application: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    linkedin: '',
    clubs: '',
    track: '',
    essay: '',
  });

  const totalSteps = 3;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const closeAndReset = () => {
    setIsFormOpen(false);
    // Wait for exit animation to finish before resetting state
    setTimeout(() => {
        setStep(1);
        setIsSuccess(false);
        setIsSubmitting(false);
        setFormData({
            fullName: '',
            email: '',
            linkedin: '',
            clubs: '',
            track: '',
            essay: '',
        });
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/shyamaldesai2005@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `SH1P UTD App: ${formData.fullName} [${formData.track.toUpperCase()}]`,
          _captcha: "false", // Disable captcha to ensure immediate delivery
          _template: "table", // Clean table format for the email
          name: formData.fullName,
          email: formData.email,
          linkedin: formData.linkedin,
          track: formData.track,
          clubs: formData.clubs,
          // Label the essay field based on track for clarity in the email
          [formData.track === 'analyst' ? 'Investment_Thesis' : 'Product_Description']: formData.essay
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Transmission rejected by server. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Network uplink failed. Please check your connection.");
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = formData.fullName.length > 0 && formData.email.includes('@utdallas.edu') && formData.linkedin.length > 0;
  const isStep2Valid = formData.track !== '' && formData.clubs.length > 0;
  const isStep3Valid = formData.essay.length > 10; // Basic check

  return (
    <section id="apply" className="bg-engine-surface border-y border-engine-border py-32 px-6 text-center relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">Ready to Build?</h2>
        <p className="text-xl text-engine-muted max-w-xl mb-12">
            The link to the Venture Analyst and Founder application is live.
            <br/>
            <span className="text-utd text-sm font-mono mt-2 block">DEADLINE: FEB 11 @ 11:59 PM ET</span>
        </p>
        
        <button 
          onClick={() => setIsFormOpen(true)}
          className="group relative px-12 py-5 bg-white text-black font-mono font-bold uppercase tracking-widest hover:bg-utd hover:text-white transition-all duration-300"
        >
            <span className="flex items-center gap-2">
                Launch Application
                <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Corner acccents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black group-hover:border-white transition-colors"></span>
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black group-hover:border-white transition-colors"></span>
        </button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-engine-bg/90 backdrop-blur-md"
              onClick={closeAndReset}
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#050505] border border-engine-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-engine-border bg-engine-surface select-none">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <div className="ml-4 font-mono text-[10px] text-engine-muted flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    SECURE_UPLINK_ESTABLISHED
                  </div>
                </div>
                <button 
                  onClick={closeAndReset}
                  className="text-engine-muted hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Success State */}
              {isSuccess ? (
                 <div className="flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="w-20 h-20 bg-engine-success/10 rounded-full flex items-center justify-center border border-engine-success mb-6"
                    >
                      <Check className="w-10 h-10 text-engine-success" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Transmission Complete</h3>
                    <p className="text-engine-muted max-w-sm mb-8">
                      Your application has been logged in the Venture Engine. We will review your signal shortly.
                    </p>
                    <button 
                      onClick={closeAndReset}
                      className="px-6 py-2 bg-engine-border hover:bg-white hover:text-black text-white font-mono text-xs uppercase tracking-widest transition-colors"
                    >
                      Close Connection
                    </button>
                 </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  {/* Progress Bar */}
                  <div className="h-1 w-full bg-engine-border">
                    <motion.div 
                      className="h-full bg-utd"
                      initial={{ width: "33%" }}
                      animate={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                  </div>

                  <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8">
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div 
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div className="space-y-1 mb-8">
                            <h3 className="text-xl font-display font-bold text-white">Identity Verification</h3>
                            <p className="text-xs font-mono text-engine-muted uppercase">Step 01 /// 03</p>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-mono text-engine-muted mb-2 uppercase">Full Legal Name</label>
                              <input 
                                type="text" 
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                className="w-full bg-engine-surface border border-engine-border p-3 text-white focus:border-utd outline-none transition-colors font-sans"
                                placeholder="Enter name..."
                                autoFocus
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono text-engine-muted mb-2 uppercase">UTD Email Address</label>
                              <div className="relative">
                                <input 
                                  type="email" 
                                  value={formData.email}
                                  onChange={(e) => handleInputChange('email', e.target.value)}
                                  className={`w-full bg-engine-surface border p-3 text-white outline-none transition-colors font-sans ${
                                    formData.email.length > 0 && !formData.email.includes('@utdallas.edu') 
                                    ? 'border-red-500/50 focus:border-red-500' 
                                    : 'border-engine-border focus:border-utd'
                                  }`}
                                  placeholder="netid@utdallas.edu"
                                />
                                {formData.email.length > 0 && !formData.email.includes('@utdallas.edu') && (
                                  <div className="absolute right-3 top-3 text-red-500">
                                    <AlertTriangle className="w-5 h-5" />
                                  </div>
                                )}
                              </div>
                              {formData.email.length > 0 && !formData.email.includes('@utdallas.edu') && (
                                <p className="text-[10px] text-red-500 mt-1 font-mono">MUST BE UTD EMAIL</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs font-mono text-engine-muted mb-2 uppercase">LinkedIn URL</label>
                              <input 
                                type="text" 
                                value={formData.linkedin}
                                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                                className="w-full bg-engine-surface border border-engine-border p-3 text-white focus:border-utd outline-none transition-colors font-sans"
                                placeholder="linkedin.com/in/..."
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div 
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div className="space-y-1 mb-8">
                            <h3 className="text-xl font-display font-bold text-white">Signal & Context</h3>
                            <p className="text-xs font-mono text-engine-muted uppercase">Step 02 /// 03</p>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <label className="block text-xs font-mono text-engine-muted mb-3 uppercase">Select Operational Track</label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                  type="button"
                                  onClick={() => handleInputChange('track', 'analyst')}
                                  className={`p-4 border text-left transition-all relative ${
                                    formData.track === 'analyst' 
                                      ? 'bg-utd/10 border-utd' 
                                      : 'bg-engine-surface border-engine-border hover:border-engine-muted'
                                  }`}
                                >
                                  {formData.track === 'analyst' && <div className="absolute top-2 right-2 text-utd"><Disc className="w-4 h-4 animate-spin" /></div>}
                                  <div className={`font-bold mb-1 ${formData.track === 'analyst' ? 'text-utd' : 'text-white'}`}>Analyst Program</div>
                                  <div className="text-xs text-engine-muted">Buy-Side. Capital Allocation.</div>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleInputChange('track', 'founder')}
                                  className={`p-4 border text-left transition-all relative ${
                                    formData.track === 'founder' 
                                      ? 'bg-engine-accent/10 border-engine-accent' 
                                      : 'bg-engine-surface border-engine-border hover:border-engine-muted'
                                  }`}
                                >
                                  {formData.track === 'founder' && <div className="absolute top-2 right-2 text-engine-accent"><Disc className="w-4 h-4 animate-spin" /></div>}
                                  <div className={`font-bold mb-1 ${formData.track === 'founder' ? 'text-engine-accent' : 'text-white'}`}>Founders Workshop</div>
                                  <div className="text-xs text-engine-muted">Sell-Side. Building Equity.</div>
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-mono text-engine-muted mb-2 uppercase">Campus Involvement</label>
                              <textarea 
                                value={formData.clubs}
                                onChange={(e) => handleInputChange('clubs', e.target.value)}
                                className="w-full bg-engine-surface border border-engine-border p-3 text-white focus:border-utd outline-none transition-colors font-sans resize-none h-24"
                                placeholder="List relevant clubs, organizations, or leadership roles..."
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div 
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div className="space-y-1 mb-8">
                            <h3 className="text-xl font-display font-bold text-white">
                                {formData.track === 'analyst' ? 'The Thesis' : 'The Payload'}
                            </h3>
                            <p className="text-xs font-mono text-engine-muted uppercase">Step 03 /// 03</p>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-mono text-engine-muted mb-2 uppercase">
                                {formData.track === 'analyst' 
                                    ? "Why are you a fit for the buy-side? (Your Investment Thesis)" 
                                    : "What are you building? (Product Description & Status)"}
                              </label>
                              <textarea 
                                value={formData.essay}
                                onChange={(e) => handleInputChange('essay', e.target.value)}
                                className="w-full bg-engine-surface border border-engine-border p-3 text-white focus:border-utd outline-none transition-colors font-sans resize-none h-48"
                                placeholder={formData.track === 'analyst' ? "Convince us..." : "Describe your MVP, traction, or idea..."}
                                autoFocus
                              />
                            </div>
                            
                            <div className="bg-engine-surface border border-engine-border p-4">
                                <h4 className="text-xs font-mono text-engine-muted uppercase mb-2">Review Data</h4>
                                <div className="space-y-1 text-sm text-white">
                                    <div className="flex justify-between border-b border-engine-border pb-1 mb-1">
                                        <span className="text-engine-muted">ID</span>
                                        <span>{formData.fullName}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-engine-border pb-1 mb-1">
                                        <span className="text-engine-muted">Comms</span>
                                        <span>{formData.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-engine-muted">Target</span>
                                        <span className="text-utd font-bold uppercase">{formData.track}</span>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>

                  {/* Footer Nav */}
                  <div className="p-4 border-t border-engine-border bg-engine-surface flex justify-between items-center">
                    {step > 1 ? (
                        <button 
                            onClick={prevStep}
                            className="text-xs font-mono text-engine-muted hover:text-white uppercase tracking-widest px-4 py-2"
                        >
                            Back
                        </button>
                    ) : (
                        <div></div>
                    )}
                    
                    {step < totalSteps ? (
                        <button 
                            onClick={nextStep}
                            disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                            className={`flex items-center gap-2 px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                                (step === 1 ? isStep1Valid : isStep2Valid)
                                ? 'bg-white text-black hover:bg-utd hover:text-white'
                                : 'bg-engine-border text-engine-muted cursor-not-allowed'
                            }`}
                        >
                            Next
                            <ChevronRight className="w-3 h-3" />
                        </button>
                    ) : (
                        <button 
                            onClick={handleSubmit}
                            disabled={!isStep3Valid || isSubmitting}
                            className={`flex items-center gap-2 px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                                isStep3Valid && !isSubmitting
                                ? 'bg-utd text-white hover:bg-white hover:text-black'
                                : 'bg-engine-border text-engine-muted cursor-not-allowed'
                            }`}
                        >
                            {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Transmit'}
                        </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};