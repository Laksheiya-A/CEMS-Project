
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { CheckCircle, XCircle, Camera, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScannedTicket {
  bookingId: string;
  eventId: string;
  userId: string;
  quantity: number;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  userName: string;
}

interface AttendanceRecord {
  id: string;
  ticketData: ScannedTicket;
  scannedAt: string;
  status: 'valid' | 'invalid' | 'duplicate';
}

const QRScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTickets, setScannedTickets] = useState<AttendanceRecord[]>([]);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const { toast } = useToast();
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  const startScanning = () => {
    if (scannerRef.current) {
      const html5QrCodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        false
      );

      html5QrCodeScanner.render(
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        (error) => {
          console.log('QR Code scan error:', error);
        }
      );

      setScanner(html5QrCodeScanner);
      setIsScanning(true);
    }
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear();
      setScanner(null);
    }
    setIsScanning(false);
  };

  const handleScanSuccess = (decodedText: string) => {
    try {
      const ticketData: ScannedTicket = JSON.parse(decodedText);
      
      // Check if ticket has already been scanned
      const isDuplicate = scannedTickets.some(
        record => record.ticketData.bookingId === ticketData.bookingId
      );

      const attendanceRecord: AttendanceRecord = {
        id: Date.now().toString(),
        ticketData,
        scannedAt: new Date().toISOString(),
        status: isDuplicate ? 'duplicate' : 'valid'
      };

      setScannedTickets(prev => [attendanceRecord, ...prev]);

      if (isDuplicate) {
        toast({
          title: "Duplicate Ticket",
          description: "This ticket has already been scanned.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Ticket Verified",
          description: `Welcome ${ticketData.userName}!`,
        });
      }

      // Stop scanning after successful scan
      stopScanning();
    } catch (error) {
      const attendanceRecord: AttendanceRecord = {
        id: Date.now().toString(),
        ticketData: {
          bookingId: 'invalid',
          eventId: 'invalid',
          userId: 'invalid',
          quantity: 0,
          eventTitle: 'Invalid QR Code',
          eventDate: '',
          eventTime: '',
          userName: 'Unknown'
        },
        scannedAt: new Date().toISOString(),
        status: 'invalid'
      };

      setScannedTickets(prev => [attendanceRecord, ...prev]);

      toast({
        title: "Invalid QR Code",
        description: "The scanned QR code is not a valid ticket.",
        variant: "destructive",
      });

      stopScanning();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'duplicate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'invalid':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-campus-grey/20 text-campus-lightgrey border-campus-grey/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-4 h-4" />;
      case 'duplicate':
        return <AlertCircle className="w-4 h-4" />;
      case 'invalid':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="campus-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <Camera className="w-5 h-5 mr-2 text-campus-pink" />
            QR Code Scanner
          </CardTitle>
          <CardDescription className="text-campus-lightgrey">
            Scan event tickets for attendance tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            {!isScanning ? (
              <Button onClick={startScanning} className="campus-button">
                <Camera className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>
            ) : (
              <Button 
                onClick={stopScanning} 
                variant="outline"
                className="border-campus-grey text-campus-lightgrey hover:bg-campus-charcoal hover:text-white"
              >
                Stop Scanning
              </Button>
            )}
          </div>
          
          {isScanning && (
            <div className="bg-white p-4 rounded-lg">
              <div id="qr-reader" ref={scannerRef}></div>
            </div>
          )}
        </CardContent>
      </Card>

      {scannedTickets.length > 0 && (
        <Card className="campus-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">
              Scanned Tickets ({scannedTickets.length})
            </CardTitle>
            <CardDescription className="text-campus-lightgrey">
              Recent attendance records
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scannedTickets.map((record) => (
              <Card key={record.id} className="event-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-white">
                        {record.ticketData.eventTitle}
                      </h3>
                      <p className="text-campus-lightgrey text-sm">
                        {record.ticketData.userName}
                      </p>
                    </div>
                    <Badge className={getStatusColor(record.status)}>
                      {getStatusIcon(record.status)}
                      <span className="ml-1">{record.status}</span>
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-campus-lightgrey">
                    <div>
                      <strong>Booking ID:</strong> {record.ticketData.bookingId.slice(-6)}
                    </div>
                    <div>
                      <strong>Tickets:</strong> {record.ticketData.quantity}
                    </div>
                    <div>
                      <strong>Event Date:</strong> {record.ticketData.eventDate}
                    </div>
                    <div>
                      <strong>Scanned:</strong> {new Date(record.scannedAt).toLocaleTimeString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QRScanner;
