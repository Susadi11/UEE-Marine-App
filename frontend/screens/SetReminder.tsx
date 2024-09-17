import React, { useState } from 'react';
import { View, Text, Alert, Modal, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarEvents from 'react-native-calendar-events';
import ToggleSwitch from '../components/Tharushi/ToggleSwitch';

const SetReminderScreen = ({ route, navigation }: any) => {
    const { event } = route.params;
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [reminderEnabled, setReminderEnabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(prevDate => new Date(selectedDate.setHours(prevDate.getHours(), prevDate.getMinutes())));
        }
    };

    const handleTimeChange = (event: any, selectedDate: Date | undefined) => {
        setShowTimePicker(false);
        if (selectedDate) {
            setDate(prevDate => new Date(prevDate.setHours(selectedDate.getHours(), selectedDate.getMinutes())));
        }
    };

    const handleSaveReminder = async () => {
        if (!reminderEnabled) {
            Alert.alert('Reminder Disabled', 'Please enable the reminder toggle to set a reminder.');
            return;
        }

        const endDate = new Date(date.getTime() + 60 * 60 * 1000);

        try {
            await CalendarEvents.saveEvent(event.title, {
                startDate: date.toISOString(),
                endDate: endDate.toISOString(),
                notes: event.description,
                location: `Latitude: ${event.location.latitude}, Longitude: ${event.location.longitude}`,
            });
            setModalVisible(true);
        } catch (error) {
            Alert.alert('Error', 'Failed to add event to calendar');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Set Reminder</Text>

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                <Text style={styles.dateText}>Date: {date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
                <Text style={styles.dateText}>Time: {date.toLocaleTimeString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={showDatePicker}
                    onRequestClose={() => setShowDatePicker(false)}
                >
                    <View style={styles.pickerContainer}>
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="spinner"
                            onChange={handleDateChange}
                        />
                        <Pressable style={styles.closeButton} onPress={() => setShowDatePicker(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </Modal>
            )}

            {showTimePicker && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={showTimePicker}
                    onRequestClose={() => setShowTimePicker(false)}
                >
                    <View style={styles.pickerContainer}>
                        <DateTimePicker
                            value={date}
                            mode="time"
                            display="spinner"
                            onChange={handleTimeChange}
                        />
                        <Pressable style={styles.closeButton} onPress={() => setShowTimePicker(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </Modal>
            )}

            <ToggleSwitch isEnabled={reminderEnabled} onToggle={() => setReminderEnabled(!reminderEnabled)} />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveReminder}>
                <Text style={styles.saveButtonText}>Save Reminder</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                    navigation.goBack();
                }}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Reminder successfully added to your calendar!</Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.goBack();
                            }}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        marginTop: -250,
    },
    dateButton: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '80%',
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    dateText: {
        fontSize: 18,
        color: '#007BFF',
    },
    pickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.91)',
        padding: 20,
    },
    closeButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        width: '60%',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
         
    },
    saveButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        color: '#333',
        marginTop: 10,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SetReminderScreen;
