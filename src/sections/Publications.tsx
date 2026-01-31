import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, ExternalLink, Award, BookOpen, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Publication {
  id: number;
  title: string;
  venue: string;
  year: string;
  type: 'IEEE' | 'International' | 'Research';
  description: string;
  link?: string;
}

const Publications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const publications: Publication[] = [
    {
      id: 1,
      title: 'Smart Home Automation System Controlling Through Computer Vision',
      venue: 'International Conference',
      year: '2024',
      type: 'International',
      description:
        'A comprehensive study on implementing computer vision techniques for smart home automation, enabling gesture-based control of home appliances.',
      link: '#',
    },
    {
      id: 2,
      title: 'One Day International Cricket Match Score Prediction Using Machine Learning Approaches',
      venue: 'IEEE Conference',
      year: '2024',
      type: 'IEEE',
      description:
        'Applied various machine learning algorithms to predict cricket match scores with improved accuracy using historical match data.',
      link: '#',
    },
    {
      id: 3,
      title: 'Energy Aware Planning Approach Considering Cost of Electrical Energy for Sustainable Development',
      venue: 'IEEE Conference',
      year: '2024',
      type: 'IEEE',
      description:
        'Proposed an optimization framework for energy consumption planning that balances cost efficiency with sustainability goals.',
      link: '#',
    },
    {
      id: 4,
      title: 'A Systematic Clone Detection Performance Analysis on BigCloneBench Dataset',
      venue: 'IEEE Conference',
      year: '2025',
      type: 'IEEE',
      description:
        'Comprehensive evaluation of code clone detection techniques using the BigCloneBench dataset, providing insights into method effectiveness.',
      link: '#',
    },
    {
      id: 5,
      title: 'AI-Powered Skin Disease Detection: A Deep Learning Approach with ResNet50 and EfficientNetB0',
      venue: 'Research Paper',
      year: '2024',
      type: 'Research',
      description:
        'Developed a deep learning model for automated skin disease classification using state-of-the-art CNN architectures.',
      link: '#',
    },
    {
      id: 6,
      title: 'Evaluating the Privacy and Security Implications of Mobile Apps',
      venue: 'Research Paper',
      year: '2024',
      type: 'Research',
      description:
        'Analyzed privacy and security concerns in mobile applications, proposing frameworks for better user data protection.',
      link: '#',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance
      gsap.fromTo(
        '.publication-card',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'IEEE':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'International':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  return (
    <section
      id="publications"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-cyan" />
            <span className="text-cyan text-sm font-medium uppercase tracking-wider">
              Academic Contributions
            </span>
            <div className="w-12 h-px bg-cyan" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Research <span className="text-gradient">Publications</span>
          </h2>

          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Peer-reviewed publications in IEEE and international conferences showcasing innovative research
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <Award className="w-6 h-6 text-cyan mx-auto mb-2" />
            <div className="text-2xl font-heading font-bold text-white">3</div>
            <div className="text-white/50 text-sm">IEEE Papers</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <BookOpen className="w-6 h-6 text-cyan mx-auto mb-2" />
            <div className="text-2xl font-heading font-bold text-white">6</div>
            <div className="text-white/50 text-sm">Publications</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <Calendar className="w-6 h-6 text-cyan mx-auto mb-2" />
            <div className="text-2xl font-heading font-bold text-white">2024-25</div>
            <div className="text-white/50 text-sm">Publication Years</div>
          </div>
        </div>

        {/* Publications Grid */}
        <div ref={trackRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="publication-card group relative"
            >
              <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan/30 transition-all duration-500 hover:transform hover:-translate-y-2">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                      pub.type
                    )}`}
                  >
                    {pub.type}
                  </div>
                  <span className="text-white/50 text-sm">{pub.year}</span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
                  <FileText className="w-6 h-6 text-cyan" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-heading font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan transition-colors">
                  {pub.title}
                </h3>

                {/* Venue */}
                <p className="text-cyan/70 text-sm mb-3">{pub.venue}</p>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
                  {pub.description}
                </p>

                {/* Link */}
                <a
                  href={pub.link}
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Publication link coming soon!');
                  }}
                  className="inline-flex items-center gap-2 text-cyan text-sm hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Publication
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Google Scholar Link */}
        <div className="mt-12 text-center">
          <a
            href="https://scholar.google.com/citations?user=thkLVIkAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-300"
          >
            <BookOpen className="w-5 h-5 text-cyan" />
            <span className="text-white">View All Publications on Google Scholar</span>
            <ExternalLink className="w-4 h-4 text-white/50" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Publications;
