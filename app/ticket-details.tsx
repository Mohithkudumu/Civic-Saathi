import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ChevronLeft, MessageCircle, Share2, MapPin, Calendar, Clock, CheckCircle2 } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

export default function TicketDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('details');

  // In a real app, you would fetch this data from an API based on the ticket ID
  // For now, we'll use mock data
  const ticketData = {
    id: id || 'T-1234',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing traffic issues near the intersection of Main Street and 5th Avenue. Multiple vehicles have reported damage. The pothole is approximately 2 feet wide and 8 inches deep.',
    date: '15 Jul 2024',
    time: '10:23 AM',
    status: 'In Progress',
    statusColor: '#007AFF',
    category: 'Road Infrastructure',
    location: '123 Main Street, City Center',
    coordinates: '12.9716° N, 77.5946° E',
    assignedTo: 'City Roads Department',
    priority: 'High',
    images: [
      'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    updates: [
      {
        date: '16 Jul 2024',
        time: '09:15 AM',
        message: 'Ticket assigned to Roads Department',
        author: 'System',
      },
      {
        date: '16 Jul 2024',
        time: '02:30 PM',
        message: 'Site inspection scheduled for tomorrow',
        author: 'Roads Department',
      },
      {
        date: '17 Jul 2024',
        time: '11:45 AM',
        message: 'Inspection completed. Repair work scheduled for 19 Jul',
        author: 'Inspector Rajesh',
      },
    ],
  };

  const getStatusIcon = () => {
    switch (ticketData.status) {
      case 'Pending':
        return <Clock size={16} color="#FF9500" />;
      case 'In Progress':
        return <Clock size={16} color="#007AFF" />;
      case 'Resolved':
        return <CheckCircle2 size={16} color="#34C759" />;
      default:
        return <Clock size={16} color="#999" />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ticket Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Share2 size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Ticket ID and Status */}
        <View style={styles.ticketMeta}>
          <View style={styles.ticketIdContainer}>
            <Text style={styles.ticketIdLabel}>Ticket ID</Text>
            <Text style={styles.ticketId}>{ticketData.id}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: ticketData.statusColor }]}>
            {getStatusIcon()}
            <Text style={styles.statusText}>{ticketData.status}</Text>
          </View>
        </View>

        {/* Ticket Title */}
        <Text style={styles.ticketTitle}>{ticketData.title}</Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'details' && styles.activeTab]} 
            onPress={() => setActiveTab('details')}
          >
            <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'updates' && styles.activeTab]} 
            onPress={() => setActiveTab('updates')}
          >
            <Text style={[styles.tabText, activeTab === 'updates' && styles.activeTabText]}>Updates</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'details' ? (
          <View style={styles.detailsContainer}>
            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{ticketData.description}</Text>
            </View>

            {/* Images */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Images</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesContainer}>
                {ticketData.images.map((image, index) => (
                  <TouchableOpacity key={index} style={styles.imageWrapper}>
                    <Image source={{ uri: image }} style={styles.ticketImage} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Location */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Location</Text>
              <View style={styles.locationContainer}>
                <MapPin size={18} color="#007AFF" />
                <Text style={styles.locationText}>{ticketData.location}</Text>
              </View>
              <View style={styles.mapPreview}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800' }} 
                  style={styles.mapImage} 
                />
                <View style={styles.mapOverlay}>
                  <Text style={styles.mapText}>View on Map</Text>
                </View>
              </View>
            </View>

            {/* Additional Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Details</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>{ticketData.category}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Reported On</Text>
                <Text style={styles.detailValue}>{ticketData.date}, {ticketData.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Assigned To</Text>
                <Text style={styles.detailValue}>{ticketData.assignedTo}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Priority</Text>
                <Text style={[styles.detailValue, styles.priorityText]}>{ticketData.priority}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.updatesContainer}>
            {ticketData.updates.map((update, index) => (
              <View key={index} style={styles.updateItem}>
                <View style={styles.updateTimeline}>
                  <View style={styles.timelineDot} />
                  {index < ticketData.updates.length - 1 && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.updateContent}>
                  <Text style={styles.updateMessage}>{update.message}</Text>
                  <View style={styles.updateMeta}>
                    <Text style={styles.updateAuthor}>{update.author}</Text>
                    <Text style={styles.updateTime}>{update.date}, {update.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Action Button */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="white" />
          <Text style={styles.actionButtonText}>Add Comment</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  shareButton: {
    padding: 4,
  },
  ticketMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  ticketIdContainer: {
    flexDirection: 'column',
  },
  ticketIdLabel: {
    fontSize: 12,
    color: '#999',
  },
  ticketId: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    marginLeft: 4,
  },
  ticketTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  detailsContainer: {
    paddingTop: 16,
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  imagesContainer: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  imageWrapper: {
    marginHorizontal: 4,
  },
  ticketImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 15,
    color: '#444',
    marginLeft: 8,
  },
  mapPreview: {
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 15,
    color: '#666',
  },
  detailValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  priorityText: {
    color: '#FF3B30',
  },
  updatesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  updateItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  updateTimeline: {
    width: 24,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#007AFF',
    marginTop: 4,
  },
  updateContent: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
  },
  updateMessage: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  updateMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateAuthor: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },
  updateTime: {
    fontSize: 13,
    color: '#999',
  },
  actionButtonContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
});