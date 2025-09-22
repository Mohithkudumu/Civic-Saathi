import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ChevronDown, ChevronLeft, MessageSquare, Mail, Phone, Twitter, Instagram, Facebook } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function SupportScreen() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  const faqItems = [
    {
      id: 1,
      question: 'How do I report an issue?',
      answer: 'Tap the + button at the bottom of the screen and follow the instructions to submit your report with details and photos.',
    },
    {
      id: 2,
      question: 'What happens after I report an issue?',
      answer: 'Your report is reviewed by our team and assigned to the relevant department. You can track the status in the My Tickets section.',
    },
    {
      id: 3,
      question: 'How long does it take to resolve an issue?',
      answer: 'Resolution times vary based on the type and severity of the issue. Most issues are addressed within 3-5 working days.',
    },
  ];

  const recentTicket = {
    id: '123456',
    title: 'Pothole on Main Street',
    date: '15th July 2024',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=200'
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Intro Text */}
      <Text style={styles.introText}>
        We're here to help you with any issues or questions you may have.
      </Text>

      {/* Quick Help */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Help</Text>
        <View style={styles.quickHelpGrid}>
          <TouchableOpacity style={styles.quickHelpItem} onPress={() => router.push('/tickets')}>
            <View style={styles.quickHelpIcon}>
              <MessageSquare size={20} color="#007AFF" />
            </View>
            <Text style={styles.quickHelpText}>My Tickets</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickHelpItem}>
            <View style={styles.quickHelpIcon}>
              <MessageSquare size={20} color="#007AFF" />
            </View>
            <Text style={styles.quickHelpText}>Feedbacks</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickHelpItem} onPress={() => router.push('/create-ticket')}>
            <View style={styles.quickHelpIcon}>
              <MessageSquare size={20} color="#007AFF" />
            </View>
            <Text style={styles.quickHelpText}>Report a Bug</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickHelpItem}>
            <View style={styles.quickHelpIcon}>
              <MessageSquare size={20} color="#007AFF" />
            </View>
            <Text style={styles.quickHelpText}>Talk to Support</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FAQ Section</Text>
        {faqItems.map((item) => (
          <View key={item.id} style={styles.faqItem}>
            <TouchableOpacity 
              style={styles.faqQuestion}
              onPress={() => toggleFaq(item.id)}
            >
              <Text style={styles.faqQuestionText}>{item.question}</Text>
              <ChevronDown 
                size={20} 
                color="#333" 
                style={{ transform: [{ rotate: expandedFaq === item.id ? '180deg' : '0deg' }] }}
              />
            </TouchableOpacity>
            {expandedFaq === item.id && (
              <View style={styles.faqAnswer}>
                <Text style={styles.faqAnswerText}>{item.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Recent Ticket */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Need Help With Recent Ticket?</Text>
        <View style={styles.recentTicket}>
          <View style={styles.recentTicketInfo}>
            <Text style={styles.ticketId}>Ticket ID: {recentTicket.id}</Text>
            <Text style={styles.ticketTitle}>{recentTicket.title}</Text>
            <Text style={styles.ticketDate}>Reported on {recentTicket.date}</Text>
            
            <View style={styles.ticketActions}>
              <TouchableOpacity style={styles.trackButton}>
                <Text style={styles.trackButtonText}>Track Progress</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.supportButton}>
                <Text style={styles.supportButtonText}>Talk to Support</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image 
            source={{ uri: recentTicket.image }} 
            style={styles.ticketImage} 
          />
        </View>
      </View>

      {/* Contact Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Options</Text>
        
        <TouchableOpacity style={styles.contactOption}>
          <MessageSquare size={20} color="#007AFF" />
          <Text style={styles.contactOptionText}>Chat</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactOption}>
          <Mail size={20} color="#007AFF" />
          <Text style={styles.contactOptionText}>Email</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactOption}>
          <Phone size={20} color="#007AFF" />
          <Text style={styles.contactOptionText}>Call Helpline</Text>
        </TouchableOpacity>
      </View>

      {/* Social Media */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us on Social Media</Text>
        <View style={styles.socialMediaContainer}>
          <TouchableOpacity style={styles.socialMediaItem}>
            <View style={styles.socialMediaIcon}>
              <Twitter size={20} color="#1DA1F2" />
            </View>
            <Text style={styles.socialMediaText}>Twitter</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialMediaItem}>
            <View style={styles.socialMediaIcon}>
              <Instagram size={20} color="#E1306C" />
            </View>
            <Text style={styles.socialMediaText}>Instagram</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialMediaItem}>
            <View style={styles.socialMediaIcon}>
              <Facebook size={20} color="#4267B2" />
            </View>
            <Text style={styles.socialMediaText}>Facebook</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.socialMediaCaption}>
          Stay updated with the latest news and announcements from Swaraj.
        </Text>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  introText: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  quickHelpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickHelpItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickHelpIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickHelpText: {
    fontSize: 14,
    color: '#333',
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: 'white',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  recentTicket: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
  },
  recentTicketInfo: {
    flex: 1,
    marginRight: 12,
  },
  ticketId: {
    fontSize: 12,
    color: '#666',
  },
  ticketTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 4,
  },
  ticketDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  ticketActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackButton: {
    backgroundColor: '#E6F2FF',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '500',
  },
  supportButton: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
    alignItems: 'center',
  },
  supportButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  ticketImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  contactOptionText: {
    fontSize: 14,
    marginLeft: 12,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  socialMediaItem: {
    alignItems: 'center',
  },
  socialMediaIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  socialMediaText: {
    fontSize: 12,
  },
  socialMediaCaption: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  bottomSpacing: {
    height: 80,
  },
});