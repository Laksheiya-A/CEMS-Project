
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Mail, Phone, MessageSquare, Search, Book } from 'lucide-react';

const HelpSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How do I book tickets for an event?",
      answer: "To book tickets, navigate to the Events page, find the event you want to attend, and click the 'Book Ticket' button. Follow the prompts to complete your booking."
    },
    {
      question: "Can I cancel my event booking?",
      answer: "Yes, you can cancel your booking up to 24 hours before the event. Go to 'My Bookings' and click the cancel button next to your booking."
    },
    {
      question: "How do I create an event as an organizer?",
      answer: "If you're an organizer, go to the Events page and click 'Create Event'. Fill in all the required details and submit for admin approval."
    },
    {
      question: "What should I do if I forget my password?",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your registered email address."
    },
    {
      question: "How do I change my profile information?",
      answer: "Go to Settings or My Profile page and click 'Edit Profile' to update your information."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-campus-black p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
          <p className="text-campus-lightgrey">Get help and find answers to common questions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Support */}
          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-campus-pink" />
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-campus-pink" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-campus-lightgrey text-sm">support@campus.edu</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-campus-pink" />
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-campus-lightgrey text-sm">(555) 123-4567</p>
                </div>
              </div>
              <Button className="w-full campus-button">
                Contact Us
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Book className="w-5 h-5 mr-2 text-campus-pink" />
                Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-campus-lightgrey hover:text-white hover:bg-campus-charcoal">
                User Guide
              </Button>
              <Button variant="ghost" className="w-full justify-start text-campus-lightgrey hover:text-white hover:bg-campus-charcoal">
                Event Guidelines
              </Button>
              <Button variant="ghost" className="w-full justify-start text-campus-lightgrey hover:text-white hover:bg-campus-charcoal">
                Booking Policies
              </Button>
              <Button variant="ghost" className="w-full justify-start text-campus-lightgrey hover:text-white hover:bg-campus-charcoal">
                Technical Requirements
              </Button>
            </CardContent>
          </Card>

          {/* Submit Ticket */}
          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-campus-pink" />
                Submit Ticket
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Subject"
                className="campus-input"
              />
              <Textarea
                placeholder="Describe your issue..."
                className="campus-input min-h-20"
              />
              <Button className="w-full campus-button">
                Submit Ticket
              </Button>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="campus-card lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-campus-lightgrey w-4 h-4" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="campus-input pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-campus-grey/20">
                    <AccordionTrigger className="text-white hover:text-campus-pink">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-campus-lightgrey">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
