import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import classIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';

function Landing() {
    const { navigate } = useNavigation();
    const [ttlConnections, setTotalConnections] = useState(0);

    // função e array de dependencias => array vazio é pra quando só for pra executar ao carregar a tela
    useEffect(
        () => {
            api.get('connections').then(resp => setTotalConnections(resp.data.total));
        },
        []
    );

    function goToTeachPage() {
        navigate('Teach');
    }

    function goToStudyPage() {
        navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>
                    O que deseja fazer?
                </Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton onPress={goToStudyPage} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>
                <RectButton
                    onPress={goToTeachPage}
                    style={[styles.button, styles.buttonSecondary]}
                >
                    <Image source={classIcon} />
                    <Text style={styles.buttonText}>Dar Aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {ttlConnections} conexões realizadas {' '}
                <Image source={heartIcon} />
            </Text>
        </View>
    );
}

export default Landing;