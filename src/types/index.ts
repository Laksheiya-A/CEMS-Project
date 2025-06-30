
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  student_id?: string;
  club_name?: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
  image_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  organizer_id: string;
  organizer_name: string;
  created_at: string;
  updated_at: string;
  category: string;
}

export interface Booking {
  id: string;
  user_id: string;
  event_id: string;
  quantity: number;
  total_amount: number;
  qr_code: string;
  status: 'confirmed' | 'cancelled';
  created_at: string;
  user?: User;
  event?: Event;
}

export interface Attendance {
  id: string;
  booking_id: string;
  event_id: string;
  user_id: string;
  scanned_at: string;
  scanned_by: string;
}

export interface DashboardStats {
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;
  upcomingEvents: number;
  pendingApprovals: number;
}
