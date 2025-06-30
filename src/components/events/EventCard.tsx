
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/types';
import { Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onBookTicket?: (event: Event) => void;
  onEdit?: (event: Event) => void;
  showActions?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onBookTicket, 
  onEdit, 
  showActions = true 
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-campus-grey/20 text-campus-lightgrey border-campus-grey/30';
    }
  };

  return (
    <Card className="event-card group">
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
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-white text-lg group-hover:text-campus-pink transition-colors">
              {event.title}
            </CardTitle>
            <CardDescription className="text-campus-lightgrey">
              by {event.organizer_name}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(event.status)}>
            {event.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-campus-lightgrey text-sm line-clamp-3">
          {event.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-campus-lightgrey">
            <Calendar className="w-4 h-4 text-campus-pink" />
            <span>{formatDate(event.date)}</span>
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

        <div className="flex items-center justify-between pt-4 border-t border-campus-grey/20">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-campus-pink" />
            <span className="text-white font-semibold">
              ${event.price.toFixed(2)}
            </span>
          </div>
          {showActions && event.status === 'approved' && (
            <div className="flex space-x-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(event)}
                  className="border-campus-grey text-campus-lightgrey hover:bg-campus-charcoal hover:text-white"
                >
                  Edit
                </Button>
              )}
              {onBookTicket && (
                <Button
                  size="sm"
                  onClick={() => onBookTicket(event)}
                  className="campus-button"
                >
                  Book Ticket
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
