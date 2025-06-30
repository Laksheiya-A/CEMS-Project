import { User, Event, Booking } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'laksheiya@campus.edu',
    name: 'Laksheiya',
    role: 'student',
    student_id: 'STU2024001',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'organizer@campus.edu',
    name: 'Laksheiya',
    role: 'organizer',
    student_id: 'ORG2024001',
    club_name: 'Tech Innovation Club',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    email: 'admin@campus.edu',
    name: 'Admin',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2024',
    description: 'Join us for the biggest technology conference on campus featuring keynote speakers from leading tech companies, innovative workshops, and networking opportunities.',
    date: '2024-03-15',
    time: '09:00 AM',
    location: 'Main Auditorium',
    capacity: 500,
    price: 25.00,
    category: 'technology',
    organizer_id: 'user1',
    organizer_name: 'Tech Club',
    status: 'approved',
    image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Campus Cultural Festival',
    description: 'Celebrate diversity with performances, food, and cultural exhibitions from around the world. Experience the rich traditions of our international student community.',
    date: '2024-03-20',
    time: '06:00 PM',
    location: 'Student Center Plaza',
    capacity: 1000,
    price: 0.00,
    category: 'cultural',
    organizer_id: 'user2',
    organizer_name: 'International Student Association',
    status: 'approved',
    image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Career Fair 2024',
    description: 'Meet with top employers and explore internship and job opportunities. Bring your resume and dress professionally for this premier networking event.',
    date: '2024-03-25',
    time: '10:00 AM',
    location: 'Sports Complex',
    capacity: 800,
    price: 0.00,
    category: 'career',
    organizer_id: 'user3',
    organizer_name: 'Career Services',
    status: 'approved',
    image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Spring Music Concert',
    description: 'An evening of classical and contemporary music performed by our talented student musicians and guest artists from the city symphony.',
    date: '2024-04-10',
    time: '07:30 PM',
    location: 'Concert Hall',
    capacity: 300,
    price: 15.00,
    category: 'music',
    organizer_id: 'user4',
    organizer_name: 'Music Department',
    status: 'approved',
    image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Startup Pitch Competition',
    description: 'Watch innovative student entrepreneurs pitch their business ideas to a panel of successful investors and industry experts.',
    date: '2024-04-15',
    time: '02:00 PM',
    location: 'Business School Auditorium',
    capacity: 200,
    price: 10.00,
    category: 'business',
    organizer_id: 'user5',
    organizer_name: 'Entrepreneurship Club',
    status: 'pending',
    image_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    title: 'Environmental Awareness Workshop',
    description: 'Learn about sustainability practices and environmental conservation through interactive workshops and expert presentations.',
    date: '2024-04-20',
    time: '01:00 PM',
    location: 'Science Building Room 101',
    capacity: 150,
    price: 5.00,
    category: 'education',
    organizer_id: 'user6',
    organizer_name: 'Environmental Club',
    status: 'pending',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop'
  },
  {
    id: '7',
    title: 'Art Exhibition Opening',
    description: 'Discover amazing artwork created by our talented art students. The exhibition features paintings, sculptures, and digital art.',
    date: '2024-04-25',
    time: '05:00 PM',
    location: 'Art Gallery',
    capacity: 100,
    price: 0.00,
    category: 'arts',
    organizer_id: 'user7',
    organizer_name: 'Art Department',
    status: 'pending',
    image_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop'
  },
  {
    id: '8',
    title: 'Health & Wellness Fair',
    description: 'Focus on your wellbeing with free health screenings, fitness demonstrations, and wellness resources from campus health services.',
    date: '2024-05-01',
    time: '11:00 AM',
    location: 'Recreation Center',
    capacity: 400,
    price: 0.00,
    category: 'health',
    organizer_id: 'user8',
    organizer_name: 'Health Services',
    status: 'pending',
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    user_id: '1',
    event_id: '2',
    quantity: 2,
    total_amount: 20.00,
    qr_code: 'QR12345',
    status: 'confirmed',
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '2',
    user_id: '1',
    event_id: '4',
    quantity: 1,
    total_amount: 5.00,
    qr_code: 'QR67890',
    status: 'confirmed',
    created_at: '2024-01-22T14:00:00Z',
  },
  {
    id: '3',
    user_id: '2',
    event_id: '7',
    quantity: 3,
    total_amount: 60.00,
    qr_code: 'QR24680',
    status: 'confirmed',
    created_at: '2024-01-25T09:00:00Z',
  },
  {
    id: '4',
    user_id: '1',
    event_id: '8',
    quantity: 1,
    total_amount: 25.00,
    qr_code: 'QR13579',
    status: 'confirmed',
    created_at: '2024-01-28T16:00:00Z',
  },
  {
    id: '5',
    user_id: '2',
    event_id: '10',
    quantity: 2,
    total_amount: 0.00,
    qr_code: 'QR11223',
    status: 'confirmed',
    created_at: '2024-01-30T11:00:00Z',
  }
];
