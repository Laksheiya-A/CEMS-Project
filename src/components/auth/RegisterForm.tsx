
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as 'student' | 'organizer' | 'admin',
    student_id: '',
    club_name: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await register(formData);
    
    if (success) {
      toast({
        title: "Welcome to Campus Events!",
        description: "Your account has been created successfully.",
      });
    } else {
      toast({
        title: "Registration failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="campus-card w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-campus-pink to-campus-pink-dark bg-clip-text text-transparent">
          Join Campus Events
        </CardTitle>
        <CardDescription className="text-campus-lightgrey">
          Create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="campus-input"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="campus-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="campus-input"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-white">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: 'student' | 'organizer' | 'admin') => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="campus-input">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-campus-charcoal border-campus-grey">
                <SelectItem value="student" className="text-white hover:bg-campus-grey">Student</SelectItem>
                <SelectItem value="organizer" className="text-white hover:bg-campus-grey">Event Organizer</SelectItem>
                <SelectItem value="admin" className="text-white hover:bg-campus-grey">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(formData.role === 'student' || formData.role === 'organizer') && (
            <>
              <div className="space-y-2">
                <Label htmlFor="student_id" className="text-white">Student ID (Optional)</Label>
                <Input
                  id="student_id"
                  value={formData.student_id}
                  onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                  className="campus-input"
                  placeholder="Enter your student ID"
                />
              </div>
              {formData.role === 'organizer' && (
                <div className="space-y-2">
                  <Label htmlFor="club_name" className="text-white">Club Name (Optional)</Label>
                  <Input
                    id="club_name"
                    value={formData.club_name}
                    onChange={(e) => setFormData({ ...formData, club_name: e.target.value })}
                    className="campus-input"
                    placeholder="Enter your club name"
                  />
                </div>
              )}
            </>
          )}
          <Button
            type="submit"
            className="w-full campus-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-campus-lightgrey text-sm">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-campus-pink hover:text-campus-pink-dark transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
