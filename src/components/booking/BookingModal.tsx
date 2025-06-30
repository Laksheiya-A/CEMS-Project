
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Event, Booking } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import QRCode from 'qrcode';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onBookingConfirmed: (booking: Booking) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  event,
  onBookingConfirmed,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleBooking = async () => {
    if (!event || !user) return;

    setIsLoading(true);

    try {
      // Generate QR code data
      const qrData = {
        bookingId: Date.now().toString(),
        eventId: event.id,
        userId: user.id,
        quantity,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        userName: user.name,
      };

      const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrData));

      const newBooking: Booking = {
        id: qrData.bookingId,
        user_id: user.id,
        event_id: event.id,
        quantity,
        total_amount: event.price * quantity,
        qr_code: qrCodeDataURL,
        status: 'confirmed',
        created_at: new Date().toISOString(),
        user,
        event,
      };

      onBookingConfirmed(newBooking);

      // Mock email notification
      console.log('Sending email notification to:', user.email);
      console.log('Booking details:', newBooking);

      toast({
        title: "Booking Confirmed!",
        description: `Your tickets have been booked successfully. Check your email for the QR code.`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Unable to complete booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) return null;

  const totalAmount = event.price * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="campus-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Book Tickets
          </DialogTitle>
          <DialogDescription className="text-campus-lightgrey">
            {event.title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="event-card p-4">
            <h3 className="font-semibold text-white mb-2">{event.title}</h3>
            <div className="text-sm text-campus-lightgrey space-y-1">
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Price:</strong> ${event.price.toFixed(2)} per ticket</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-white">Number of Tickets</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="campus-input"
              min="1"
              max="10"
            />
          </div>

          <div className="campus-card p-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span className="text-white">Total Amount:</span>
              <span className="text-campus-pink">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-campus-grey text-campus-lightgrey hover:bg-campus-charcoal hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              className="campus-button"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
