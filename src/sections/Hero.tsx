import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Download, Linkedin, Mail, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Profile image entrance
      gsap.fromTo(
        imageRef.current,
        { scale: 0, rotationY: 180, opacity: 0 },
        {
          scale: 1,
          rotationY: 0,
          opacity: 1,
          duration: 1.4,
          delay: 0.2,
          ease: 'expo.out',
        }
      );

      // Name character reveal
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 1,
            delay: 0.6,
            stagger: 0.03,
            ease: 'expo.out',
          }
        );
      }

      // Title typewriter effect
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1,
          ease: 'power2.out',
        }
      );

      // Description fade in
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1.2,
          ease: 'power2.out',
        }
      );

      // CTA buttons pop in
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button, a');
        gsap.fromTo(
          buttons,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 1.4,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.5)',
          }
        );
      }

      // Scroll-based parallax
      gsap.to(imageRef.current, {
        y: -100,
        filter: 'blur(5px)',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(nameRef.current, {
        x: -50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (e.clientY - centerY) / 20;
    const rotateY = (centerX - e.clientX) / 20;
    
    gsap.to(imageRef.current, {
      rotateX: Math.max(-15, Math.min(15, rotateX)),
      rotateY: Math.max(-15, Math.min(15, rotateY)),
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const nameText = "Sazzadul Islam Shovon";

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Radial Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan/5 via-transparent to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Name */}
            <h1
              ref={nameRef}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 overflow-hidden"
            >
              {nameText.split('').map((char, index) => (
                <span
                  key={index}
                  className="char inline-block"
                  style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            {/* Title */}
            <p
              ref={titleRef}
              className="text-xl sm:text-2xl text-cyan font-medium mb-6"
            >
              Data Analyst & Information Systems Professional
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="text-white/70 text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Transforming complex data into actionable insights. Specializing in data visualization, 
              statistical analysis, and business intelligence solutions to drive strategic decision-making.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-6 py-3 bg-cyan text-dark-bg font-medium rounded-lg hover:bg-cyan/90 transition-all duration-300 flex items-center gap-2"
              >
                View My Work
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
              
              <button
                onClick={() => alert('CV download coming soon!')}
                className="px-6 py-3 bg-white/5 text-white border border-white/20 rounded-lg hover:bg-white/10 hover:border-cyan/50 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CV
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8 justify-center lg:justify-start">
              <a
                href="https://www.linkedin.com/in/s-isl-s/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/70 hover:text-cyan hover:bg-cyan/10 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:sazzadul.eee@gmail.com"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/70 hover:text-cyan hover:bg-cyan/10 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://scholar.google.com/citations?user=thkLVIkAAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/70 hover:text-cyan hover:bg-cyan/10 transition-all duration-300"
              >
                <FileText className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="relative"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-cyan/20 blur-3xl scale-110 animate-pulse" />
              
              {/* Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-cyan/30 glow-cyan animate-float">
                <img
                  src="/profile-hero.png"
                  alt="Sazzadul Islam Shovon"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan/20 via-transparent to-transparent" />
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-dark-card border border-cyan/30 rounded-full text-sm text-cyan animate-float" style={{ animationDelay: '1s' }}>
                SQL Expert
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-dark-card border border-cyan/30 rounded-full text-sm text-cyan animate-float" style={{ animationDelay: '2s' }}>
                Data Visualization
              </div>
              <div className="absolute top-1/2 -right-8 px-4 py-2 bg-dark-card border border-cyan/30 rounded-full text-sm text-cyan animate-float" style={{ animationDelay: '1.5s' }}>
                Python
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-sm">Scroll to explore</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
