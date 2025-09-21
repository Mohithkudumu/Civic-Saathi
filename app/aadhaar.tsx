import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function AadhaarScreen() {
  const [aadhaarNumber, setAadhaarNumber] = useState('');

  const formatAadhaar = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  const handleAadhaarChange = (text: string) => {
    const formatted = formatAadhaar(text);
    if (formatted.replace(/\s/g, '').length <= 12) {
      setAadhaarNumber(formatted);
    }
  };

  const handleVerify = () => {
    const cleanedNumber = aadhaarNumber.replace(/\s/g, '');
    if (cleanedNumber.length !== 12) {
      Alert.alert('Invalid Aadhaar Number', 'Please enter a valid 12-digit Aadhaar number');
      return;
    }
    router.push('/otp');
  };

  const handleSkip = () => {
    router.push('/otp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Aadhaar Number</Text>
        <Text style={styles.subtitle}>
          Please enter your 12-digit Aadhaar number to proceed.
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="XXXX XXXX XXXX"
            placeholderTextColor="#999"
            value={aadhaarNumber}
            onChangeText={handleAadhaarChange}
            keyboardType="number-pad"
            maxLength={14} // 12 digits + 2 spaces
          />
        </View>
        
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>I don't have an Aadhaar number</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By proceeding, you agree to our Terms of Service and Privacy Policy. 
          Your Aadhaar details are used for KYC verification and are not stored.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 32,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  verifyButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});