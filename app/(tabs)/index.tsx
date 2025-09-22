import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MapPin, Plus } from 'lucide-react-native';

export default function HomeScreen() {
  const statsData = [
    { count: '1200+', label: 'Streetlights Fixed', image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { count: '500+', label: 'Potholes Repaired', image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  const trendingCategories = [
    { name: 'Potholes', color: '#FF6B6B' },
    { name: 'Streetlights', color: '#4ECDC4' },
    { name: 'Garbage', color: '#45B7D1' },
    { name: 'Water Leak', color: '#96CEB4' },
    { name: 'Traffic', color: '#FFEAA7' },
  ];

  const nearbyIssues = [
    {
      id: 1,
      type: 'POTHOLE',
      title: 'Pothole on Main Street',
      time: '2 hours ago',
      status: 'Pending',
      statusColor: '#FF9500',
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: 2,
      type: 'STREETLIGHT',
      title: 'Streetlight Outage',
      time: '4 hours ago',
      status: 'In Progress',
      statusColor: '#007AFF',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: 3,
      type: 'GARBAGE',
      title: 'Garbage Overflowing',
      time: '6 hours ago',
      status: 'Resolved',
      statusColor: '#34C759',
      image: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Priya</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#666" />
            <Text style={styles.location}>Mumbai, IN</Text>
          </View>
        </View>
        <Text style={styles.appName}>Swaraj</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {statsData.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Image source={{ uri: stat.image }} style={styles.statImage} />
            <View style={styles.statOverlay}>
              <Text style={styles.statCount}>{stat.count}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Trending Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending in Your City</Text>
        <View style={styles.categoriesContainer}>
          {trendingCategories.map((category, index) => (
            <TouchableOpacity key={index} style={[styles.categoryChip, { backgroundColor: category.color }]}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Nearby Issues */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Issues Feed</Text>
        {nearbyIssues.map((issue) => (
          <TouchableOpacity key={issue.id} style={styles.issueCard}>
            <Image source={{ uri: issue.image }} style={styles.issueImage} />
            <View style={styles.issueContent}>
              <Text style={styles.issueType}>{issue.type}</Text>
              <Text style={styles.issueTitle}>{issue.title}</Text>
              <Text style={styles.issueTime}>Reported {issue.time}</Text>
              <View style={[styles.statusBadge, { backgroundColor: issue.statusColor }]}>
                <Text style={styles.statusText}>{issue.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Map Snapshot */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Map Snapshot</Text>
        <View style={styles.mapContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800' }} 
            style={styles.mapImage} 
          />
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonText}>View Full Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Authority Updates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Authority Updates</Text>
        <TouchableOpacity style={styles.updateCard}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=200' }} 
            style={styles.updateImage} 
          />
          <View style={styles.updateContent}>
            <Text style={styles.updateTitle}>New Road Construction</Text>
            <Text style={styles.updateDescription}>Construction on MG Road starts next week.</Text>
            <TouchableOpacity>
              <Text style={styles.readMore}>Read More</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>

      {/* Citizen Shoutouts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Citizen Shoutouts</Text>
        <View style={styles.shoutoutCard}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100' }} 
            style={styles.avatarImage} 
          />
          <View style={styles.shoutoutContent}>
            <Text style={styles.shoutoutName}>Arjun</Text>
            <Text style={styles.shoutoutCount}>50 Issues Reported</Text>
          </View>
        </View>
      </View>

      {/* Quick Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <TouchableOpacity style={styles.quickLink}>
          <Text style={styles.quickLinkText}>Track issue by ID</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickLink}>
          <Text style={styles.quickLinkText}>Find municipal office nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickLink}>
          <Text style={styles.quickLinkText}>View city-wide stats</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSpacing} />

      {/* Remove the FAB component below */}
      {/* 
      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="white" />
      </TouchableOpacity>
      */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  statImage: {
    width: '100%',
    height: '100%',
  },
  statOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  issueCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  issueImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  issueContent: {
    flex: 1,
    marginLeft: 12,
  },
  issueType: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  issueTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  mapContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: 200,
  },
  mapButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  mapButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  updateCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  updateImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  updateContent: {
    flex: 1,
    marginLeft: 12,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  updateDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  readMore: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginTop: 8,
  },
  shoutoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  shoutoutContent: {
    marginLeft: 12,
  },
  shoutoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  shoutoutCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  quickLink: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickLinkText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 100,
  },
  /*
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  */
});