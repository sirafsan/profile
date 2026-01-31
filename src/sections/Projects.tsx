import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Cpu, BarChart2, Zap, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  icon: React.ElementType;
  link?: string;
  github?: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Smart Home Automation System',
      category: 'Computer Vision',
      description:
        'An intelligent home automation system controlled through computer vision and gesture recognition. The system uses deep learning models to interpret user gestures and control various home appliances, providing a seamless and contactless user experience.',
      technologies: ['Python', 'OpenCV', 'TensorFlow', 'IoT', 'Deep Learning'],
      image: '/project-smart-home.jpg',
      icon: Cpu,
      link: '#',
      github: '#',
    },
    {
      id: 2,
      title: 'Cricket Score Prediction',
      category: 'Machine Learning',
      description:
        'A machine learning-based system for predicting One Day International cricket match scores. Published in IEEE 2024, this project utilizes various ML algorithms including Random Forest, SVM, and Neural Networks to analyze historical data and predict match outcomes with high accuracy.',
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Machine Learning'],
      image: '/project-cricket.jpg',
      icon: BarChart2,
      link: '#',
      github: '#',
    },
    {
      id: 3,
      title: 'Energy Aware Planning System',
      category: 'Sustainable Development',
      description:
        'An energy-aware planning approach considering the cost of electrical energy for sustainable development. Published in IEEE 2024, this research focuses on optimizing energy consumption patterns and reducing costs while maintaining operational efficiency.',
      technologies: ['Python', 'Optimization', 'Data Analysis', 'Energy Modeling'],
      image: '/project-energy.jpg',
      icon: Zap,
      link: '#',
      github: '#',
    },
    {
      id: 4,
      title: 'Clone Detection Analysis',
      category: 'Big Data & Software Engineering',
      description:
        'A systematic clone detection performance analysis on the BigCloneBench dataset. Published in IEEE 2025, this project evaluates various code clone detection techniques and provides insights into their effectiveness and limitations.',
      technologies: ['Java', 'Python', 'Big Data', 'Code Analysis', 'NLP'],
      image: '/project-clone-detection.jpg',
      icon: Code2,
      link: '#',
      github: '#',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance animation
      gsap.fromTo(
        '.project-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${projects[activeProject]?.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(100px) brightness(0.3)',
            transition: 'background-image 0.5s ease',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-cyan" />
            <span className="text-cyan text-sm font-medium uppercase tracking-wider">
              Featured Work
            </span>
            <div className="w-12 h-px bg-cyan" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Research & <span className="text-gradient">Projects</span>
          </h2>

          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Innovative solutions at the intersection of data science, machine learning, and real-world applications
          </p>
        </div>

        {/* Project Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group relative"
              onMouseEnter={() => setActiveProject(index)}
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-dark-card border border-white/10 hover:border-cyan/30 transition-all duration-500">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/50 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan/20 border border-cyan/30 text-cyan text-sm">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center flex-shrink-0">
                      <project.icon className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/60 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => alert('Project details coming soon!')}
                      className="flex-1 px-4 py-2 bg-cyan/10 text-cyan rounded-lg hover:bg-cyan/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </button>
                    <button
                      onClick={() => alert('GitHub repository coming soon!')}
                      className="px-4 py-2 bg-white/5 text-white/70 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Projects Note */}
        <div className="mt-12 text-center">
          <p className="text-white/50 mb-4">More projects coming soon</p>
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === 0 ? 'bg-cyan' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
