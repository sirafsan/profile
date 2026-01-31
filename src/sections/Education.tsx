import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  location: string;
  period: string;
  gpa?: string;
  achievements: string[];
  icon: React.ElementType;
}

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const education: EducationItem[] = [
    {
      id: 1,
      institution: 'Central Michigan University',
      degree: 'Master of Science in Information Systems',
      location: 'Mount Pleasant, MI, USA',
      period: 'Graduation: December 2025',
      gpa: '3.17 / 4.00',
      achievements: [
        'Focus on Data Analytics and Business Intelligence',
        'Advanced coursework in Database Management',
        'IT Strategy and Management specialization',
      ],
      icon: GraduationCap,
    },
    {
      id: 2,
      institution: 'Daffodil International University',
      degree: 'Bachelor of Science in Electrical & Electronic Engineering',
      location: 'Dhaka, Bangladesh',
      period: 'Graduation: May 2019',
      achievements: [
        'Strong foundation in analytical thinking',
        'Programming and system design coursework',
        'Research methodology and data analysis training',
      ],
      icon: BookOpen,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance
      gsap.fromTo(
        '.education-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-cyan" />
            <span className="text-cyan text-sm font-medium uppercase tracking-wider">
              Academic Background
            </span>
            <div className="w-12 h-px bg-cyan" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Education & <span className="text-gradient">Certifications</span>
          </h2>

          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            A strong academic foundation combining technical expertise with business acumen
          </p>
        </div>

        {/* Education Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 mb-16">
          {education.map((edu) => (
            <div key={edu.id} className="education-card group">
              <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan/30 transition-all duration-500 hover:transform hover:-translate-y-2">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan/20 transition-colors">
                    <edu.icon className="w-7 h-7 text-cyan" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan transition-colors">
                      {edu.institution}
                    </h3>
                    <div className="flex items-center gap-2 text-white/50 text-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </div>
                  </div>
                </div>

                {/* Degree */}
                <div className="mb-4">
                  <p className="text-cyan font-medium">{edu.degree}</p>
                  <div className="flex items-center gap-2 text-white/50 text-sm mt-1">
                    <Calendar className="w-4 h-4" />
                    {edu.period}
                  </div>
                </div>

                {/* GPA */}
                {edu.gpa && (
                  <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-cyan/5 border border-cyan/20">
                    <Award className="w-5 h-5 text-cyan" />
                    <span className="text-white">GPA: {edu.gpa}</span>
                  </div>
                )}

                {/* Achievements */}
                <div className="space-y-2">
                  {edu.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-white/70"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 flex-shrink-0" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certification */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-heading font-bold text-white text-center mb-6">
            Professional Certifications
          </h3>
          
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan/30 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-cyan" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Advanced UI & UX Design</h4>
                <p className="text-white/50 text-sm">Ministry of Information, Bangladesh</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-cyan/10 text-cyan text-sm">
                Certified
              </div>
            </div>
          </div>
        </div>

        {/* Work Authorization */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400">
              F-1 OPT Approved • Eligible to work in the U.S.
            </span>
          </div>
          <p className="text-white/50 text-sm mt-3">
            Open to relocation within the United States
          </p>
        </div>
      </div>
    </section>
  );
};

export default Education;
