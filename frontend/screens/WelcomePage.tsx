import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
const WelcomePage= ({ navigation }: { navigation: any}) => {
  return (
    <View style={styles.container}>
            <Text style={styles.title}>AquaVista</Text>
            <Text style={styles.subtitle}>bla bla bla</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.replace('Main')}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 30,
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 2,
    },
    subtitle: {
        marginTop: 30,
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 6,
    },
    button: {
        marginTop: 60,
        backgroundColor: 'black',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default WelcomePage;