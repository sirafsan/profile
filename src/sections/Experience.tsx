import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  location: string;
  period: string;
  description: string[];
  type: 'current' | 'previous';
}

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      company: 'Printyco LLC',
      position: 'System Analyst UI & UX Focus',
      location: 'Bangladesh',
      period: 'Jan 2026 – Present',
      type: 'current',
      description: [
        'Leading UI/UX analysis for system optimization and user experience enhancement',
        'Collaborating with development teams to implement data-driven design decisions',
        'Conducting user research and usability testing to improve product interfaces',
      ],
    },
    {
      id: 2,
      company: 'Walton Digi-Tech Industries',
      position: 'Principal Officer (IT Consultant)',
      location: 'Bangladesh',
      period: 'May 2022 – June 2023',
      type: 'previous',
      description: [
        'Supported business and marketing teams by analyzing sales and operational data using Excel',
        'Prepared regular performance and sales reports to support management decision-making',
        'Conducted market and customer research to identify trends and improvement areas',
        'Assisted with customer data tracking, documentation, and reporting activities',
        'Collaborated with cross-functional teams to support IT-enabled business operations',
      ],
    },
    {
      id: 3,
      company: 'Evaly Ltd.',
      position: 'Customer IT Support Executive',
      location: 'Bangladesh',
      period: 'March 2021 – May 2022',
      type: 'previous',
      description: [
        'Provided application and IT support to users, resolving basic system and application issues',
        'Documented recurring issues and assisted in process improvement initiatives',
        'Coordinated with internal teams for issue escalation and resolution',
      ],
    },
    {
      id: 4,
      company: 'Airtel Telecom',
      position: 'Intern – Customer Support',
      location: 'Bangladesh',
      period: 'August 2020 – March 2021',
      type: 'previous',
      description: [
        'Assisted in customer service and basic IT support activities',
        'Supported reporting, documentation, and data entry tasks using Excel',
        'Gained exposure to telecom systems and IT support workflows',
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline draw animation
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Cards 3D flip in
      gsap.fromTo(
        '.experience-card',
        { rotateX: 90, opacity: 0 },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-cyan" />
            <span className="text-cyan text-sm font-medium uppercase tracking-wider">
              Career Journey
            </span>
            <div className="w-12 h-px bg-cyan" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>

          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            A track record of delivering data-driven solutions and IT excellence
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-white/10">
            <div
              className="timeline-line absolute inset-0 bg-gradient-to-b from-cyan via-cyan/50 to-transparent origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`experience-card relative pl-12 lg:pl-0 ${
                  index % 2 === 0 ? 'lg:pr-[50%]' : 'lg:pl-[50%]'
                }`}
                style={{ perspective: '1000px' }}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute top-6 w-4 h-4 rounded-full border-2 ${
                    exp.type === 'current'
                      ? 'bg-cyan border-cyan animate-pulse'
                      : 'bg-dark-bg border-cyan'
                  } ${index % 2 === 0 ? 'left-2 lg:left-[calc(50%-8px)]' : 'left-2 lg:left-[calc(50%-8px)]'}`}
                />

                {/* Card */}
                <div
                  className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan/30 transition-all duration-500 ${
                    index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-cyan" />
                        <span className="text-cyan text-sm font-medium">
                          {exp.type === 'current' ? 'Current Position' : 'Previous Role'}
                        </span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-white">
                        {exp.position}
                      </h3>
                      <p className="text-white/70">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedId === exp.id ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <ul className="space-y-2 pt-4 border-t border-white/10">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-white/70"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="mt-4 flex items-center gap-2 text-cyan text-sm hover:underline"
                  >
                    {expandedId === exp.id ? 'Show Less' : 'Show More'}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        expandedId === exp.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
