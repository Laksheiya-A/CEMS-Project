import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
import { Plus, Search, Filter, TrendingUp, Users, Calendar as CalendarIcon, Clock, MapPin, Calendar } from 'lucide-react';

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
  const [rsvpStatuses, setRsvpStatuses] = useState<{[key: string]: 'going' | 'maybe' | 'not_going' | null}>({});

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

  const handleRsvpChange = (eventId: string, status: 'going' | 'maybe' | 'not_going') => {
    setRsvpStatuses(prev => ({
      ...prev,
      [eventId]: status
    }));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    
    // Students only see approved events
    if (user?.role === 'student') {
      return matchesSearch && matchesCategory && event.status === 'approved';
    }
    
    // Organizers and admins see all events
    return matchesSearch && matchesCategory;
  });

  const userCreatedEvents = events.filter(event => event.organizer_id === user?.id);
  const userRegisteredEvents = bookings
    .filter(booking => booking.user_id === user?.id)
    .map(booking => booking.event)
    .filter(Boolean) as Event[];
  const userBookings = bookings.filter(booking => booking.user_id === user?.id);
  const categories = ['all', ...Array.from(new Set(events.map(e => e.category)))];

  // Statistics for dashboard
  const stats = {
    totalEvents: events.filter(e => e.status === 'approved').length,
    upcomingEvents: events.filter(e => e.status === 'approved' && new Date(e.date) > new Date()).length,
    myBookings: userBookings.length,
    pendingApprovals: events.filter(e => e.status === 'pending').length
  };

  const renderEvents = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="campus-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-campus-lightgrey text-sm">Total Events</p>
                <p className="text-2xl font-bold text-white">{stats.totalEvents}</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-campus-pink" />
            </div>
          </CardContent>
        </Card>
        <Card className="campus-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-campus-lightgrey text-sm">Upcoming</p>
                <p className="text-2xl font-bold text-white">{stats.upcomingEvents}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-campus-pink" />
            </div>
          </CardContent>
        </Card>
        <Card className="campus-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-campus-lightgrey text-sm">My Bookings</p>
                <p className="text-2xl font-bold text-white">{stats.myBookings}</p>
              </div>
              <Users className="w-8 h-8 text-campus-pink" />
            </div>
          </CardContent>
        </Card>
        {user?.role === 'admin' && (
          <Card className="campus-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-campus-lightgrey text-sm">Pending</p>
                  <p className="text-2xl font-bold text-white">{stats.pendingApprovals}</p>
                </div>
                <Filter className="w-8 h-8 text-campus-pink" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Campus Events</h2>
          <p className="text-campus-lightgrey">
            {user?.role === 'student' && 'Discover and book tickets for upcoming events'}
            {user?.role === 'organizer' && 'Discover and book tickets for upcoming events'}
            {user?.role === 'admin' && 'Manage and oversee all campus events'}
          </p>
        </div>
        {(user?.role === 'organizer' || user?.role === 'admin') && (
          <Button
            onClick={() => setIsCreateEventOpen(true)}
            className="campus-button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        )}
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
            onBookTicket={user?.role !== 'admin' ? (event) => {
              setSelectedEvent(event);
              setIsBookingOpen(true);
            } : undefined}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="campus-card">
          <CardContent className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-campus-grey mx-auto mb-4" />
            <p className="text-campus-lightgrey text-lg">No events found matching your criteria</p>
            <p className="text-campus-lightgrey text-sm mt-2">Try adjusting your search or category filter</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderMyEvents = () => (
    <div className="space-y-8">
      {/* Registered Events Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">My Registered Events</h2>
          <p className="text-campus-lightgrey">Events you have registered for</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userRegisteredEvents.map((event) => (
            <Card key={`registered-${event.id}`} className="event-card group">
              {event.image_url && (
                <div className="w-full h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-white text-lg group-hover:text-campus-pink transition-colors">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-campus-lightgrey">
                  by {event.organizer_name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-campus-lightgrey text-sm line-clamp-3">
                  {event.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-campus-lightgrey">
                    <Calendar className="w-4 h-4 text-campus-pink" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-campus-lightgrey">
                    <Clock className="w-4 h-4 text-campus-pink" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-campus-lightgrey">
                    <MapPin className="w-4 h-4 text-campus-pink" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-campus-lightgrey">
                    <Users className="w-4 h-4 text-campus-pink" />
                    <span>{event.capacity} seats</span>
                  </div>
                </div>

                {/* RSVP Section for Students */}
                {user?.role === 'student' && (
                  <div className="pt-4 border-t border-campus-grey/20">
                    <p className="text-white text-sm font-medium mb-2">RSVP Status:</p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={rsvpStatuses[event.id] === 'going' ? 'default' : 'outline'}
                        onClick={() => handleRsvpChange(event.id, 'going')}
                        className={rsvpStatuses[event.id] === 'going' ? 'campus-button' : 'border-campus-grey text-campus-lightgrey hover:bg-campus-charcoal hover:text-white'}
                      >
                        Going
                      </Button>
                      <Button
                        size="sm"
                        variant={rsvpStatuses[event.id] === 'maybe' ? 'default' : 'outline'}
                        onClick={() => handleRsvpChange(event.id, 'maybe')}
                        className={rsvpStatuses[event.id] === 'maybe' ? 'bg-yellow-500 hover:bg-yellow-600' : 'border-campus-grey text-campus-lightgrey hover:bg-campus-charcoal hover:text-white'}
                      >
                        Maybe
                      </Button>
                      <Button
                        size="sm"
                        variant={rsvpStatuses[event.id] === 'not_going' ? 'default' : 'outline'}
                        onClick={() => handleRsvpChange(event.id, 'not_going')}
                        className={rsvpStatuses[event.id] === 'not_going' ? 'bg-red-500 hover:bg-red-600' : 'border-campus-grey text-campus-lightgrey hover:bg-campus-charcoal hover:text-white'}
                      >
                        Not Going
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {userRegisteredEvents.length === 0 && (
          <Card className="campus-card">
            <CardContent className="text-center py-8">
              <p className="text-campus-lightgrey">You haven't registered for any events yet</p>
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

      {/* Created Events Section - Only for organizers */}
      {user?.role === 'organizer' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">My Created Events</h2>
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

          {/* Approved Events */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-400">Approved Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCreatedEvents.filter(event => event.status === 'approved').map((event) => (
                <EventCard
                  key={`approved-${event.id}`}
                  event={event}
                  showActions={false}
                />
              ))}
            </div>
            {userCreatedEvents.filter(event => event.status === 'approved').length === 0 && (
              <p className="text-campus-lightgrey text-sm">No approved events</p>
            )}
          </div>

          {/* Pending Events */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">Pending Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCreatedEvents.filter(event => event.status === 'pending').map((event) => (
                <EventCard
                  key={`pending-${event.id}`}
                  event={event}
                  showActions={false}
                />
              ))}
            </div>
            {userCreatedEvents.filter(event => event.status === 'pending').length === 0 && (
              <p className="text-campus-lightgrey text-sm">No pending events</p>
            )}
          </div>

          {/* Rejected Events */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-400">Rejected Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCreatedEvents.filter(event => event.status === 'rejected').map((event) => (
                <EventCard
                  key={`rejected-${event.id}`}
                  event={event}
                  showActions={false}
                />
              ))}
            </div>
            {userCreatedEvents.filter(event => event.status === 'rejected').length === 0 && (
              <p className="text-campus-lightgrey text-sm">No rejected events</p>
            )}
          </div>

          {userCreatedEvents.length === 0 && (
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
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="container mx-auto px-4 py-6">
        {renderContent()}
      </div>
      <Footer />

      {(user?.role === 'organizer' || user?.role === 'admin') && (
        <CreateEventModal
          isOpen={isCreateEventOpen}
          onClose={() => setIsCreateEventOpen(false)}
          onEventCreated={handleEventCreated}
        />
      )}

      {user?.role !== 'admin' && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          event={selectedEvent}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}
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
