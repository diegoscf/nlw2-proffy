import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import bgImg from '../../assets/images/give-classes-background.png';

function Teach() {
    const { goBack } = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="contain"
                source={bgImg}
                style={styles.content}
            >
                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar pelo site.
                </Text>
            </ImageBackground>

            <RectButton onPress={goBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>
                    Tudo bem
                </Text>
            </RectButton>
        </View>
    );
}

export default Teach;