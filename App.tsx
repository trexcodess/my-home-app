import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Ticket, Globe, Zap, Cpu, MapPin, Menu, X, Calendar, ArrowRight, Share2, Shield, Radio, Wind, Rocket, Cloud, Code, Database, Lock } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import { Artist } from './types';
// images
import AfroImage5 from './src/assets/images/Afro_City_5.jpg'
import AfroImage3 from './src/assets/images/AfroCity_3.jpg'
import AfroImage4 from './src/assets/images/AfroCity_4.jpg'
import MarketOS from './src/assets/images/Market_OS.png'
import Dispatch from './src/assets/images/Dispatch_0.png'
import FEAgency from './src/assets/images/FE_Agency.png'
import Saturn from './src/assets/images/Saturn_Platform.png'


// UPDATED PROJECTS ARRAY (SHIP MODULES)
const PROJECTS: Artist[] = [
{ 
    id: '1', 
    name: 'Latitude', 
    genre: 'DMusic/Film/TV', // Updated Genre Name
    day: 'January 2026', 
    image: AfroImage5, 
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1',
    description: 'A decentralized music ecosystem powered by Web3. Dedicated to protecting artist ownership and ensuring direct, transparent royalty distribution through immutable smart contracts.'
  },
  { 
    id: '2', 
    name: 'Market Leader OS', 
    genre: 'Marketing', // Updated Genre Name
    day: '2026', 
    image: MarketOS, 
    description: 'You’re currently playing the game of "content creation," where you are at the mercy of the algorithm. To secure your future, you need to transition into a Market Leader. This guide outlines your "path out of YouTube"—moving from renting an audience on a social platform to owning an audience on your own website.'
  },
  { 
    id: '3', 
    name: 'O.Mar 3.0', 
    genre: 'Marketing', // Updated Genre Name
    day: '2026', 
    image: AfroImage4, 
    description: 'Ask O.Mar 3.0 how to apply the four basic, unchanging MLP principles—Research, Conversions, Traffic, and Product—to your current website strategy.'
  },
  { 
    id: '4', 
    name: 'Dispatch', 
    genre: 'D News', // Updated Genre Name
    day: 'August 2026', 
    image: Dispatch,
    description: 'The new way to communicate and get curated, reliable news in one place. Dispatch is a unique news and communication platform that blends modern media with a nostalgic, unique interface.'
  },
  { 
    id: '5', 
    name: 'Fauna Echo', 
    genre: 'Animal', // Updated Genre Name
    day: 'June 2026', 
    image: FEAgency,
    description: 'Turn your sightings into rescues with The Fauna Echo Agency—the smart, community-powered app dedicated to reuniting lost pets and safeguarding local wildlife.'
  },
  { 
    id: '6', 
    name: 'Saturn', 
    genre: 'Education', // Updated Genre Name
    day: 'March 2026', 
    image: Saturn,
    description: 'Project Saturn is a futuristic, personalized learning platform for the digital age (circa 2077).Imagine a global educational  experience that instantly adapts to your unique learning style, interests, and goals. Saturn is not just a school; it’s an immersive, decentralized digital ecosystem built for digital natives seeking future-ready skills.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Artist | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false); // NEW: Video modal state
  
  // Lead Gen State
  const [email, setEmail] = useState('');
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success'>('idle');

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'ArrowLeft') navigateProject('prev');
      if (e.key === 'ArrowRight') navigateProject('next');
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setIsVideoModalOpen(false); // Close video modal too
      }
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
  
  // NEW: Schematics Click Handler
  const handleSchematicsClick = () => {
    if (selectedProject && selectedProject.videoUrl) {
      setIsVideoModalOpen(true);
    }
  };

  // NEW: Social Share Handler (Mockup)
  const handleShareClick = () => {
    if (selectedProject) {
        const shareText = `Check out the ${selectedProject.name} module from The Cloudship Enterprise!`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${window.location.href}`, '_blank');
    }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#00E5CC] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50 flex items-center gap-2">
           <span className="text-[#00E5CC]">☁</span> TCE
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Innovations', 'About Us', 'Boarding'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="hover:text-[#00E5CC] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('boarding')}
          className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#00E5CC] hover:text-black hover:border-[#00E5CC] transition-all duration-300 text-white cursor-pointer bg-transparent"
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
            {['Innovations', 'About Us', 'Boarding'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-4xl font-heading font-bold text-white hover:text-[#00E5CC] transition-colors uppercase bg-transparent border-none"
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
            className="flex items-center gap-3 md:gap-6 text-xs md:text-sm font-mono text-[#00E5CC] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-[#00E5CC]/20"
          >
            <span>Est. 2012</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#FFC04C] rounded-full animate-pulse"/>
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
               className="absolute -z-20 w-[40vw] h-[40vw] bg-[#00E5CC]/10 blur-[80px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 8, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#00E5CC]/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-2xl font-light max-w-xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-4"
          >
            Navigating the currents of innovation. <br/>
            <span className="text-[#00E5CC]">Building a future where technology elevates the soul.</span>
          </motion.p>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-[#00E5CC] text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(0,229,204,0.4)]">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5CC] to-[#FFC04C]">Modules</span>
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

      {/* ABOUT US SECTION - OPTION 2 MISSION STATEMENT */}
      <section id="about-us" className="relative z-10 py-20 md:py-32 bg-[#0a0a1a]/80 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        {/* Decorative blurred circle */}
        <div className="absolute top-1/2 left-[-20%] w-[50vw] h-[50vw] bg-[#00E5CC]/10 rounded-full blur-[60px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Visual Side */}
            <div className="lg:col-span-7 relative h-[400px] md:h-[600px] w-full order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5CC] to-[#FFC04C] rounded-3xl -rotate-3 opacity-30 blur-xl" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <img 
                  src={AfroImage3}
                  alt="Afrofuturistic City" 
                  className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 will-change-transform grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                   <div className="flex items-center gap-2 mb-2">
                      <Wind className="text-[#00E5CC]" />
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
              <div className="h-1 w-20 bg-[#FFC04C] mb-8" />
              
              {/* OPTION 2 MISSION STATEMENT */}
              <p className="text-lg md:text-xl text-gray-200 mb-6 font-light leading-relaxed">
                <span className="text-[#00E5CC] font-bold">Empowering the community through knowledge and innovation.</span> Our mission is to demystify technology for all, while building innovative platforms that protect your privacy and keep your creativity owned by you.
              </p>
              <p className="text-base text-gray-400 mb-8 leading-relaxed">
                 We stand as guardians of the digital realm. By fusing afrofuturism with a secure infrastructure, we ensure that as we ascend technologically, we leave no one behind and leave no user unprotected.
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
                    <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-[#00E5CC]/20">
                      <feature.icon className="w-6 h-6 text-[#00E5CC]" />
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

    {/* BOARDING SECTION - REVISED FOR MLP & O.Mar 3.0 LEAD GEN */}
      <section id="boarding" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-black/60 backdrop-blur-xl border-t border-[#00E5CC]/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
             <h2 className="text-4xl md:text-8xl font-heading font-bold text-white mb-4">
               ACTIVATE YOUR <span className="text-[#00E5CC]">MLP UPLINK</span>
             </h2>
             <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
               Secure your boarding pass and join **The Cloudship Enterprise's Marketing & Lead Protocol (MLP)**. This is your gateway to both **exclusive development insights** and **lucrative opportunities to earn rewards, cash, and crypto** by sharing your valuable opinions and engaging with innovative marketing products.
             </p>
          </div>
          
          <div className="relative w-full max-w-2xl mx-auto bg-[#0a0a1a] border border-[#00E5CC]/30 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(0,229,204,0.2)]">
             {/* Decorative Elements */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00E5CC] to-transparent" />
             <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#00E5CC]" />
             <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#00E5CC]" />
             
             {/* Value Proposition List */}
             <h3 className="text-xl font-heading font-bold text-white mb-6">Ways O.Mar 3.0 Connects You to Opportunities:</h3>
             <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <Ticket className="w-6 h-6 text-[#00E5CC] shrink-0 mt-1" />
                    <div>
                        <h4 className="text-lg font-bold text-white">Brave Browser & Content Creation</h4>
                        <p className="text-sm text-gray-400">Simply browse the internet as usual and earn **B.A.T tokens**. Content creators can also earn crypto tips directly from their audience.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <MapPin className="w-6 h-6 text-[#FFC04C] shrink-0 mt-1" />
                    <div>
                        <h4 className="text-lg font-bold text-white">User Interviews & Surveys</h4>
                        <p className="text-sm text-gray-400">Participate in one-on-one surveys and focus groups, earning guaranteed gift cards or cash for your valuable insights. Your opinion drives innovation!</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <Share2 className="w-6 h-6 text-[#00E5CC] shrink-0 mt-1" />
                    <div>
                        <h4 className="text-lg font-bold text-white">Software Reviews (G2 & More)</h4>
                        <p className="text-sm text-gray-400">Earn gift cards for providing honest reviews of software you've already used. Help others make informed decisions and get rewarded.</p>
                    </div>
                </div>
             </div>
             {/* End Value Proposition List */}

             {submissionState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#00E5CC]/20 flex items-center justify-center mb-6">
                    <Radio className="w-10 h-10 text-[#00E5CC]" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-2">MLP Uplink Established</h3>
                  <p className="text-gray-400">Welcome aboard. O.Mar 3.0 will transmit boarding protocols and first earning opportunities to your frequency (email).</p>
                  <button 
                    onClick={() => setSubmissionState('idle')}
                    className="mt-8 text-sm text-[#00E5CC] underline underline-offset-4 hover:text-white"
                  >
                    Register another passenger
                  </button>
                </motion.div>
             ) : (
               <form onSubmit={handleLeadGenSubmit} className="flex flex-col gap-6">
                 <div>
                   <label htmlFor="email" className="block text-xs font-mono text-[#00E5CC] uppercase tracking-widest mb-2">
                     Enter Coordinates (Email)
                   </label>
                   <input 
                     type="email" 
                     id="email"
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00E5CC] transition-colors"
                     placeholder="pilot@cloudship.com"
                   />
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                     <div className="w-2 h-2 bg-[#00E5CC] rounded-full animate-pulse" />
                     <span className="text-xs text-gray-300">Encrypted Frequency</span>
                   </div>
                   <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                     <Cpu className="w-4 h-4 text-[#FFC04C]" />
                     <span className="text-xs text-gray-300">O.Mar 3.0 Assisted</span>
                   </div>
                 </div>

                 {/* REVISED DISCLOSURE */}
                 <p className="text-[10px] text-center text-gray-400 font-mono leading-relaxed mt-2">
                   By providing your email, you acknowledge that **O.Mar 3.0, our MLP AI**, will assist in connecting you with relevant 3rd party marketing partners. You may receive targeted communications about marketing products and opportunities to earn rewards. While we offer O.Mar 3.0's capabilities, specific engagements may be facilitated by our trusted companions.
                 </p>
                 {/* END REVISED DISCLOSURE */}

                 <button 
                   type="submit"
                   disabled={submissionState === 'loading'}
                   className="w-full bg-[#00E5CC] text-black font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-white transition-colors duration-300 flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:cursor-wait"
                   data-hover="true"
                 >
                   {submissionState === 'loading' ? 'Establishing Connection...' : 'Initialize MLP Uplink'}
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
               CLOUDSHIP <span className="text-xs align-top text-[#00E5CC]">Enterprise</span>
             </div>
             <div className="flex gap-2 text-xs font-mono text-gray-400">
               <span>Building the Future since 2012</span>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap">
            <a href="https://g.dev//cloudship999" className="text-gray-400 hover:text-[#00E5CC] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              G. Dev
            </a>
            <a href="https://linkedin.com/company/thecloudshipenterprise" className="text-gray-400 hover:text-[#00E5CC] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              LinkedIn
            </a>
            <a href="https://github.com/trexcodess" className="text-gray-400 hover:text-[#00E5CC] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Github
            </a>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal (Main Modal) */}
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
              className="relative w-full max-w-5xl bg-[#0a0a1a] border border-[#00E5CC]/30 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#00E5CC]/20 group/modal rounded-xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-[#00E5CC] hover:text-black transition-colors"
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
                  <div className="flex items-center gap-3 text-[#00E5CC] mb-4">
                     <span className="w-2 h-2 bg-[#FFC04C] rounded-full animate-pulse" />
                     <span className="font-mono text-sm tracking-widest uppercase">Status: {selectedProject.day}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase leading-none mb-2 text-white">
                    {selectedProject.name}
                  </h3>
                  
                  {/* UPDATED SECTOR TITLE */}
                  <p className="text-lg text-[#FFC04C] font-medium tracking-widest uppercase mb-6">
                    PROTOCOL: {selectedProject.genre}
                  </p>
                  
                  <div className="h-px w-20 bg-white/20 mb-6" />
                  
                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                    {selectedProject.description}
                  </p>

                  <div className="flex gap-4">
                     <button 
                        onClick={handleSchematicsClick} // NEW CLICK HANDLER
                        disabled={!selectedProject.videoUrl} // Disable if no video
                        className="flex-1 py-3 border border-white/20 hover:bg-[#00E5CC] hover:text-black hover:border-[#00E5CC] transition-colors uppercase text-xs font-bold tracking-widest rounded disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {selectedProject.videoUrl ? 'View Schematics (Video)' : 'Schematics (Unavailable)'}
                     </button>
                     <button 
                        onClick={handleShareClick} // NEW CLICK HANDLER
                        className="p-3 border border-white/20 hover:bg-[#FFC04C] hover:border-[#FFC04C] transition-colors rounded"
                     >
                        <Share2 className="w-4 h-4" />
                     </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW: Project Video Schematics Modal */}
      <AnimatePresence>
            {isVideoModalOpen && selectedProject && selectedProject.videoUrl && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsVideoModalOpen(false)}
                    className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-4xl h-auto aspect-video bg-black border border-[#00E5CC] shadow-2xl rounded-xl overflow-hidden cursor-auto"
                    >
                        <button
                            onClick={() => setIsVideoModalOpen(false)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-[#00E5CC] hover:text-black transition-colors"
                            data-hover="true"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <iframe
                            src={selectedProject.videoUrl}
                            title={`${selectedProject.name} Ad`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default App;