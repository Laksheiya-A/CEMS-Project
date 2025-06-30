
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, User, Users, QrCode, Mail } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  const userTabs = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'my-events', label: 'My Events', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: QrCode },
  ];

  const adminTabs = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'admin', label: 'Admin Panel', icon: Users },
    { id: 'scanner', label: 'QR Scanner', icon: QrCode },
  ];

  const tabs = user?.role === 'admin' ? adminTabs : userTabs;

  return (
    <nav className="campus-card p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-campus-pink to-campus-pink-dark bg-clip-text text-transparent">
            Campus Events
          </h1>
          <div className="flex space-x-1">
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
        <div className="flex items-center space-x-4">
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
      </div>
    </nav>
  );
};

export default Navigation;
