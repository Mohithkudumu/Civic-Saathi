import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function TicketsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  const tickets = [
    {
      id: 'T-1234',
      title: 'Pothole on Main Street',
      description: 'Large pothole causing traffic issues',
      date: '15 Jul 2024',
      status: 'In Progress',
      statusColor: '#007AFF',
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: 'T-1235',
      title: 'Streetlight Outage',
      description: 'Streetlight not working for past 3 days',
      date: '12 Jul 2024',
      status: 'Pending',
      statusColor: '#FF9500',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: 'T-1236',
      title: 'Garbage Collection Issue',
      description: 'Garbage not collected for a week',
      date: '10 Jul 2024',
      status: 'Resolved',
      statusColor: '#34C759',
      image: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: 'T-1237',
      title: 'Water Leakage',
      description: 'Water pipe leaking on the street corner',
      date: '08 Jul 2024',
      status: 'Resolved',
      statusColor: '#34C759',
      image: 'https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  ];

  const filteredTickets = activeTab === 'all' 
    ? tickets 
    : tickets.filter(ticket => {
        if (activeTab === 'active') return ticket.status !== 'Resolved';
        if (activeTab === 'resolved') return ticket.status === 'Resolved';
        return true;
      });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Filter size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]} 
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.activeTab]} 
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'resolved' && styles.activeTab]} 
          onPress={() => setActiveTab('resolved')}
        >
          <Text style={[styles.tabText, activeTab === 'resolved' && styles.activeTabText]}>Resolved</Text>
        </TouchableOpacity>
      </View>

      {/* Tickets List */}
      <ScrollView style={styles.ticketsList} showsVerticalScrollIndicator={false}>
        {filteredTickets.map((ticket, index) => (
          <TouchableOpacity key={ticket.id} style={styles.ticketCard}>
            <View style={styles.ticketHeader}>
              <Text style={styles.ticketId}>{ticket.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: ticket.statusColor }]}>
                <Text style={styles.statusText}>{ticket.status}</Text>
              </View>
            </View>
            
            <View style={styles.ticketContent}>
              <View style={styles.ticketInfo}>
                <Text style={styles.ticketTitle}>{ticket.title}</Text>
                <Text style={styles.ticketDescription}>{ticket.description}</Text>
                <Text style={styles.ticketDate}>Reported on {ticket.date}</Text>
              </View>
              <Image source={{ uri: ticket.image }} style={styles.ticketImage} />
            </View>
            
            // Inside the TicketsScreen component, update the ticket card to navigate to ticket details
            // Find the ticketActions section in the return statement and modify it:
            
            <View style={styles.ticketActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push({
                  pathname: '/ticket-details',
                  params: { id: ticket.id }
                })}
              >
                <Text style={styles.actionButtonText}>View Details</Text>
                <ChevronRight size={16} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        
        {filteredTickets.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No tickets found</Text>
            <Text style={styles.emptyStateDescription}>
              {activeTab === 'all' 
                ? "You haven't reported any issues yet." 
                : activeTab === 'active' 
                  ? "You don't have any active tickets." 
                  : "You don't have any resolved tickets."}
            </Text>
            <TouchableOpacity 
              style={styles.createTicketButton}
              onPress={() => router.push('/create-ticket')}
            >
              <Text style={styles.createTicketButtonText}>Report an Issue</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '500',
  },
  ticketsList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  ticketCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ticketId: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  ticketContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  ticketInfo: {
    flex: 1,
    marginRight: 12,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ticketDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ticketDate: {
    fontSize: 12,
    color: '#999',
  },
  ticketImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  ticketActions: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  createTicketButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createTicketButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 80,
  },
});