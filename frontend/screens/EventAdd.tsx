import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const EventAdd: React.FC = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = () => setTimePickerVisible(false);

  const handleDateConfirm = (selectedDate: Date) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setDate(formattedDate);
    hideDatePicker();
  };

  const handleTimeConfirm = (selectedTime: Date) => {
    const hours = selectedTime.getHours().toString().padStart(2, '0');
    const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
    setTime(`${hours}:${minutes}`);
    hideTimePicker();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Add Event</Text>
        <Text style={styles.description}>This information will be displayed publicly, so be careful what you share.</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your event title"
          />
        </View>

        <View style={styles.inputGroupFull}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={3}
            placeholder="Write a few sentences about the event."
          />
        </View>

        <View style={styles.inputGroupFull}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={styles.input}
              placeholder="Select Date"
              value={date}
              editable={false}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.inputGroupFull}>
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity onPress={showTimePicker}>
            <TextInput
              style={styles.input}
              placeholder="Select Time"
              value={time}
              editable={false}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={timePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
        </View>

        <View style={styles.inputGroupFull}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.inputGroupFull}>
          <Text style={styles.label}>Cover photo (optional)</Text>
          <View style={styles.coverPhotoContainer}>
            <Text style={styles.coverPhotoText}>Upload a file or drag and drop</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    maxWidth: 800,
    alignSelf: 'center',
  },
  section: {
    marginBottom: 24,
  },
  
  description: {
    fontSize: 14,
    color: '#FF0000',
    marginTop: 8,
    lineHeight: 20,
  },
  inputGroup: {
    marginTop: 20,
  },
  inputGroupFull: {
    marginTop: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 15,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 15,
    textAlignVertical: 'top',
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  coverPhotoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 30,
    marginTop: 12,
    backgroundColor: '#F9FAFB',
  },
  coverPhotoText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  uploadButton: {
    marginTop: 10,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#10B981',
    marginRight: 10,
    marginBottom:20,
  },
  saveButton: {
    backgroundColor: '#10B981',
    marginBottom:20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  title:
  {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  
   
});

 
export default EventAdd;
