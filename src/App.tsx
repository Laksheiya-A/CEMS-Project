
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Navigation from "@/components/layout/Navigation";
import EventCard from "@/components/events/EventCard";
import CreateEventModal from "@/components/events/CreateEventModal";
import BookingModal from "@/components/booking/BookingModal";
import BookingCard from "@/components/booking/BookingCard";
import AdminPanel from "@/components/admin/AdminPanel";
import QRScanner from "@/components/qr/QRScanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Event, Booking } from "@/types";
import { mockEvents, mockBookings } from "@/lib/supabase";
import { Plus, Search, Filter } from 'lucide-react';

const queryClient = new QueryClient();

const AuthenticatedApp: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleEventCreated = (newEvent: Event) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleEventStatusChange = (eventId: string, status: 'approved' | 'rejected') => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, status } : event
    ));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    const isApproved = event.status === 'approved';
    
    return matchesSearch && matchesCategory && isApproved;
  });

  const userEvents = events.filter(event => event.organizer_id === user?.id);
  const userBookings = bookings.filter(booking => booking.user_id === user?.id);

  const categories = ['all', ...Array.from(new Set(events.map(e => e.category)))];

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Campus Events</h2>
          <p className="text-campus-lightgrey">Discover and book tickets for upcoming events</p>
        </div>
        <Button
          onClick={() => setIsCreateEventOpen(true)}
          className="campus-button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <Card className="campus-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-campus-lightgrey w-4 h-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="campus-input pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="campus-input w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-campus-charcoal border-campus-grey">
                {categories.map((category) => (
                  <SelectItem 
                    key={category} 
                    value={category}
                    className="text-white hover:bg-campus-grey capitalize"
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onBookTicket={(event) => {
              setSelectedEvent(event);
              setIsBookingOpen(true);
            }}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="campus-card">
          <CardContent className="text-center py-12">
            <p className="text-campus-lightgrey text-lg">No events found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderMyEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">My Events</h2>
          <p className="text-campus-lightgrey">Events you've created</p>
        </div>
        <Button
          onClick={() => setIsCreateEventOpen(true)}
          className="campus-button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            showActions={false}
          />
        ))}
      </div>

      {userEvents.length === 0 && (
        <Card className="campus-card">
          <CardContent className="text-center py-12">
            <p className="text-campus-lightgrey text-lg">You haven't created any events yet</p>
            <Button
              onClick={() => setIsCreateEventOpen(true)}
              className="campus-button mt-4"
            >
              Create Your First Event
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">My Bookings</h2>
        <p className="text-campus-lightgrey">Your event tickets and QR codes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>

      {userBookings.length === 0 && (
        <Card className="campus-card">
          <CardContent className="text-center py-12">
            <p className="text-campus-lightgrey text-lg">You haven't booked any events yet</p>
            <Button
              onClick={() => setActiveTab('events')}
              className="campus-button mt-4"
            >
              Browse Events
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return renderEvents();
      case 'my-events':
        return renderMyEvents();
      case 'bookings':
        return renderBookings();
      case 'admin':
        return (
          <AdminPanel
            events={events}
            bookings={bookings}
            onEventStatusChange={handleEventStatusChange}
          />
        );
      case 'scanner':
        return <QRScanner />;
      default:
        return renderEvents();
    }
  };

  return (
    <div className="min-h-screen bg-campus-black">
      <div className="container mx-auto px-4 py-6">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
      </div>

      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        onEventCreated={handleEventCreated}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        event={selectedEvent}
        onBookingConfirmed={handleBookingConfirmed}
      />
    </div>
  );
};

const UnauthenticatedApp: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-campus-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {showRegister ? (
          <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
        )}
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-campus-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-campus-pink mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Campus Events...</p>
        </div>
      </div>
    );
  }

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AppContent />
        <Toaster />
        <Sonner />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
