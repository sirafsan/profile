import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Database,
  Code2,
  BarChart3,
  FileSpreadsheet,
  GitBranch,
  Cloud,
  LineChart,
  Calculator,
  Layers,
  Settings,
  Server,
  Palette,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ElementType;
  level: number;
}

interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('data');

  const skillCategories: SkillCategory[] = [
    {
      id: 'data',
      title: 'Data & Analytics',
      skills: [
        { name: 'SQL', icon: Database, level: 95 },
        { name: 'Python', icon: Code2, level: 90 },
        { name: 'Tableau', icon: BarChart3, level: 90 },
        { name: 'Excel', icon: FileSpreadsheet, level: 95 },
        { name: 'Power BI', icon: LineChart, level: 80 },
        { name: 'Statistical Analysis', icon: Calculator, level: 85 },
      ],
    },
    {
      id: 'programming',
      title: 'Programming',
      skills: [
        { name: 'Python', icon: Code2, level: 90 },
        { name: 'R', icon: Calculator, level: 80 },
        { name: 'JavaScript', icon: Code2, level: 7905 },
        { name: 'HTML/CSS', icon: Palette, level: 90 },
      ],
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      skills: [
        { name: 'Git', icon: GitBranch, level: 80 },
        { name: 'Jupyter', icon: Code2, level: 85 },
        { name: 'AWS', icon: Cloud, level: 70 },
        { name: 'Google Analytics', icon: LineChart, level: 75 },
        { name: 'SAP', icon: Server, level: 65 },
      ],
    },
  ];

  const activeSkills = skillCategories.find((cat) => cat.id === activeCategory)?.skills || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Galaxy implosion
      gsap.fromTo(
        galaxyRef.current,
        { scale: 1.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate skill nodes when category changes
  useEffect(() => {
    if (!galaxyRef.current) return;

    const nodes = galaxyRef.current.querySelectorAll('.skill-node');
    gsap.fromTo(
      nodes,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'elastic.out(1, 0.5)',
      }
    );
  }, [activeCategory]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-cyan" />
            <span className="text-cyan text-sm font-medium uppercase tracking-wider">
              Expertise
            </span>
            <div className="w-12 h-px bg-cyan" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>

          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for data analysis, visualization, and business intelligence
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-cyan text-dark-bg'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Skills Galaxy */}
        <div
          ref={galaxyRef}
          className="relative"
          style={{ perspective: '1000px' }}
        >
          {/* Central Hub */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-cyan/10 border-2 border-cyan/30 flex items-center justify-center animate-pulse-glow">
                <Layers className="w-12 h-12 text-cyan" />
              </div>
              <div className="absolute inset-0 rounded-full border border-cyan/20 animate-ping" style={{ animationDuration: '3s' }} />
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {activeSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-node group relative"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan/50 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
                    <skill.icon className="w-6 h-6 text-cyan" />
                  </div>

                  {/* Name */}
                  <h3 className="text-white font-medium mb-2">{skill.name}</h3>

                  {/* Progress Bar */}
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan to-cyan/50 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  {/* Level */}
                  <div className="text-cyan/70 text-sm mt-2">{skill.level}%</div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
                </div>
              </div>
            ))}
          </div>

          {/* Connection Lines (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none -z-10"
            style={{ opacity: 0.2 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
                <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
            <Settings className="w-8 h-8 text-cyan mx-auto mb-3" />
            <h4 className="text-white font-medium mb-1">Business Process</h4>
            <p className="text-white/50 text-sm">KPI tracking & reporting</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
            <Server className="w-8 h-8 text-cyan mx-auto mb-3" />
            <h4 className="text-white font-medium mb-1">IT Support</h4>
            <p className="text-white/50 text-sm">System & application support</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
            <Users className="w-8 h-8 text-cyan mx-auto mb-3" />
            <h4 className="text-white font-medium mb-1">Collaboration</h4>
            <p className="text-white/50 text-sm">Cross-functional teamwork</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
