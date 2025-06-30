
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Calendar, MapPin, Phone, Edit, Camera } from 'lucide-react';

const MyProfile: React.FC = () => {
  const { user } = useAuth();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'organizer':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'student':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-campus-grey/20 text-campus-lightgrey border-campus-grey/30';
    }
  };

  return (
    <div className="min-h-screen bg-campus-black p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-campus-lightgrey">View and manage your profile information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="campus-card lg:col-span-1">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-campus-pink to-campus-pink-dark rounded-full flex items-center justify-center mx-auto">
                    <User className="w-12 h-12 text-campus-black" />
                  </div>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-2 campus-button"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{user?.name}</h2>
                <Badge className={getRoleColor(user?.role || '')}>
                  {user?.role}
                </Badge>
                <p className="text-campus-lightgrey text-sm mt-2">
                  Member since {new Date().getFullYear()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card className="campus-card lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Profile Information</CardTitle>
                <Button variant="outline" className="border-campus-grey text-campus-lightgrey hover:bg-campus-charcoal hover:text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-campus-pink" />
                    <div>
                      <p className="text-campus-lightgrey text-sm">Email</p>
                      <p className="text-white">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-campus-pink" />
                    <div>
                      <p className="text-campus-lightgrey text-sm">Full Name</p>
                      <p className="text-white">{user?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-campus-pink" />
                    <div>
                      <p className="text-campus-lightgrey text-sm">Phone</p>
                      <p className="text-white">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-campus-pink" />
                    <div>
                      <p className="text-campus-lightgrey text-sm">Date of Birth</p>
                      <p className="text-white">January 15, 1998</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-campus-pink" />
                    <div>
                      <p className="text-campus-lightgrey text-sm">Location</p>
                      <p className="text-white">New York, NY</p>
                    </div>
                  </div>
                  {user?.role === 'student' && (
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-campus-pink" />
                      <div>
                        <p className="text-campus-lightgrey text-sm">Student ID</p>
                        <p className="text-white">STU-2024-001</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card className="campus-card lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-white">Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-campus-lightgrey text-sm">Events Attended</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">5</p>
                  <p className="text-campus-lightgrey text-sm">Upcoming Events</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">8</p>
                  <p className="text-campus-lightgrey text-sm">Organizations</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">24</p>
                  <p className="text-campus-lightgrey text-sm">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
