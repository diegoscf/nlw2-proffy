import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import api from '../../services/api';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import { Teacher } from '../../interfaces/teacher.interface';

interface TeacherItemProps {
    teacher: Teacher;
    favorite: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorite }) => {
    const [IsFavorite, setFavorite] = useState(favorite);
    // deep linking
    function openWhatsApp() {
        api.post('connections', { user_id: teacher.id });
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function toggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorite');
        let favs = [];

        if (favorites) {
            favs = JSON.parse(favorites);
        }

        if (IsFavorite) {
            //remove
            const favIndex = favs.findIndex((item: Teacher) => item.id === teacher.id);
            favs.splice(favIndex, 1);
            setFavorite(false);
        } else {
            //add
            favs.push(teacher);
            setFavorite(true);
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favs));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.nome}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>
            <Text style={styles.bio}>
                {teacher.bio}
            </Text>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora: {'    '}
                    <Text style={styles.priceValue}>
                        R$ {teacher.cost}
                    </Text>
                </Text>
                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={toggleFavorite}
                        style={
                            [
                                styles.favButton,
                                IsFavorite ? styles.favActive : {}
                            ]}
                    >
                        {IsFavorite
                            ? <Image source={unfavoriteIcon} />
                            : <Image source={heartOutlineIcon} />
                        }

                    </RectButton>
                    <RectButton style={styles.contactBtn} onPress={openWhatsApp}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactBtnText}>
                            Entrar em contato
                        </Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
};

export default TeacherItem;