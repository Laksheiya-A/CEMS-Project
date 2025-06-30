
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Booking } from '@/types';
import { Calendar, Clock, MapPin, QrCode, Download } from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const [showQR, setShowQR] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = `ticket-${booking.id}.png`;
    link.href = booking.qr_code;
    link.click();
  };

  return (
    <>
      <Card className="event-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-white text-lg">
                {booking.event?.title}
              </CardTitle>
              <CardDescription className="text-campus-lightgrey">
                Booking #{booking.id.slice(-6)}
              </CardDescription>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              {booking.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {booking.event && (
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center space-x-2 text-campus-lightgrey">
                <Calendar className="w-4 h-4 text-campus-pink" />
                <span>{formatDate(booking.event.date)}</span>
              </div>
              <div className="flex items-center space-x-2 text-campus-lightgrey">
                <Clock className="w-4 h-4 text-campus-pink" />
                <span>{booking.event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-campus-lightgrey">
                <MapPin className="w-4 h-4 text-campus-pink" />
                <span>{booking.event.location}</span>
              </div>
            </div>
          )}

          <div className="campus-card p-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-campus-lightgrey">Tickets:</span>
              <span className="text-white font-medium">{booking.quantity}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-campus-lightgrey">Total Paid:</span>
              <span className="text-campus-pink font-semibold">
                ${booking.total_amount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => setShowQR(true)}
              className="flex-1 campus-button"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Show QR Code
            </Button>
            <Button
              variant="outline"
              onClick={downloadQR}
              className="border-campus-grey text-campus-lightgrey hover:bg-campus-charcoal hover:text-white"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="campus-card max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-white">
              Event Ticket
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="bg-white p-4 rounded-lg inline-block">
              <img
                src={booking.qr_code}
                alt="QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <div className="text-sm text-campus-lightgrey">
              <p className="font-semibold text-white">{booking.event?.title}</p>
              <p>Tickets: {booking.quantity}</p>
              <p>Booking ID: {booking.id.slice(-6)}</p>
            </div>
            <Button
              onClick={downloadQR}
              className="campus-button w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingCard;
