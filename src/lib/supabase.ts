
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Mock data for demonstration - replace with actual Supabase calls
export const mockUsers = [
  {
    id: '1',
    email: 'admin@campus.edu',
    name: 'Admin User',
    role: 'admin' as const,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    email: 'student@campus.edu',
    name: 'John Doe',
    role: 'user' as const,
    student_id: 'STU001',
    created_at: new Date().toISOString()
  }
];

export const mockEvents = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Annual technology conference featuring industry leaders and innovative solutions.',
    date: '2024-03-15',
    time: '09:00',
    location: 'Main Auditorium',
    capacity: 500,
    price: 25.00,
    status: 'approved' as const,
    organizer_id: '2',
    organizer_name: 'Tech Club',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Technology',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Cultural Night',
    description: 'Celebrate diversity with performances from different cultural groups.',
    date: '2024-03-20',
    time: '18:00',
    location: 'Student Center',
    capacity: 300,
    price: 15.00,
    status: 'approved' as const,
    organizer_id: '2',
    organizer_name: 'Cultural Society',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Cultural',
    image_url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Startup Pitch Competition',
    description: 'Students present their innovative business ideas to industry experts.',
    date: '2024-03-25',
    time: '14:00',
    location: 'Innovation Hub',
    capacity: 150,
    price: 10.00,
    status: 'pending' as const,
    organizer_id: '2',
    organizer_name: 'Entrepreneurship Club',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Business'
  }
];

export const mockBookings = [
  {
    id: '1',
    user_id: '2',
    event_id: '1',
    quantity: 2,
    total_amount: 50.00,
    qr_code: 'QR_CODE_DATA_1',
    status: 'confirmed' as const,
    created_at: new Date().toISOString()
  }
];
