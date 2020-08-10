import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import { Teacher } from '../../interfaces/teacher.interface';

function Favorites() {
    // const {goBack} = useNavigation();
    const [favorites, setFavorites] = useState<Teacher[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorite').then(resp => {
            if (resp) {
                setFavorites(JSON.parse(resp).map((teacher: Teacher) => teacher));
            }
        });
    }

    useFocusEffect(() => loadFavorites());

    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map(
                    teacher => <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        favorite
                    />
                )}
            </ScrollView>
        </View>
    );
}

export default Favorites;