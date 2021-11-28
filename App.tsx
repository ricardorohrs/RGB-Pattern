import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

import { AuthProvider } from './src/contexts/authContext';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <AuthProvider>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </SafeAreaProvider>
            </AuthProvider>
        );
    }
}
