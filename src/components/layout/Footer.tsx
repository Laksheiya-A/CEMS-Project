
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  MapPin,
  Phone,
  Mail,
  GraduationCap
} from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { title: 'About Us', href: '#' },
    { title: 'Academic Calendar', href: '#' },
    { title: 'Campus Map', href: '#' },
    { title: 'Directory', href: '#' },
    { title: 'News & Events', href: '#' },
    { title: 'Alumni', href: '#' },
  ];

  const studentResources = [
    { title: 'Student Portal', href: '#' },
    { title: 'Course Catalog', href: '#' },
    { title: 'Financial Aid', href: '#' },
    { title: 'Registrar', href: '#' },
    { title: 'Student Life', href: '#' },
    { title: 'Support Services', href: '#' },
  ];

  const academicPrograms = [
    { title: 'Undergraduate', href: '#' },
    { title: 'Graduate', href: '#' },
    { title: 'Online Programs', href: '#' },
    { title: 'Continuing Education', href: '#' },
    { title: 'Research', href: '#' },
    { title: 'Study Abroad', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-campus-charcoal to-campus-black border-t border-campus-grey/20 mt-12">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* University Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-campus-pink to-campus-pink-dark rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-campus-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Campus University</h3>
                <p className="text-campus-lightgrey text-sm">Excellence in Education</p>
              </div>
            </div>
            <p className="text-campus-lightgrey text-sm leading-relaxed">
              Preparing students for success in an ever-changing world through innovative education, 
              cutting-edge research, and meaningful community engagement.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-campus-lightgrey hover:text-campus-pink p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-campus-lightgrey hover:text-campus-pink p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-campus-lightgrey hover:text-campus-pink p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-campus-lightgrey hover:text-campus-pink p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-campus-lightgrey hover:text-campus-pink p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <a 
                    href={link.href}
                    className="text-campus-lightgrey hover:text-campus-pink transition-colors text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Programs */}
          <div>
            <h4 className="text-white font-semibold mb-4">Academic Programs</h4>
            <ul className="space-y-2">
              {academicPrograms.map((program) => (
                <li key={program.title}>
                  <a 
                    href={program.href}
                    className="text-campus-lightgrey hover:text-campus-pink transition-colors text-sm"
                  >
                    {program.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Student Resources</h4>
            <ul className="space-y-2">
              {studentResources.map((resource) => (
                <li key={resource.title}>
                  <a 
                    href={resource.href}
                    className="text-campus-lightgrey hover:text-campus-pink transition-colors text-sm"
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-campus-grey/20 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-campus-pink mt-1" />
              <div>
                <h5 className="text-white font-medium mb-1">Campus Address</h5>
                <p className="text-campus-lightgrey text-sm">
                  123 University Avenue<br />
                  College City, State 12345<br />
                  United States
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-campus-pink mt-1" />
              <div>
                <h5 className="text-white font-medium mb-1">Contact</h5>
                <p className="text-campus-lightgrey text-sm">
                  Main: (555) 123-4567<br />
                  Admissions: (555) 123-4568<br />
                  Emergency: (555) 123-4569
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-campus-pink mt-1" />
              <div>
                <h5 className="text-white font-medium mb-1">Email</h5>
                <p className="text-campus-lightgrey text-sm">
                  info@campus.edu<br />
                  admissions@campus.edu<br />
                  support@campus.edu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-campus-grey/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-campus-lightgrey text-sm">
              © 2024 Campus University. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-campus-lightgrey hover:text-campus-pink transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-campus-lightgrey hover:text-campus-pink transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-campus-lightgrey hover:text-campus-pink transition-colors">
                Accessibility
              </a>
              <a href="#" className="text-campus-lightgrey hover:text-campus-pink transition-colors">
                Site Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
