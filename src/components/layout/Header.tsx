
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Calendar, 
  User, 
  Users, 
  QrCode, 
  GraduationCap,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  Settings,
  HelpCircle,
  Bell,
  Search
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const studentTabs = [
    { id: 'events', label: 'Browse Events', icon: Calendar },
    { id: 'bookings', label: 'My Bookings', icon: QrCode },
  ];

  const organizerTabs = [
    { id: 'events', label: 'Browse Events', icon: Calendar },
    { id: 'my-events', label: 'My Events', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: QrCode },
  ];

  const adminTabs = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'admin', label: 'Admin Panel', icon: Users },
    { id: 'scanner', label: 'QR Scanner', icon: QrCode },
  ];

  const getTabs = () => {
    switch (user?.role) {
      case 'student':
        return studentTabs;
      case 'organizer':
        return organizerTabs;
      case 'admin':
        return adminTabs;
      default:
        return studentTabs;
    }
  };

  const tabs = getTabs();

  const academicLinks = [
    { title: 'Academics', href: '/academics', description: 'Explore our academic programs' },
    { title: 'Admissions', href: '/admissions', description: 'Apply to our university' },
    { title: 'Research', href: '/research', description: 'Discover research opportunities' },
    { title: 'Library', href: '/library', description: 'Access academic resources' },
  ];

  const campusLinks = [
    { title: 'Campus Life', href: '/campus-life', description: 'Student activities and organizations' },
    { title: 'Housing', href: '/housing', description: 'On-campus living options' },
    { title: 'Dining', href: '/dining', description: 'Campus dining facilities' },
    { title: 'Recreation', href: '/recreation', description: 'Sports and fitness facilities' },
  ];

  const servicesLinks = [
    { title: 'Career Services', href: '/career-services', description: 'Job placement and career guidance' },
    { title: 'Student Support', href: '/student-support', description: 'Academic and personal support' },
    { title: 'Health Services', href: '/health-services', description: 'Campus health and wellness' },
    { title: 'IT Services', href: '/it-services', description: 'Technology support' },
  ];

  return (
    <div className="campus-card mb-6">
      {/* Top Header Bar */}
      <div className="border-b border-campus-grey/20 px-6 py-2">
        <div className="flex justify-between items-center text-sm text-campus-lightgrey">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@campus.edu</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>123 University Ave, College City</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-campus-lightgrey hover:text-white">
              <a href="/apply" className="flex items-center">Apply Now</a>
            </Button>
            <Button variant="ghost" size="sm" className="text-campus-lightgrey hover:text-white">
              <a href="/visit" className="flex items-center">Visit Campus</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and University Name */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-campus-pink to-campus-pink-dark rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-campus-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Campus University
                </h1>
                <p className="text-campus-lightgrey text-sm">Excellence in Education Since 1985</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:text-campus-pink">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Academics
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="bg-campus-charcoal border-campus-grey p-4 w-96">
                      <div className="grid grid-cols-1 gap-3">
                        {academicLinks.map((link) => (
                          <a
                            key={link.title}
                            href={link.href}
                            className="block p-3 rounded-lg hover:bg-campus-grey/20 transition-colors"
                          >
                            <div className="text-white font-medium">{link.title}</div>
                            <div className="text-campus-lightgrey text-sm">{link.description}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:text-campus-pink">
                    Campus Life
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="bg-campus-charcoal border-campus-grey p-4 w-96">
                      <div className="grid grid-cols-1 gap-3">
                        {campusLinks.map((link) => (
                          <a
                            key={link.title}
                            href={link.href}
                            className="block p-3 rounded-lg hover:bg-campus-grey/20 transition-colors"
                          >
                            <div className="text-white font-medium">{link.title}</div>
                            <div className="text-campus-lightgrey text-sm">{link.description}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:text-campus-pink">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="bg-campus-charcoal border-campus-grey p-4 w-96">
                      <div className="grid grid-cols-1 gap-3">
                        {servicesLinks.map((link) => (
                          <a
                            key={link.title}
                            href={link.href}
                            className="block p-3 rounded-lg hover:bg-campus-grey/20 transition-colors"
                          >
                            <div className="text-white font-medium">{link.title}</div>
                            <div className="text-campus-lightgrey text-sm">{link.description}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Menu Bar and User Info */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <Button variant="ghost" size="sm" className="text-white hover:text-campus-pink">
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="text-white hover:text-campus-pink">
              <Bell className="w-5 h-5" />
            </Button>

            {/* Menu Bar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:text-campus-pink">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-campus-charcoal border-campus-grey w-56">
                <DropdownMenuLabel className="text-white">Quick Access</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-campus-grey" />
                <DropdownMenuItem className="text-campus-lightgrey hover:bg-campus-grey hover:text-white">
                  <User className="w-4 h-4 mr-2" />
                  <a href="/profile">My Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-campus-lightgrey hover:bg-campus-grey hover:text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  <a href="/settings">Settings</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-campus-lightgrey hover:bg-campus-grey hover:text-white">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  <a href="/help">Help & Support</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-campus-lightgrey hover:bg-campus-grey hover:text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <a href="/student-portal">Student Portal</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-campus-grey" />
                <DropdownMenuItem className="text-campus-lightgrey hover:bg-campus-grey hover:text-white">
                  <MapPin className="w-4 h-4 mr-2" />
                  <a href="/campus-map">Campus Map</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-campus-lightgrey hover:bg-campus-grey hover:text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  <a href="/academic-calendar">Academic Calendar</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-campus-lightgrey text-sm capitalize">{user?.role}</p>
              </div>
              <Button
                variant="outline"
                onClick={logout}
                className="border-campus-grey text-campus-lightgrey hover:bg-campus-charcoal hover:text-white"
              >
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Event Management Navigation */}
        <div className="mt-6 pt-6 border-t border-campus-grey/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl font-semibold text-white">Event Management System</h2>
              <p className="text-campus-lightgrey text-sm">
                {user?.role === 'student' && 'Discover and book campus events'}
                {user?.role === 'organizer' && 'Manage and discover campus events'}
                {user?.role === 'admin' && 'Administer and manage all campus events'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'default' : 'ghost'}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'campus-button'
                        : 'text-campus-lightgrey hover:text-white hover:bg-campus-charcoal'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-campus-grey/20">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-white font-medium">Academics</h3>
                {academicLinks.map((link) => (
                  <a key={link.title} href={link.href} className="block text-campus-lightgrey hover:text-white py-1">
                    {link.title}
                  </a>
                ))}
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-medium">Campus Life</h3>
                {campusLinks.map((link) => (
                  <a key={link.title} href={link.href} className="block text-campus-lightgrey hover:text-white py-1">
                    {link.title}
                  </a>
                ))}
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-medium">Services</h3>
                {servicesLinks.map((link) => (
                  <a key={link.title} href={link.href} className="block text-campus-lightgrey hover:text-white py-1">
                    {link.title}
                  </a>
                ))}
              </div>
              <div className="pt-4 border-t border-campus-grey/20">
                <div className="text-white font-medium mb-2">{user?.name}</div>
                <div className="text-campus-lightgrey text-sm mb-4 capitalize">{user?.role}</div>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="w-full border-campus-grey text-campus-lightgrey hover:bg-campus-charcoal hover:text-white"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
