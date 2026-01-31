import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, FileText, Github, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'sazzadul.eee@gmail.com',
      href: 'mailto:sazzadul.eee@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (586) 359-9685',
      href: 'tel:+15863599685',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Warren, MI, USA',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/s-isl-s/',
    },
    {
      icon: FileText,
      label: 'Google Scholar',
      href: 'https://scholar.google.com/citations?user=thkLVIkAAAAJ',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: '#',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form entrance
      gsap.fromTo(
        '.contact-form',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Info cards entrance
      gsap.fromTo(
        '.contact-info-card',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-cyan" />
            <span className="text-cyan text-sm font-medium uppercase tracking-wider">
              Get In Touch
            </span>
            <div className="w-12 h-px bg-cyan" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>

          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Ready to transform your data into insights? Let's discuss how I can help your organization
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-form">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <h3 className="text-xl font-heading font-bold text-white mb-6">
                Send a Message
              </h3>

              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/50 transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/50 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/50 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-cyan text-dark-bg hover:bg-cyan/90'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-dark-bg/30 border-t-dark-bg rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      Message Sent Successfully!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="contact-info-card group block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
                    <info.icon className="w-6 h-6 text-cyan" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/50 text-sm">{info.label}</p>
                    <p className="text-white font-medium group-hover:text-cyan transition-colors">
                      {info.value}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-cyan transition-colors" />
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="contact-info-card p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-white/50 text-sm mb-4">Connect on Social Media</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/70 hover:text-cyan hover:bg-cyan/10 transition-all duration-300"
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="contact-info-card p-6 rounded-2xl bg-cyan/5 border border-cyan/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-cyan animate-pulse" />
                <span className="text-cyan font-medium">Available for Opportunities</span>
              </div>
              <p className="text-white/70 text-sm">
                Currently seeking entry-level positions in Data Analytics, Business Operations, 
                or IT Support in the United States.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center">
                <span className="text-cyan font-bold">S</span>
              </div>
              <span className="font-heading font-semibold text-white">
                Sazzadul Islam Shovon
              </span>
            </div>

            {/* Copyright */}
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} All rights reserved. Built with passion for data.
            </p>

            {/* Quick Links */}
            <div className="flex gap-6">
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/50 hover:text-cyan text-sm transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/50 hover:text-cyan text-sm transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/50 hover:text-cyan text-sm transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
