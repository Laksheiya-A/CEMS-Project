
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Event, Booking, DashboardStats } from '@/types';
import { Calendar, Users, DollarSign, Clock, CheckCircle, XCircle, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminPanelProps {
  events: Event[];
  bookings: Booking[];
  onEventStatusChange: (eventId: string, status: 'approved' | 'rejected') => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  events,
  bookings,
  onEventStatusChange,
}) => {
  const { toast } = useToast();

  const stats: DashboardStats = {
    totalEvents: events.length,
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum, booking) => sum + booking.total_amount, 0),
    upcomingEvents: events.filter(e => new Date(e.date) > new Date() && e.status === 'approved').length,
    pendingApprovals: events.filter(e => e.status === 'pending').length,
  };

  const handleApproval = (eventId: string, status: 'approved' | 'rejected') => {
    onEventStatusChange(eventId, status);
    
    // Mock email notification
    const event = events.find(e => e.id === eventId);
    console.log(`Sending ${status} email for event: ${event?.title}`);
    
    toast({
      title: `Event ${status}`,
      description: `The event has been ${status} and organizer has been notified.`,
    });
  };

  const pendingEvents = events.filter(e => e.status === 'pending');
  const approvedEvents = events.filter(e => e.status === 'approved');
  const rejectedEvents = events.filter(e => e.status === 'rejected');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="campus-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-campus-lightgrey">
              Total Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-campus-pink" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalEvents}</div>
          </CardContent>
        </Card>

        <Card className="campus-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-campus-lightgrey">
              Total Bookings
            </CardTitle>
            <Users className="h-4 w-4 text-campus-pink" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalBookings}</div>
          </CardContent>
        </Card>

        <Card className="campus-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-campus-lightgrey">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-campus-pink" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-campus-pink">
              ${stats.totalRevenue.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card className="campus-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-campus-lightgrey">
              Upcoming Events
            </CardTitle>
            <Clock className="h-4 w-4 text-campus-pink" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.upcomingEvents}</div>
          </CardContent>
        </Card>

        <Card className="campus-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-campus-lightgrey">
              Pending Approvals
            </CardTitle>
            <Mail className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{stats.pendingApprovals}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-campus-charcoal">
          <TabsTrigger 
            value="pending" 
            className="data-[state=active]:bg-campus-pink data-[state=active]:text-campus-black"
          >
            Pending ({pendingEvents.length})
          </TabsTrigger>
          <TabsTrigger 
            value="approved"
            className="data-[state=active]:bg-campus-pink data-[state=active]:text-campus-black"
          >
            Approved ({approvedEvents.length})
          </TabsTrigger>
          <TabsTrigger 
            value="rejected"
            className="data-[state=active]:bg-campus-pink data-[state=active]:text-campus-black"
          >
            Rejected ({rejectedEvents.length})
          </TabsTrigger>
          <TabsTrigger 
            value="bookings"
            className="data-[state=active]:bg-campus-pink data-[state=active]:text-campus-black"
          >
            Bookings ({bookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingEvents.length === 0 ? (
            <Card className="campus-card">
              <CardContent className="text-center py-8">
                <p className="text-campus-lightgrey">No pending events for approval</p>
              </CardContent>
            </Card>
          ) : (
            pendingEvents.map((event) => (
              <Card key={event.id} className="event-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{event.title}</CardTitle>
                      <CardDescription className="text-campus-lightgrey">
                        by {event.organizer_name} • {event.category}
                      </CardDescription>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      {event.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-campus-lightgrey text-sm">{event.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-campus-lightgrey">
                      <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="text-campus-lightgrey">
                      <strong>Time:</strong> {event.time}
                    </div>
                    <div className="text-campus-lightgrey">
                      <strong>Location:</strong> {event.location}
                    </div>
                    <div className="text-campus-lightgrey">
                      <strong>Capacity:</strong> {event.capacity}
                    </div>
                    <div className="text-campus-lightgrey">
                      <strong>Price:</strong> ${event.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleApproval(event.id, 'approved')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleApproval(event.id, 'rejected')}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedEvents.map((event) => (
            <Card key={event.id} className="event-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">{event.title}</CardTitle>
                    <CardDescription className="text-campus-lightgrey">
                      by {event.organizer_name} • {event.category}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm text-campus-lightgrey">
                  <div><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</div>
                  <div><strong>Time:</strong> {event.time}</div>
                  <div><strong>Location:</strong> {event.location}</div>
                  <div><strong>Price:</strong> ${event.price.toFixed(2)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedEvents.map((event) => (
            <Card key={event.id} className="event-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">{event.title}</CardTitle>
                    <CardDescription className="text-campus-lightgrey">
                      by {event.organizer_name} • {event.category}
                    </CardDescription>
                  </div>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="event-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">{booking.event?.title}</CardTitle>
                    <CardDescription className="text-campus-lightgrey">
                      Booked by {booking.user?.name} • {booking.user?.email}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm text-campus-lightgrey">
                  <div><strong>Tickets:</strong> {booking.quantity}</div>
                  <div><strong>Total:</strong> ${booking.total_amount.toFixed(2)}</div>
                  <div><strong>Booking Date:</strong> {new Date(booking.created_at).toLocaleDateString()}</div>
                  <div><strong>Booking ID:</strong> {booking.id.slice(-6)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
