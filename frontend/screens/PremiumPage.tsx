import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

type RootStackParamList = {
  PremiumPage: undefined;
  // Add other screen names and their param types here
};

type PremiumPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PremiumPage'>;

const PremiumPage: React.FC = () => {
  const navigation = useNavigation<PremiumPageNavigationProp>();
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const benefits: Array<{ icon: keyof typeof Ionicons.glyphMap; text: string }> = [
    { icon: 'musical-note-outline', text: 'Ad-free music listening' },
    { icon: 'download-outline', text: 'Download to listen offline' },
    { icon: 'shuffle-outline', text: 'Play songs in any order' },
    { icon: 'headset-outline', text: 'High audio quality' },
    { icon: 'people-outline', text: 'Listen with friends in real time' },
    { icon: 'list-outline', text: 'Organize listening queue' },
  ];

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Premium</Text>
          <Text style={styles.headerSubtitle}>
            Try 1 month of Premium Individual for FREE with MyApp.
          </Text>
        </View>

        <TouchableOpacity style={styles.tryButton}>
          <Text style={styles.tryButtonText}>Try FREE for 1 month</Text>
        </TouchableOpacity>

        <Text style={styles.fineText}>
          FREE for 1 month, then $9.99 per month after. Offer only available if
          you haven't tried Premium before and you subscribe via MyApp. Offers via
          app stores may differ. Terms apply.
        </Text>

        <View style={styles.whyJoinSection}>
          <Text style={styles.sectionTitle}>Why join Premium?</Text>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <Ionicons name={benefit.icon} size={24} color="#6C9EE5" />
              <Text style={styles.benefitText}>{benefit.text}</Text>
            </View>
          ))}
        </View>

        {/* Individual Plan */}
        <View style={styles.planCard}>
          <View style={[styles.freeTrialBadge, styles.individualFreeTrialBadge]}>
            <Text style={styles.freeTrialText}>LKR 0 for 1 month</Text>
          </View>
          <View style={styles.planHeader}>
            <Ionicons name="musical-note" size={24} color="#000000" />
            <Text style={styles.planType}>Premium</Text>
          </View>
          <Text style={styles.planName}>Individual</Text>
          <Text style={styles.planPrice}>LKR 0 for 1 month</Text>
          <Text style={styles.planSubPrice}>LKR 749 / month after</Text>
          <View style={styles.planFeatures}>
            <Text style={styles.planFeatureText}>• 1 Premium account</Text>
            <Text style={styles.planFeatureText}>• Cancel anytime</Text>
            <Text style={styles.planFeatureText}>• Subscribe or one-time payment</Text>
          </View>
          <TouchableOpacity style={[styles.planButton, styles.individualButton]}>
            <Text style={styles.planButtonText}>Try LKR 0 for 1 month</Text>
          </TouchableOpacity>
          <Text style={styles.fineText}>
            LKR 0 for 1 month, then LKR 749 per month after. Offer available only if you haven't tried Premium before. Terms apply.
          </Text>
        </View>

        {/* Student Plan */}
        <View style={styles.planCard}>
          <View style={[styles.freeTrialBadge, styles.studentFreeTrialBadge]}>
            <Text style={styles.freeTrialText}>LKR 0 for 1 month</Text>
          </View>
          <View style={styles.planHeader}>
            <Ionicons name="musical-note" size={24} color="#000000" />
            <Text style={styles.planType}>Premium</Text>
          </View>
          <Text style={styles.planName}>Student</Text>
          <Text style={styles.planPrice}>LKR 0 for 1 month</Text>
          <Text style={styles.planSubPrice}>LKR 375 / month after</Text>
          <View style={styles.planFeatures}>
            <Text style={styles.planFeatureText}>• 1 verified Premium account</Text>
            <Text style={styles.planFeatureText}>• Discount for eligible students</Text>
            <Text style={styles.planFeatureText}>• Cancel anytime</Text>
            <Text style={styles.planFeatureText}>• Subscribe or one-time payment</Text>
          </View>
          <TouchableOpacity style={[styles.planButton, styles.studentButton]}>
            <Text style={styles.planButtonText}>Try LKR 0 for 1 month</Text>
          </TouchableOpacity>
          <Text style={styles.fineText}>
            LKR 0 for 1 month, then LKR 375 per month after. Offer available only to students at an accredited higher education institution and if you haven't tried Premium before. Terms apply.
          </Text>
        </View>

        {/* Family Plan */}
        <View style={styles.planCard}>
          <View style={[styles.freeTrialBadge, styles.familyFreeTrialBadge]}>
            <Text style={styles.freeTrialText}>LKR 0 for 1 month</Text>
          </View>
          <View style={styles.planHeader}>
            <Ionicons name="musical-note" size={24} color="#000000" />
            <Text style={styles.planType}>Premium</Text>
          </View>
          <Text style={styles.planName}>Family</Text>
          <Text style={styles.planPrice}>LKR 0 for 1 month</Text>
          <Text style={styles.planSubPrice}>LKR 1,269 / month after</Text>
          <View style={styles.planFeatures}>
            <Text style={styles.planFeatureText}>• Up to 6 Premium accounts</Text>
            <Text style={styles.planFeatureText}>• Cancel anytime</Text>
            <Text style={styles.planFeatureText}>• Subscribe or one-time payment</Text>
          </View>
          <TouchableOpacity style={[styles.planButton, styles.familyButton]}>
            <Text style={styles.planButtonText}>Try LKR 0 for 1 month</Text>
          </TouchableOpacity>
          <Text style={styles.fineText}>
            LKR 0 for 1 month, then LKR 1,269 per month after. Offer available only if you haven't tried Premium before. Terms apply.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    fontFamily: 'Inter_700Bold'
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#808080',
    fontFamily: 'Inter_600SemiBold',
  },
  tryButton: {
    backgroundColor: '#6C9EE5',
    padding: 15,
    borderRadius: 25,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  tryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter_600SemiBold',
  },
  fineText: {
    fontSize: 12,
    color: '#808080',
    marginHorizontal: 20,
    marginTop: 10,
    fontFamily: 'Inter_500Medium',
  },
  whyJoinSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    fontFamily: 'Inter_700Bold'
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitText: {
    color: '#000000',
    fontSize: 16,
    marginLeft: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  planCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    padding: 20,
    margin: 16,
    position: 'relative',
  },
  freeTrialBadge: {
    position: 'absolute',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  individualFreeTrialBadge: {
    backgroundColor: '#F88379', // Ocean blue
  },
  studentFreeTrialBadge: {
    backgroundColor: '#D2BFA6', // Lighter marine blue
  },
  familyFreeTrialBadge: {
    backgroundColor: '#016C6B', // Deeper marine blue
  },
  freeTrialText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  planType: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000000',
    fontFamily: 'Inter_600SemiBold',
  },
  planName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
    fontFamily: 'Inter_600SemiBold',
  },
  planPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Inter_600SemiBold',
  },
  planSubPrice: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
    fontFamily: 'Inter_500Medium',
  },
  planFeatures: {
    marginBottom: 15,
  },
  planFeatureText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Inter_500Medium',
  },
  planButton: {
    backgroundColor: '#6C9EE5',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  individualButton: {
    backgroundColor: '#F88379', // Ocean blue
  },
  studentButton: {
    backgroundColor: '#D2BFA6', // Lighter marine blue
  },
  familyButton: {
    backgroundColor: '#016C6B', // Deeper marine blue
  },
  planButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});

export default PremiumPage;
