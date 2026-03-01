/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowUpRight, Terminal, X, Check, AlertTriangle, 
  Disc, Loader2, MapPin, Briefcase, Code, ShieldCheck, TrendingUp,
  ChevronRight, Activity
} from 'lucide-react';

interface ApplicationPageProps {
  visible: boolean;
}

interface FormData {
  fullName: string;
  email: string;
  linkedin: string;
  clubs: string;
  track: 'analyst' | 'founder' | '';
  essay: string;
}

// --- Sub-Components ---

const Navbar: React.FC<{ onApply: () => void }> = ({ onApply }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${scrolled ? 'bg-[#02040A]/90 backdrop-blur-md border-slate-800 py-3' : 'bg-transparent border-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="font-sans font-bold text-xl tracking-tighter text-white">
            SH1P <span className="text-[#F47321]">UMiami</span>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            <span>Spring 2026</span>
            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
            <span>Recruitment Cycle</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-emerald-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            STATUS: LIVE
          </div>
          <button 
            onClick={onApply} 
            className="px-5 py-2 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-[#F47321] hover:text-white transition-colors border border-white hover:border-[#F47321]"
          >
            Apply Now
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero: React.FC<{ onApply: () => void }> = ({ onApply }) => (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F47321]/10 rounded-full blur-[128px] mix-blend-screen animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <div className="h-[1px] w-12 bg-[#F47321]"></div>
            <span className="font-mono text-[#F47321] text-xs tracking-widest uppercase">The Venture Engine</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-6xl md:text-8xl lg:text-9xl font-sans font-bold leading-none tracking-tighter text-white">
            SH1P <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#F47321] to-[#B24D12]">UMiami</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p className="text-2xl md:text-4xl font-light text-slate-300 mb-2">
              We don't simulate venture capital. <span className="text-white font-medium">We execute it.</span>
            </p>
            <p className="max-w-xl text-slate-400 text-lg leading-relaxed">
              The Premiere Venture Capital Division at The University of Miami. SH1P UMiami is the deployed operational spoke of the SH1P National Arm and Catalyst Ventures. We bridge the gap between academic theory and institutional deployment.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap items-center gap-4 mt-4">
            <button onClick={onApply} className="group relative overflow-hidden bg-white text-black px-8 py-4 font-mono font-bold uppercase tracking-wide flex items-center gap-3 hover:bg-[#F47321] hover:text-white transition-all">
              <span className="relative z-10">Apply Now</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="font-mono text-xs text-slate-500 px-4 py-2 border-l border-slate-800">
              <div>DEADLINE: FEB 11</div>
              <div>11:59 PM ET</div>
            </div>
          </motion.div>
        </div>

        {/* Abstract "Engine" Visual */}
        <div className="lg:col-span-4 relative hidden lg:block h-[400px]">
          <div className="absolute inset-0 border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 flex flex-col justify-between font-mono text-xs">
             <div className="flex justify-between text-slate-500 border-b border-slate-800 pb-4">
                <span>SYSTEM_ID: SH1P_UM_01</span>
                <span className="text-emerald-500">CONNECTED</span>
             </div>
             <div className="space-y-4 my-auto">
                <div className="space-y-1">
                   <div className="text-slate-500">CAPITAL_DEPLOYMENT</div>
                   <div className="h-1 w-full bg-slate-800 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 2, delay: 1 }} className="h-full bg-[#F47321]"></motion.div></div>
                </div>
                <div className="space-y-1">
                   <div className="text-slate-500">PIPELINE_VELOCITY</div>
                   <div className="h-1 w-full bg-slate-800 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 2, delay: 1.2 }} className="h-full bg-green-500"></motion.div></div>
                </div>
             </div>
             <div className="border-t border-slate-800 pt-4 text-slate-500"><p>Deploying capital via Catalyst Ventures.</p></div>
          </div>
        </div>
      </div>
    </section>
);

const Manifesto: React.FC = () => (
    <section className="py-24 px-6 border-b border-slate-800 bg-[#02040A]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-[#F47321]"></span>
                <span className="font-mono text-sm text-slate-500 uppercase tracking-widest">The Mandate</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-8 leading-tight">
              Talent is universal.<br/><span className="text-slate-500">Opportunity is not.</span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              We operate with a single thesis: high-agency individuals need a vehicle to compound their output. SH1P UMiami aggregates the highest-agency builders and operators at The University of Miami .
            </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6">
             <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-slate-900/50 border border-slate-800 p-8">
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Institutional Backing</h3>
                    <TrendingUp className="text-[#F47321] w-6 h-6" />
                </div>
                <p className="text-slate-400">Resources and deal flow directly from SH1P National. We are not an island; we are a bridge to the national ecosystem.</p>
             </motion.div>
             <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-slate-900/50 border border-slate-800 p-8">
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Validated Placement</h3>
                    <ShieldCheck className="text-green-500 w-6 h-6" />
                </div>
                <p className="text-slate-400 mb-4">Our alumni do not just graduate; they exit to Tier-1 firms.</p>
                <div className="flex flex-wrap gap-2">
                    {['Antler', 'J.P. Morgan', 'Wells Fargo', 'Cliqk', 'Zemi'].map((firm) => (
                        <span key={firm} className="px-2 py-1 bg-black border border-slate-700 text-[10px] font-mono text-white uppercase">{firm}</span>
                    ))}
                </div>
             </motion.div>
        </div>
      </div>
    </section>
);

const Program: React.FC = () => (
    <section className="py-24 px-6 relative overflow-hidden bg-[#050A14]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
            <span className="font-mono text-sm text-[#F47321] uppercase tracking-widest block mb-4">Operational Verticals</span>
            <h2 className="text-4xl md:text-6xl font-sans font-bold text-white">Choose Your Track</h2>
            <p className="text-slate-400 mt-4 max-w-2xl text-lg">We offer two distinct high-performance tracks. Selection is competitive. You cannot do both.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-[#02040A] border border-slate-800 hover:border-[#F47321] transition-all p-8 md:p-12 flex flex-col h-full">
                <div className="mb-8 flex items-center justify-between">
                    <div className="p-3 bg-[#F47321]/10 border border-[#F47321]/20 text-[#F47321] rounded"><Briefcase className="w-6 h-6" /></div>
                    <span className="font-mono text-4xl font-bold text-slate-800 group-hover:text-[#F47321]/20 transition-colors">01</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">The Analyst Program</h3>
                <span className="inline-block mb-6 text-xs font-mono text-slate-500 px-2 py-1 border border-slate-800 rounded uppercase">Buy-Side • Capital Allocation</span>
                <p className="text-slate-400 mb-8 flex-grow">For those seeking to master capital allocation. Operate as a Junior Associate for the Catalyst Ventures pipeline.</p>
                <div className="space-y-4 border-t border-slate-800 pt-8">
                    <div><span className="block text-xs font-mono text-slate-500 uppercase mb-1">Deliverables</span><p className="text-sm text-white">Live deal sourcing, market due diligence, investment memorandum construction.</p></div>
                </div>
            </div>
            <div className="group bg-[#02040A] border border-slate-800 hover:border-green-500 transition-all p-8 md:p-12 flex flex-col h-full">
                <div className="mb-8 flex items-center justify-between">
                    <div className="p-3 bg-green-600/10 border border-green-600/20 text-green-500 rounded"><Code className="w-6 h-6" /></div>
                    <span className="font-mono text-4xl font-bold text-slate-800 group-hover:text-green-500/20 transition-colors">02</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Founders Workshop</h3>
                <span className="inline-block mb-6 text-xs font-mono text-slate-500 px-2 py-1 border border-slate-800 rounded uppercase">Sell-Side • Pre-Accelerator</span>
                <p className="text-slate-400 mb-8 flex-grow">For those seeking to build equity. A "Pre-Accelerator" environment for technical founders.</p>
                <div className="space-y-4 border-t border-slate-800 pt-8">
                    <div><span className="block text-xs font-mono text-slate-500 uppercase mb-1">Deliverables</span><p className="text-sm text-white">Rapid MVP iteration, "Buildathon" sprints, go-to-market strategy.</p></div>
                </div>
            </div>
        </div>
      </div>
    </section>
);

const Timeline: React.FC = () => {
    const events = [
        { name: "Coffee Chat Block I", date: "Jan 27 – Jan 31", location: "Varies" },
        { name: "Info Session + Apps Open", date: "Mon, Feb 9", time: "8:00 PM ET", location: "Zoom", highlight: true },
        { name: "Coffee Chat Block II", date: "Feb 10 – Feb 11", location: "Varies" },
        { name: "APPLICATIONS CLOSE", date: "Wed, Feb 11", time: "11:59 PM ET", location: "Hard Stop", critical: true },
        { name: "Kickoff Social", date: "TBD", time: "7:30 PM", location: "TBD" },
    ];
    return (
        <section className="py-24 px-6 border-b border-slate-800 bg-[#02040A]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div><h2 className="text-4xl font-sans font-bold text-white mb-4">Spring 2026 Recruitment</h2><p className="text-slate-500 font-mono text-sm uppercase tracking-widest">The Sprint /// Timeline</p></div>
                <div className="px-4 py-2 bg-slate-900 border border-[#F47321]/30 text-[#F47321] text-xs font-mono">Speed is a feature. Adhere to the timeline.</div>
            </div>
            <div className="border border-slate-800 bg-slate-900/50 divide-y divide-slate-800">
                {events.map((evt, i) => (
                    <div key={i} className={`grid grid-cols-1 md:grid-cols-12 p-6 items-center gap-4 hover:bg-white/5 transition-colors ${evt.highlight ? 'bg-white/5' : ''}`}>
                        <div className="md:col-span-5"><div className={`font-bold text-lg ${evt.critical ? 'text-[#F47321]' : 'text-white'}`}>{evt.name}</div></div>
                        <div className="md:col-span-4 font-mono text-sm text-slate-300"><div>{evt.date}</div>{evt.time && <div className="text-slate-500 text-xs">{evt.time}</div>}</div>
                        <div className="md:col-span-3 text-right font-mono text-xs text-slate-500 flex items-center md:justify-end gap-2">{evt.location} <MapPin className="w-3 h-3" /></div>
                    </div>
                ))}
            </div>
          </div>
        </section>
    )
};

const Mentors: React.FC = () => {
    const leaders = [
        { name: "Krish Naresh", role: "National Founder", signal: "Incoming Summer Analyst @ J.P. Morgan" },
        { name: "Markus Corredor", role: "UMiami President", signal: "Incoming BA at Capital One | Founder @VibeLink" },
        { name: "TBD", role: "UMiami VC Lead", signal: "Prev @ " },
        { name: "TBD", role: "UMiami Tech Lead", signal: "Prev @" }
    ];
    return (
        <section className="py-24 px-6 bg-[#02040A]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 max-w-2xl"><h2 className="text-3xl font-sans font-bold text-white mb-2">The Operators</h2><div className="h-1 w-20 bg-[#F47321] mb-4"></div><p className="text-slate-500">Led by founders and active market participants. No theorists.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {leaders.map((leader, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group border border-slate-800 bg-slate-900 hover:bg-[#02040A] p-8">
                        <div className="font-mono text-xs text-[#F47321] uppercase tracking-widest mb-6">{leader.role}</div>
                        <h3 className="text-2xl font-bold text-white mb-8">{leader.name}</h3>
                        <div className="border-t border-slate-800 pt-4"><div className="text-[10px] font-mono text-slate-500 uppercase mb-1">High Signal</div><div className="text-sm font-medium text-emerald-500">{leader.signal}</div></div>
                    </motion.div>
                ))}
            </div>
          </div>
        </section>
    );
}

// --- Main Application Page Component ---

export const ApplicationPage: React.FC<ApplicationPageProps> = ({ visible }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  
  // Ref for the hidden form
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    linkedin: '',
    clubs: '',
    track: '',
    essay: '',
  });

  if (!visible) return null;

  const totalSteps = 3;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => { if (step < totalSteps) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  const closeAndReset = () => {
    setIsFormOpen(false);
    setTimeout(() => {
        setStep(1);
        setIsSuccess(false);
        setIsSubmitting(false);
        setErrorMsg(null);
        setShowFallback(false);
        setFormData({ fullName: '', email: '', linkedin: '', clubs: '', track: '', essay: '' });
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setShowFallback(false);
    
    // 1. Prepare Data for FormData (More robust against CORS/Adblock issues than JSON)
    const formDataObj = new FormData();
    // Hidden config fields
    formDataObj.append('_subject', `SH1P UMiami App: ${formData.fullName} [${formData.track.toUpperCase()}]`);
    formDataObj.append('_captcha', 'false');
    formDataObj.append('_template', 'table');
    
    // Actual data with clean keys
    formDataObj.append('Name', formData.fullName);
    formDataObj.append('Email', formData.email);
    formDataObj.append('LinkedIn', formData.linkedin);
    formDataObj.append('Track', formData.track.toUpperCase());
    formDataObj.append('Clubs', formData.clubs);
    const essayLabel = formData.track === 'analyst' ? 'Investment_Thesis' : 'Product_Description';
    formDataObj.append(essayLabel, formData.essay);

    // 2. Attempt AJAX Submission
    try {
      const response = await fetch("https://formsubmit.co/ajax/shyamaldesai2005@gmail.com", {
        method: "POST",
        body: formDataObj,
        headers: {
            'Accept': 'application/json'
        }
      });
      
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.error("Submission failed", result);
        throw new Error("Server rejected transmission");
      }
    } catch (error) {
      console.error("Network error", error);
      setErrorMsg("Connection blocked by network or extension.");
      setShowFallback(true); // Enable the fallback button
    } finally {
      setIsSubmitting(false);
    }
  };

  // VALIDATION: Relaxed checks (No UTD email requirement)
  const isStep1Valid = formData.fullName.length > 0 && formData.email.includes('@') && formData.email.includes('.') && formData.linkedin.length > 0;
  const isStep2Valid = formData.track !== '' && formData.clubs.length > 0;
  const isStep3Valid = formData.essay.length > 10;

  return (
    <div className="fixed inset-0 z-50 bg-[#02040A] text-slate-200 overflow-y-auto font-sans animate-in fade-in duration-500">
       <Navbar onApply={() => setIsFormOpen(true)} />
       
       <Hero onApply={() => setIsFormOpen(true)} />
       <Manifesto />
       <Program />
       <Timeline />
       <Mentors />

       <footer className="bg-[#02040A] py-12 px-6 border-t border-slate-800">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
               <span className="font-sans font-bold text-white tracking-tight">SH1P <span className="text-[#F47321]">UMiami</span></span>
               <span className="text-slate-600 text-xs">///</span>
               <span className="text-slate-600 text-xs font-mono">EST. 2026</span>
           </div>
           <div className="text-[10px] text-slate-600 font-mono">ALL SYSTEMS NOMINAL</div>
         </div>
       </footer>

       {/* --- Fallback Hidden Form --- */}
       {/* This form is used when AJAX fails (e.g. AdBlock). Submitting this form in a new tab guarantees delivery. */}
       <form 
            ref={formRef} 
            action="https://formsubmit.co/shyamaldesai2005@gmail.com" 
            method="POST" 
            target="_blank"
            className="hidden"
        >
            <input type="hidden" name="_subject" value={`SH1P UMiami App: ${formData.fullName} [${formData.track.toUpperCase()}]`} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="Name" value={formData.fullName} />
            <input type="hidden" name="Email" value={formData.email} />
            <input type="hidden" name="LinkedIn" value={formData.linkedin} />
            <input type="hidden" name="Track" value={formData.track} />
            <input type="hidden" name="Clubs" value={formData.clubs} />
            <input type="hidden" name="Essay" value={formData.essay} />
       </form>

       {/* --- Application Modal --- */}
       <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0" onClick={closeAndReset} />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-2xl bg-[#050505] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#0A0F18] select-none">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <div className="ml-4 font-mono text-[10px] text-slate-500 flex items-center gap-2"><Terminal className="w-3 h-3" /> SECURE_UPLINK_ESTABLISHED</div>
                </div>
                <button onClick={closeAndReset} className="text-slate-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
              </div>

              {isSuccess ? (
                 <div className="flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500 mb-6"><Check className="w-10 h-10 text-emerald-500" /></motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Transmission Complete</h3>
                    <p className="text-slate-500 max-w-sm mb-8">Your application has been logged in the Venture Engine. We will review your signal shortly.</p>
                    <button onClick={closeAndReset} className="px-6 py-2 bg-slate-800 hover:bg-white hover:text-black text-white font-mono text-xs uppercase tracking-widest transition-colors">Close Connection</button>
                 </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <div className="h-1 w-full bg-slate-800"><motion.div className="h-full bg-[#F47321]" initial={{ width: "33%" }} animate={{ width: `${(step / totalSteps) * 100}%` }} /></div>
                  <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8">
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                          <div className="space-y-1 mb-8"><h3 className="text-xl font-sans font-bold text-white">Identity Verification</h3><p className="text-xs font-mono text-slate-500 uppercase">Step 01 /// 03</p></div>
                          <div className="space-y-4">
                            <div><label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Full Legal Name</label><input type="text" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className="w-full bg-[#0A0F18] border border-slate-800 p-3 text-white focus:border-[#F47321] outline-none font-sans" placeholder="Enter name..." autoFocus /></div>
                            <div>
                              <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Email Address</label>
                              <div className="relative">
                                {/* Simplified Email Input */}
                                <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className={`w-full bg-[#0A0F18] border p-3 text-white outline-none font-sans ${formData.email.length > 0 && !formData.email.includes('@') ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-[#F47321]'}`} placeholder="user@example.com" />
                              </div>
                            </div>
                            <div><label className="block text-xs font-mono text-slate-500 mb-2 uppercase">LinkedIn URL</label><input type="text" value={formData.linkedin} onChange={(e) => handleInputChange('linkedin', e.target.value)} className="w-full bg-[#0A0F18] border border-slate-800 p-3 text-white focus:border-[#F47321] outline-none font-sans" placeholder="linkedin.com/in/..." /></div>
                          </div>
                        </motion.div>
                      )}
                      {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                          <div className="space-y-1 mb-8"><h3 className="text-xl font-sans font-bold text-white">Signal & Context</h3><p className="text-xs font-mono text-slate-500 uppercase">Step 02 /// 03</p></div>
                          <div className="space-y-6">
                            <div>
                              <label className="block text-xs font-mono text-slate-500 mb-3 uppercase">Select Operational Track</label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button type="button" onClick={() => handleInputChange('track', 'analyst')} className={`p-4 border text-left transition-all relative ${formData.track === 'analyst' ? 'bg-[#F47321]/10 border-[#F47321]' : 'bg-[#0A0F18] border-slate-800 hover:border-slate-600'}`}>
                                  {formData.track === 'analyst' && <div className="absolute top-2 right-2 text-[#F47321]"><Disc className="w-4 h-4 animate-spin" /></div>}<div className={`font-bold mb-1 ${formData.track === 'analyst' ? 'text-[#F47321]' : 'text-white'}`}>Analyst Program</div><div className="text-xs text-slate-500">Buy-Side. Capital Allocation.</div>
                                </button>
                                <button type="button" onClick={() => handleInputChange('track', 'founder')} className={`p-4 border text-left transition-all relative ${formData.track === 'founder' ? 'bg-green-500/10 border-green-500' : 'bg-[#0A0F18] border-slate-800 hover:border-slate-600'}`}>
                                  {formData.track === 'founder' && <div className="absolute top-2 right-2 text-green-500"><Disc className="w-4 h-4 animate-spin" /></div>}<div className={`font-bold mb-1 ${formData.track === 'founder' ? 'text-green-500' : 'text-white'}`}>Founders Workshop</div><div className="text-xs text-slate-500">Sell-Side. Building Equity.</div>
                                </button>
                              </div>
                            </div>
                            <div><label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Campus Involvement</label><textarea value={formData.clubs} onChange={(e) => handleInputChange('clubs', e.target.value)} className="w-full bg-[#0A0F18] border border-slate-800 p-3 text-white focus:border-[#F47321] outline-none font-sans resize-none h-24" placeholder="List relevant clubs..." /></div>
                          </div>
                        </motion.div>
                      )}
                      {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                          <div className="space-y-1 mb-8"><h3 className="text-xl font-sans font-bold text-white">{formData.track === 'analyst' ? 'The Thesis' : 'The Payload'}</h3><p className="text-xs font-mono text-slate-500 uppercase">Step 03 /// 03</p></div>
                          <div className="space-y-4">
                            <div><label className="block text-xs font-mono text-slate-500 mb-2 uppercase">{formData.track === 'analyst' ? "Why are you a fit for the buy-side? (Your Investment Thesis)" : "What are you building? (Product Description & Status)"}</label><textarea value={formData.essay} onChange={(e) => handleInputChange('essay', e.target.value)} className="w-full bg-[#0A0F18] border border-slate-800 p-3 text-white focus:border-[#F47321] outline-none font-sans resize-none h-48" placeholder={formData.track === 'analyst' ? "Convince us..." : "Describe your MVP..."} autoFocus /></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                  
                  {/* Footer Nav with Error Display */}
                  <div className="bg-[#0A0F18] border-t border-slate-800 p-4">
                    {errorMsg && (
                        <div className="mb-3 animate-in fade-in">
                            <div className="px-3 py-2 border border-red-500/50 bg-red-500/10 text-red-400 font-mono text-[10px] flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3" />
                                <span>ERROR: {errorMsg}</span>
                            </div>
                            
                            {/* Force Fallback Button */}
                            {showFallback && (
                                <div className="mt-2">
                                    <p className="text-[10px] text-slate-500 mb-2">Primary uplink failed. Engage secondary protocol?</p>
                                    <button 
                                        type="button" 
                                        onClick={() => formRef.current?.submit()} 
                                        className="w-full bg-red-900/20 border border-red-500 text-red-400 px-4 py-2 font-mono text-xs uppercase hover:bg-red-900/40 hover:text-white transition-colors"
                                    >
                                        Execute Force Transmission (New Tab)
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                        {step > 1 ? (<button onClick={prevStep} className="text-xs font-mono text-slate-500 hover:text-white uppercase tracking-widest px-4 py-2">Back</button>) : (<div></div>)}
                        {step < totalSteps ? (
                            <button onClick={nextStep} disabled={step === 1 ? !isStep1Valid : !isStep2Valid} className={`flex items-center gap-2 px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all ${(step === 1 ? isStep1Valid : isStep2Valid) ? 'bg-white text-black hover:bg-[#F47321] hover:text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>Next <ChevronRight className="w-3 h-3" /></button>
                        ) : (
                            <button onClick={handleSubmit} disabled={!isStep3Valid || isSubmitting} className={`flex items-center gap-2 px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all ${isStep3Valid && !isSubmitting ? 'bg-[#F47321] text-white hover:bg-white hover:text-black' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>{isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Transmit'}</button>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
       </AnimatePresence>
    </div>
  );
};