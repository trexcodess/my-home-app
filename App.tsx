import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Ticket, Globe, Zap, Cpu, MapPin, Menu, X, Calendar, ArrowRight, Share2, Shield, Radio, Wind, Rocket, Cloud, Code, Database, Lock, TrendingUp, DollarSign, Target } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import { Artist } from './types';

// Keep your existing image imports here
import Latitude from './src/assets/images/latitude.png'
import AfroImage5 from './src/assets/images/Afro_City_5.jpg'
import AfroImage from './src/assets/images/AfroCity_0.jpg'
import AfroImage1 from './src/assets/images/AfroCity_1.jpg'
import AfroImage2 from './src/assets/images/AfroCity_2.jpg'
import AfroImage3 from './src/assets/images/AfroCity_3.jpg'
import AfroImage4 from './src/assets/images/AfroCity_4.jpg' // This is the image of O.Mar 3.0

// UPDATED PROJECTS ARRAY (SHIP MODULES)
const PROJECTS: Artist[] = [
{ 
    id: '1', 
    name: 'Latitude', 
    genre: 'NFT Music Platform / Creative Sovereignty', 
    day: 'Coming Soon!', 
    image: Latitude, 
    description: "Latitude is the music platform built on Web3 that puts artists first. We ensure you keep ownership of your music and get paid instantly through direct, transparent royalty distribution powered by secure smart contracts. Listeners, support artists directly."
  },
  { 
    id: '2', 
    name: 'The MLP', 
    genre: 'Marketing Protocol / AI Integration', 
    day: 'Coming Soon!', 
    image: AfroImage, 
    description: 'Our core Marketing Program for enterprise-level, secure, federated marketing intelligence. The strategic framework that powers O.Mar 3.0.'
  },
  { 
    id: '3', 
    name: 'O.Mar 3.0 Ai', 
    genre: 'Coming Soon!', 
    day: 'Coming Soon!', 
    image: AfroImage4, // Using the image you provided for O.Mar 3.0
    description: 'The advanced Generative AI agent built within The MLP, specializing in hyper-personalized user experience and advanced NLU for strategic marketing and engagement.'
  },
  { 
    id: '4', 
    name: 'Dispatch', 
    genre: 'Decentralized News & Education', 
    day: 'Coming Soon!', 
    image: AfroImage2,
    description: "Trusted, community-verified news and education. AI filters misinformation to keep you informed about the world's future."
  },
  { 
    id: '5', 
    name: 'Fauna Echo', 
    genre: 'Eco-Tech / Community Service', 
    day: 'Coming Soon!', 
    image: AfroImage3,
    description: "Find missing animals fast! F.E combines geo-spatial mapping, AI image recognition, and community input to locate and protect lost pets and local wildlife. It's the smart way to care for our animal community."
  },
  { 
    id: '6', 
    name: 'Saturn', 
    genre: 'Entertainment', 
    day: 'Coming Soon!', 
    image: AfroImage1,
    description: 'A platform for immersive, interactive, and socially conscious digital entertainment, including games and VR experiences, focused on **Afrofuturist world-building** and creative expression.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Artist | null>(null);
  
  // Lead Gen State (Original Boarding)
  const [email, setEmail] = useState('');
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success'>('idle');
  
  // NEW MLP Lead Gen State
  const [mlpEmail, setMlpEmail] = useState('');
  const [mlpWebsite, setMlpWebsite] = useState('');
  const [mlpCompanyType, setMlpCompanyType] = useState('');
  const [mlpSubmissionState, setMlpSubmissionState] = useState<'idle' | 'loading' | 'success'>('idle');


  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'ArrowLeft') navigateProject('prev');
      if (e.key === 'ArrowRight') navigateProject('next');
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const handleLeadGenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubmissionState('loading');
    
    // Simulate API call
    setTimeout(() => {
      setSubmissionState('success');
      setEmail('');
    }, 2000);
  };
  
  // NEW: MLP Lead Gen Handler
  const handleMlpLeadGenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mlpEmail || !mlpWebsite || !mlpCompanyType) return;
    
    setMlpSubmissionState('loading');
    
    // Simulate API call - In a real app, send data: { email: mlpEmail, website: mlpWebsite, type: mlpCompanyType }
    console.log(`MLP Lead: ${mlpEmail}, ${mlpWebsite}, ${mlpCompanyType}`); 
    
    setTimeout(() => {
      setMlpSubmissionState('success');
      setMlpEmail('');
      setMlpWebsite('');
      setMlpCompanyType('');
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex(a => a.id === selectedProject.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % PROJECTS.length;
    } else {
      nextIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    }
    setSelectedProject(PROJECTS[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#00e5ff] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50 flex items-center gap-2">
           <span className="text-[#00e5ff]">☁</span> The Cloudship
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Innovations', 'The MLP', 'About Us', 'Boarding'].map((item) => ( // Changed 'Opportunities' to 'The MLP' for clarity
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="hover:text-[#00e5ff] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('boarding')}
          className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#00e5ff] hover:text-black hover:border-[#00e5ff] transition-all duration-300 text-white cursor-pointer bg-transparent"
          data-hover="true"
        >
          Request Clearance
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#0a0a1a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Innovations', 'The MLP', 'About Us', 'Boarding'].map((item) => ( // Changed 'Opportunities' to 'The MLP' for clarity
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-4xl font-heading font-bold text-white hover:text-[#00e5ff] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            
            <div className="absolute bottom-10 flex gap-6">
               <a href="#" className="text-white/50 hover:text-white transition-colors">Manifesto</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
           {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-sm font-mono text-[#00e5ff] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-[#00e5ff]/20"
          >
            <span>Est. 2012</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#d946ef] rounded-full animate-pulse"/>
            <span>Technology for Ascension</span>
          </motion.div>

           {/* Main Title */}
          <div className="relative w-full flex justify-center items-center flex-col">
            <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-widest text-white mb-2">THE</h1>
            <GradientText 
              text="CLOUDSHIP" 
              as="h1" 
              className="text-[12vw] md:text-[11vw] leading-[0.9] font-black tracking-tighter text-center" 
            />
              <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-widest text-white mt-2">ENTERPRISE</h1>
             {/* Holographic Orb */}
            <motion.div 
                className="absolute -z-20 w-[40vw] h-[40vw] bg-[#00e5ff]/10 blur-[80px] rounded-full pointer-events-none will-change-transform"
                animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
              className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-2xl font-light max-w-xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-4"
          >
             Navigating the currents of innovation. <br/>
             <span className="text-[#00e5ff]">Building a future where technology elevates the soul.</span>
          </motion.p>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-[#00e5ff] text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(0,229,255,0.4)]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-3xl md:text-7xl font-heading font-black px-8 flex items-center gap-4">
                    ATMOSPHERIC TECH <span className="text-black/50 text-2xl md:text-4xl">◈</span> 
                    DIGITAL ASCENSION <span className="text-black/50 text-2xl md:text-4xl">◈</span> 
                    FUTURE ROOTS <span className="text-black/50 text-2xl md:text-4xl">◈</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* INNOVATIONS SECTION */}
      <section id="innovations" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
             <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
               Ship <br/> 
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#d946ef]">Modules</span>
             </h2>
             <div className="mt-8 md:mt-0 max-w-md text-right">
               <p className="text-gray-300">
                 Our technology stack is designed to empower communities and harmonize with the planet.
               </p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-black/40 backdrop-blur-sm">
            {PROJECTS.map((project) => (
              <ArtistCard key={project.id} artist={project} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </div>
      </section>
      
      {/* --- NEW MLP LEAD GENERATION SECTION --- */}
      <section id="the-mlp" className="relative z-10 py-20 md:py-32 bg-[#0a0a1a] border-t border-[#d946ef]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
            
            {/* Value Proposition Side */}
            <div className="lg:col-span-7">
              <h2 className="text-5xl md:text-7xl font-heading font-bold mb-4 leading-tight">
                Stop Guessing. <br/> 
                <GradientText text="Start Growing." className="text-6xl md:text-8xl" />
              </h2>
              <p className="text-xl text-gray-200 mb-8 font-light leading-relaxed max-w-xl">
                Get Your **Minimum Loveable Position (MLP) SEO Strategy** in 7 Days. The lean, hyper-focused protocol to find the fastest path to high-value organic traffic.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Target, title: 'Hyper-Targeted Keywords', desc: 'Identify your 3 most profitable keywords to attract customers that convert, not just visitors. Eliminate the keyword noise.' },
                  { icon: Calendar, title: '90-Day Quick-Win Content Plan', desc: 'A prioritized list of content gaps for immediate ranking improvements and traffic boosts.' },
                  { icon: TrendingUp, title: 'Competitor Opportunity Map', desc: 'See exactly where your top 3 competitors are winning traffic and how to efficiently outrank them.' },
                  { icon: Cpu, title: 'Simplified Technical Health Score', desc: 'A prioritized checklist of technical issues costing you rankings, tailored for non-developers.' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <feature.icon className="w-6 h-6 text-[#00e5ff] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold font-heading text-white mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-300">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Social Proof Placeholder */}
              <div className="mt-12">
                <p className="text-sm text-gray-500 font-mono uppercase tracking-widest mb-4">Trusted by Market Builders</p>
                <div className="flex flex-wrap gap-6 opacity-60">
                  {/* Replace with real client logos if available */}
                  <DollarSign className="w-8 h-8 text-white/50" />
                  <Code className="w-8 h-8 text-white/50" />
                  <Database className="w-8 h-8 text-white/50" />
                </div>
              </div>
            </div>
            
            {/* Form Side */}
            <div className="lg:col-span-5 relative w-full">
              <div className="sticky top-28 bg-[#0a0a1a] border border-[#d946ef]/50 p-8 md:p-10 rounded-2xl shadow-[0_0_50px_rgba(217,70,239,0.2)]">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Secure Your Free MLP Strategy Session</h3>
                <p className="text-gray-400 mb-8">This complimentary review is valued at $1,500. Due to demand, we can only accept a limited number of applications each month.</p>
                
                {mlpSubmissionState === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#d946ef]/20 flex items-center justify-center mb-6">
                      <Rocket className="w-10 h-10 text-[#d946ef]" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white mb-2">MLP Application Received!</h3>
                    <p className="text-gray-400">Our analysts are reviewing your site. Check your email for next steps within 48 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleMlpLeadGenSubmit} className="flex flex-col gap-6">
                    <div>
                      <label htmlFor="mlpEmail" className="block text-xs font-mono text-white/70 uppercase tracking-widest mb-2">
                        Work Email
                      </label>
                      <input 
                        type="email" 
                        id="mlpEmail"
                        required
                        value={mlpEmail}
                        onChange={(e) => setMlpEmail(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00e5ff] transition-colors"
                        placeholder="marketer@yourcompany.com"
                        disabled={mlpSubmissionState === 'loading'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="mlpWebsite" className="block text-xs font-mono text-white/70 uppercase tracking-widest mb-2">
                        Company Website URL
                      </label>
                      <input 
                        type="url" 
                        id="mlpWebsite"
                        required
                        value={mlpWebsite}
                        onChange={(e) => setMlpWebsite(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00e5ff] transition-colors"
                        placeholder="https://www.yourcompany.com"
                        disabled={mlpSubmissionState === 'loading'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="mlpCompanyType" className="block text-xs font-mono text-white/70 uppercase tracking-widest mb-2">
                        Company Type
                      </label>
                      <select 
                        id="mlpCompanyType"
                        required
                        value={mlpCompanyType}
                        onChange={(e) => setMlpCompanyType(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00e5ff] transition-colors appearance-none"
                        disabled={mlpSubmissionState === 'loading'}
                      >
                        <option value="" disabled>Select your business focus</option>
                        <option value="E-commerce">E-commerce Store</option>
                        <option value="SaaS">SaaS / Software</option>
                        <option value="Small Business">Small Business / Local Service</option>
                        <option value="Agency">Agency / Consultant</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      disabled={mlpSubmissionState === 'loading'}
                      className="w-full bg-[#d946ef] text-white font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-[#a930d4] transition-colors duration-300 flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:cursor-wait"
                      data-hover="true"
                    >
                      {mlpSubmissionState === 'loading' ? 'Analyzing Uplink...' : 'Apply for Free MLP Strategy'}
                      {mlpSubmissionState !== 'loading' && <ArrowRight className="w-5 h-5" />}
                    </button>
                    
                    <p className="text-[10px] text-center text-gray-500 font-mono">
                      Your data is handled securely under our MLP Protocol. We respect your privacy.
                    </p>
                  </form>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- END MLP LEAD GENERATION SECTION --- */}


      {/* ABOUT US SECTION - OPTION 2 MISSION STATEMENT */}
      <section id="about-us" className="relative z-10 py-20 md:py-32 bg-[#0a0a1a]/80 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        {/* Decorative blurred circle */}
        <div className="absolute top-1/2 left-[-20%] w-[50vw] h-[50vw] bg-[#00e5ff]/10 rounded-full blur-[60px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Visual Side */}
            <div className="lg:col-span-7 relative h-[400px] md:h-[600px] w-full order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff] to-[#d946ef] rounded-3xl -rotate-3 opacity-30 blur-xl" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <img 
                  src={AfroImage3}
                  alt="Afrofuturistic City" 
                  className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 will-change-transform grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                   <div className="flex items-center gap-2 mb-2">
                     <Wind className="text-[#00e5ff]" />
                     <span className="text-white font-mono uppercase tracking-widest text-sm">Coordinates: 3030.X.ZE</span>
                   </div>
                  <div className="text-3xl md:text-4xl font-heading font-bold text-white">
                    The Cloudship Enterprise
                  </div>
                </div>
              </div>
            </div>

            {/* Text Side - "EMPOWERED SOVEREIGN" */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <h2 className="text-4xl md:text-7xl font-heading font-bold mb-6 md:mb-8 leading-tight">
                Our <br/> <GradientText text="MISSION" className="text-5xl md:text-8xl" />
              </h2>
              <div className="h-1 w-20 bg-[#d946ef] mb-8" />
              
              {/* OPTION 2 MISSION STATEMENT */}
              <p className="text-lg md:text-xl text-gray-200 mb-6 font-light leading-relaxed">
                <span className="text-[#00e5ff] font-bold">Empowering the community through knowledge and security.</span> Our mission is to demystify technology for all, while building robust platforms that defend your privacy and keep your creativity owned by you.
              </p>
              <p className="text-base text-gray-400 mb-8 leading-relaxed">
                  We stand as guardians of the digital realm. By fusing education with secure infrastructure, we ensure that as we ascend technologically, we leave no one behind and leave no data unprotected.
              </p>
              
              <div className="space-y-6 md:space-y-8">
                {[
                { icon: Globe, title: 'Knowledge is Power', desc: 'Demystifying technology through accessible resources and coding games, ensuring the next generation is ready to build the future.' },
                { icon: Shield, title: 'Sovereign Data', desc: 'Your data belongs to you. We implement rigorous encryption and decentralized storage to ensure your digital footprint remains private.' },
                { icon: Zap, title: 'Creative Guardianship', desc: 'Protecting the soul of art. We use immutable ownership protocols to ensure artists retain control and value over their creations.' },
                ].map((feature, i) => (
                  <div
                    key={i} 
                    className="flex items-start gap-6"
                  >
                    <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-[#00e5ff]/20">
                      <feature.icon className="w-6 h-6 text-[#00e5ff]" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 font-heading text-white">{feature.title}</h4>
                      <p className="text-sm text-gray-300">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* BOARDING SECTION - UPDATED FOR MONETIZATION & MARKETING HOOK */}
      <section id="boarding" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-black/60 backdrop-blur-xl border-t border-[#00e5ff]/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
             <h2 className="text-4xl md:text-8xl font-heading font-bold text-white mb-4">
               PATHWAYS TO <span className="text-[#00e5ff]">OPPORTUNITY</span>
             </h2>
             <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
               Secure your uplink and become a registered passenger on The Cloudship. Join the manifest for two distinct benefits: <span className="text-[#00e5ff]">1) Access to New Releases</span> and <span className="text-[#d946ef]">2) Curated Recommendations to Earn Crypto, Cash, and Gift Cards for your digital input and engagement.</span>
             </p>
          </div>
          
          <div className="relative w-full max-w-2xl mx-auto bg-[#0a0a1a] border border-[#00e5ff]/30 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(0,229,255,0.2)]">
             {/* Decorative Elements */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent" />
             <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#00e5ff]" />
             <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#00e5ff]" />
             
             {/* NEW VALUE PROPOSITION LIST */}
             <h3 className="text-xl font-heading font-bold text-white mb-6">Recommendations to Engage & Earn:</h3>
             <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/10">
                   <Ticket className="w-6 h-6 text-[#00e5ff] shrink-0 mt-1" />
                   <div>
                      <h4 className="text-lg font-bold text-white">Brave Browser (B.A.T. Tokens)</h4>
                      <p className="text-sm text-gray-400">Browse the internet as usual with Brave Browser and earn Basic Attention Tokens (B.A.T.). Keep your data private, and get rewarded for your attention.</p>
                   </div>
                </div>
                 <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/10">
                   <Globe className="w-6 h-6 text-[#d946ef] shrink-0 mt-1" />
                   <div>
                      <h4 className="text-lg font-bold text-white">Content Creation & Tipping</h4>
                      <p className="text-sm text-gray-400">As content creators, you can earn crypto and tips directly from your audience on various decentralized platforms. We help you find the right channels.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/10">
                   <MapPin className="w-6 h-6 text-[#00e5ff] shrink-0 mt-1" />
                   <div>
                      <h4 className="text-lg font-bold text-white">User Interviews & Surveys</h4>
                      <p className="text-sm text-gray-400">Participate in one-on-one surveys and user interviews to earn gift cards. Your informed opinions are valuable and deserve compensation.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/10">
                   <Share2 className="w-6 h-6 text-[#d946ef] shrink-0 mt-1" />
                   <div>
                      <h4 className="text-lg font-bold text-white">Software Reviews (G2 & Others)</h4>
                      <p className="text-sm text-gray-400">Earn gift cards by reviewing software you've already used on platforms like G2. Share your genuine experiences and get rewarded.</p>
                   </div>
                </div>
             </div>
             {/* END NEW VALUE PROPOSITION LIST */}

             {submissionState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#00e5ff]/20 flex items-center justify-center mb-6">
                    <Radio className="w-10 h-10 text-[#00e5ff]" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-2">Access Granted</h3>
                  <p className="text-gray-400">Welcome aboard. Check your transmission feed (email) for boarding protocols.</p>
                  <button 
                    onClick={() => setSubmissionState('idle')}
                    className="mt-8 text-sm text-[#00e5ff] underline underline-offset-4 hover:text-white"
                  >
                    Register another passenger
                  </button>
                </motion.div>
             ) : (
               <form onSubmit={handleLeadGenSubmit} className="flex flex-col gap-6">
                  <div>
                     <label htmlFor="email" className="block text-xs font-mono text-[#00e5ff] uppercase tracking-widest mb-2">
                       Enter Your Uplink Coordinates (Email)
                     </label>
                     <input 
                       type="email" 
                       id="email"
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00e5ff] transition-colors"
                       placeholder="pilot@cloudship.com"
                     />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="w-2 h-2 bg-[#00e5ff] rounded-full animate-pulse" />
                        <span className="text-xs text-gray-300">Encrypted Frequency</span>
                     </div>
                     <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                        <Cpu className="w-4 h-4 text-[#d946ef]" />
                        <span className="text-xs text-gray-300">Direct Uplink</span>
                     </div>
                  </div>

                  {/* NEW DISCLOSURE - This is for the Boarding/Monetization form */}
                  <p className="text-[10px] text-center text-gray-400 font-mono leading-relaxed mt-2">
                     By providing your email, you acknowledge that we partner with 3rd party companies to assist in internet marketing efforts. You may receive communications about marketing services for your company. While we offer O.Mar 3.0, larger engagements may be referred to our trusted companions.
                  </p>
                  {/* END NEW DISCLOSURE */}

                  <button 
                    type="submit"
                    disabled={submissionState === 'loading'}
                    className="w-full bg-[#00e5ff] text-black font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-white transition-colors duration-300 flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:cursor-wait"
                    data-hover="true"
                  >
                    {submissionState === 'loading' ? 'Establishing Connection...' : 'Initialize Uplink'}
                    {submissionState !== 'loading' && <ArrowRight className="w-5 h-5" />}
                  </button>
                  
                  <p className="text-[10px] text-center text-gray-500 font-mono">
                    By connecting, you agree to our protocols of intergalactic engagement.
                  </p>
                </form>
             )}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-black backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
             <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white flex items-center gap-2">
               CLOUDSHIP <span className="text-xs align-top text-[#00e5ff]">Enterprise</span>
             </div>
             <div className="flex gap-2 text-xs font-mono text-gray-400">
               <span>Building the Future since 2012</span>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap">
            <a href="https://g.dev/cloudship999" className="text-gray-400 hover:text-[#00e5ff] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              G. Dev
            </a>
            <a href="https://www.linkedin.com/in/latoya-menyweather-4a5669329/" className="text-gray-400 hover:text-[#00e5ff] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              LinkedIn
            </a>
            <a href="https://github.com/trexcodess" className="text-gray-400 hover:text-[#00e5ff] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Github
            </a>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal (Modal content remains the same) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0a0a1a] border border-[#00e5ff]/30 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#00e5ff]/20 group/modal rounded-xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-[#00e5ff] hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedProject.id}
                    src={selectedProject.image} 
                    alt={selectedProject.name} 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 pb-12 md:p-12 flex flex-col justify-center relative">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 text-[#00e5ff] mb-4">
                     <span className="w-2 h-2 bg-[#d946ef] rounded-full animate-pulse" />
                     <span className="font-mono text-sm tracking-widest uppercase">Status: {selectedProject.day}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase leading-none mb-2 text-white">
                    {selectedProject.name}
                  </h3>
                  
                  <p className="text-lg text-[#d946ef] font-medium tracking-widest uppercase mb-6">
                    Sector: {selectedProject.genre}
                  </p>
                  
                  <div className="h-px w-20 bg-white/20 mb-6" />
                  
                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                    {selectedProject.description}
                  </p>

                  <div className="flex gap-4">
                     <button className="flex-1 py-3 border border-white/20 hover:bg-[#00e5ff] hover:text-black hover:border-[#00e5ff] transition-colors uppercase text-xs font-bold tracking-widest rounded">
                       View Schematics
                     </button>
                     <button className="p-3 border border-white/20 hover:bg-[#d946ef] hover:border-[#d946ef] transition-colors rounded">
                        <Share2 className="w-4 h-4" />
                     </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;