import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: TrendingUp, value: 2, suffix: '+', label: 'Years Experience' },
    { icon: Users, value: 50, suffix: '+', label: 'Projects Completed' },
    { icon: Award, value: 6, suffix: '', label: 'Publications' },
    { icon: Zap, value: 25, suffix: '%', label: 'Efficiency Boost' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading mask reveal
      gsap.fromTo(
        headingRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Content staggered slide
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll('p');
        gsap.fromTo(
          paragraphs,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      // Image iris open
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(100% at 50% 50%)',
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Image inner zoom on scroll
      const img = imageRef.current?.querySelector('img');
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.2 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      // Stats counter animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-value');
        statItems.forEach((item, index) => {
          const targetValue = stats[index].value;
          gsap.fromTo(
            item,
            { innerText: 0 },
            {
              innerText: targetValue,
              duration: 2,
              ease: 'power2.out',
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 80%',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-cyan" />
              <span className="text-cyan text-sm font-medium uppercase tracking-wider">
                About Me
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8"
            >
              Turning Data Into{' '}
              <span className="text-gradient">Strategic Insights</span>
            </h2>

            {/* Content */}
            <div ref={contentRef} className="space-y-6">
              <p className="text-white/70 text-lg leading-relaxed">
                I am a results-driven Data Analyst with a Master's in Information Systems from{' '}
                <span className="text-cyan font-medium">Central Michigan University</span>. 
                My expertise lies in bridging the gap between raw data and strategic decision-making.
              </p>

              <p className="text-white/70 text-lg leading-relaxed">
                With a strong foundation in{' '}
                <span className="text-cyan hover:glow-cyan-text transition-all cursor-default">SQL</span>,{' '}
                <span className="text-cyan hover:glow-cyan-text transition-all cursor-default">Python</span>, and{' '}
                <span className="text-cyan hover:glow-cyan-text transition-all cursor-default">Tableau</span>, 
                I have successfully delivered insights that increased operational efficiency by 25% in my previous roles.
              </p>

              <p className="text-white/70 text-lg leading-relaxed">
                My background in Electrical & Electronic Engineering from Daffodil International University 
                gives me a unique analytical edge, allowing me to approach complex problems with systematic precision.
              </p>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan/30 transition-all duration-300 group"
                >
                  <stat.icon className="w-6 h-6 text-cyan mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-white">
                    <span className="stat-value">0</span>
                    {stat.suffix}
                  </div>
                  <div className="text-white/50 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden aspect-[3/4]"
            >
              <img
                src="/about-image.jpg"
                alt="Working with data"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent" />
              
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-dark-card/90 backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Data-Driven Results</div>
                    <div className="text-white/50 text-sm">Proven track record of success</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-cyan/20 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-cyan/10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
