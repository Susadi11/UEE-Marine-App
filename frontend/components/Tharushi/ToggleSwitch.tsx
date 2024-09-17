import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ToggleSwitchProps {
    isEnabled: boolean;
    onToggle: () => void;
}

const ToggleSwitch = ({ isEnabled, onToggle }: ToggleSwitchProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enable</Text>
            <TouchableOpacity style={styles.switchContainer} onPress={onToggle}>
                <View style={[styles.switchBackground, isEnabled && styles.switchBackgroundOn]}>
                    <View style={[styles.switchThumb, isEnabled && styles.switchThumbOn]} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
    },
    switchContainer: {
        width: 60,
        height: 30,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    switchBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: '#bbb',
        borderRadius: 15,
        position: 'absolute',
    },
    switchBackgroundOn: {
        backgroundColor: '#4CAF50',
    },
    switchThumb: {
        width: 26,
        height: 26,
        backgroundColor: '#fff',
        borderRadius: 13,
        position: 'absolute',
        top: 2,
        left: 2,
        transform: [{ translateX: 0 }],
    },
    switchThumbOn: {
        transform: [{ translateX: 30 }],
    },
});

export default ToggleSwitch;
