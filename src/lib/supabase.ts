
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
    description: 'Annual technology conference featuring industry leaders and innovative solutions. Join us for keynote speakers, networking sessions, and hands-on workshops covering AI, blockchain, and cybersecurity.',
    date: '2024-03-15',
    time: '09:00',
    location: 'Main Auditorium, Engineering Building',
    capacity: 500,
    price: 25.00,
    status: 'approved' as const,
    organizer_id: '2',
    organizer_name: 'Computer Science Department',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Technology',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'International Cultural Night',
    description: 'Celebrate diversity with performances from different cultural groups. Experience traditional dances, music, and cuisine from around the world. Open to all students and faculty.',
    date: '2024-03-20',
    time: '18:00',
    location: 'Student Union Center',
    capacity: 300,
    price: 15.00,
    status: 'approved' as const,
    organizer_id: '2',
    organizer_name: 'International Student Association',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Cultural',
    image_url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Startup Pitch Competition',
    description: 'Students present their innovative business ideas to industry experts and venture capitalists. Winner receives $10,000 seed funding and mentorship opportunities.',
    date: '2024-03-25',
    time: '14:00',
    location: 'Innovation Hub, Business School',
    capacity: 150,
    price: 10.00,
    status: 'approved' as const,
    organizer_id: '2',
    organizer_name: 'Entrepreneurship Club',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Business',
    image_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop'
  },
  {
    id: '4',
    title: 'Spring Career Fair 2024',
    description: 'Connect with 150+ employers from Fortune 500 companies, startups, and government agencies. Bring your resume and dress professionally. All majors welcome.',
    date: '2024-04-02',
    time: '10:00',
    location: 'Campus Recreation Center',
    capacity: 2000,
    price: 0.00,
    status: 'approved' as const,
    organizer_id: '1',
    organizer_name: 'Career Services Center',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Career',
    image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop'
  },
  {
    id: '5',
    title: 'Annual Research Symposium',
    description: 'Undergraduate and graduate students present their research findings across all disciplines. Poster sessions, oral presentations, and networking with faculty.',
    date: '2024-04-10',
    time: '08:30',
    location: 'Academic Complex, Multiple Rooms',
    capacity: 800,
    price: 5.00,
    status: 'approved' as const,
    organizer_id: '1',
    organizer_name: 'Office of Research',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Academic',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
  },
  {
    id: '6',
    title: 'Mental Health Awareness Week',
    description: 'A week-long series of workshops, seminars, and activities focused on mental health awareness, stress management, and wellness resources available on campus.',
    date: '2024-04-15',
    time: '12:00',
    location: 'Student Wellness Center',
    capacity: 200,
    price: 0.00,
    status: 'approved' as const,
    organizer_id: '1',
    organizer_name: 'Student Counseling Services',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Health & Wellness',
    image_url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=400&fit=crop'
  },
  {
    id: '7',
    title: 'Alumni Homecoming Weekend',
    description: 'Welcome back our distinguished alumni! Join us for campus tours, class reunions, the homecoming football game, and the annual gala dinner.',
    date: '2024-10-12',
    time: '10:00',
    location: 'Campus-wide',
    capacity: 5000,
    price: 50.00,
    status: 'approved' as const,
    organizer_id: '1',
    organizer_name: 'Alumni Relations Office',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Alumni',
    image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800&h=400&fit=crop'
  },
  {
    id: '8',
    title: 'Environmental Sustainability Fair',
    description: 'Learn about sustainable practices, renewable energy, and environmental conservation. Local vendors, interactive exhibits, and eco-friendly product demonstrations.',
    date: '2024-04-22',
    time: '11:00',
    location: 'University Quad',
    capacity: 1000,
    price: 0.00,
    status: 'approved' as const,
    organizer_id: '2',
    organizer_name: 'Green Campus Initiative',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Environmental',
    image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop'
  },
  {
    id: '9',
    title: 'Greek Life Rush Week',
    description: 'Explore fraternity and sorority life on campus. Meet current members, learn about each organization, and discover opportunities for leadership and community service.',
    date: '2024-08-28',
    time: '17:00',
    location: 'Greek Row & Student Center',
    capacity: 800,
    price: 0.00,
    status: 'approved' as const,
    organizer_id: '1',
    organizer_name: 'Greek Life Office',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Greek Life',
    image_url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=400&fit=crop'
  },
  {
    id: '10',
    title: 'Winter Film Festival',
    description: 'A showcase of student-produced films, documentaries, and short films. Awards ceremony follows the screening. Open to all film enthusiasts and media studies students.',
    date: '2024-12-05',
    time: '19:00',
    location: 'Campus Theater, Arts Building',
    capacity: 250,
    price: 8.00,
    status: 'pending' as const,
    organizer_id: '2',
    organizer_name: 'Film Society',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Arts',
    image_url: 'https://images.unsplash.com/photo-1489599511804-67d6aaaf6a0b?w=800&h=400&fit=crop'
  },
  {
    id: '11',
    title: 'Data Science Workshop Series',
    description: 'Hands-on workshops covering Python, R, machine learning, and data visualization. Perfect for beginners and intermediate learners. Laptops provided.',
    date: '2024-03-30',
    time: '13:00',
    location: 'Computer Lab, Library Building',
    capacity: 80,
    price: 20.00,
    status: 'approved' as const,
    organizer_id: '2',
    organizer_name: 'Data Science Club',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Technology',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
  },
  {
    id: '12',
    title: 'Study Abroad Information Session',
    description: 'Learn about semester and year-long study abroad opportunities. Representatives from partner universities worldwide will be present to answer questions.',
    date: '2024-04-08',
    time: '16:00',
    location: 'International Programs Office',
    capacity: 100,
    price: 0.00,
    status: 'approved' as const,
    organizer_id: '1',
    organizer_name: 'Study Abroad Office',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Academic',
    image_url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop'
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
