import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ChevronLeft, Camera, MapPin, Upload, X, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function CreateTicketScreen() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState('Current Location');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = [
    { id: 'pothole', name: 'Pothole', color: '#FF6B6B' },
    { id: 'streetlight', name: 'Streetlight', color: '#4ECDC4' },
    { id: 'garbage', name: 'Garbage', color: '#45B7D1' },
    { id: 'water', name: 'Water Issue', color: '#96CEB4' },
    { id: 'traffic', name: 'Traffic', color: '#FFEAA7' },
    { id: 'other', name: 'Other', color: '#D0D0D0' },
  ];

  // Find the selected category name
  const selectedCategory = categories.find(c => c.id === category)?.name || 'Select Category';

  // Handle category selection
  const handleSelectCategory = (id: string) => {
    setCategory(id);
    setShowCategoryDropdown(false);
  };

  const handleAddPhoto = () => {
    // In a real app, this would open the camera or photo picker
    // For now, we'll just add a placeholder image
    setPhotos([...photos, 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=200']);
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const handleSubmit = () => {
    // In a real app, this would submit the report to the backend
    // For now, we'll just navigate back to the tickets page
    router.push('/(tabs)/tickets');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report an Issue</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Issue Category Selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Issue Category</Text>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          <Text style={[
            styles.dropdownButtonText, 
            category === '' && { color: '#999' }
          ]}>
            {selectedCategory}
          </Text>
          <ChevronDown size={20} color="#333" />
        </TouchableOpacity>
        
        {showCategoryDropdown && (
          <View style={styles.dropdownMenu}>
            {categories.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.dropdownItem}
                onPress={() => handleSelectCategory(item.id)}
              >
                <View style={[styles.categoryDot, { backgroundColor: item.color }]} />
                <Text style={styles.dropdownItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Issue Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Describe the Issue</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Please provide details about the issue..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Photo Upload */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Photos</Text>
        <Text style={styles.sectionSubtitle}>
          Photos help authorities understand the issue better
        </Text>
        
        <View style={styles.photosContainer}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoItem}>
              <Image source={{ uri: photo }} style={styles.photoImage} />
              <TouchableOpacity
                style={styles.removePhotoButton}
                onPress={() => handleRemovePhoto(index)}
              >
                <X size={16} color="white" />
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
            <Camera size={24} color="#007AFF" />
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <TouchableOpacity style={styles.locationPicker}>
          <MapPin size={20} color="#007AFF" />
          <Text style={styles.locationText}>{location}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.mapContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800' }} 
            style={styles.mapImage} 
          />
          <View style={styles.mapOverlay}>
            <Text style={styles.mapText}>Tap to select location on map</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>

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
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  // New dropdown styles
  dropdownButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownMenu: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 4,
    padding: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  categoryDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  // Keeping these styles for reference but they're not used anymore
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 4,
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: '#000',
  },
  categoryText: {
    color: 'white',
    fontWeight: '500',
  },
  descriptionInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  photoItem: {
    width: 100,
    height: 100,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  addPhotoText: {
    color: '#007AFF',
    marginTop: 8,
    fontSize: 12,
  },
  locationPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  mapContainer: {
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
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomSpacing: {
    height: 40,
  },
});