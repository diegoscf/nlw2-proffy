import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { RectButton, TextInput, BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import api from '../../services/api';
import { Teacher } from '../../interfaces/teacher.interface';

function TeachersList() {
    // contentContainerStyle é melhor para aplicar padding
    // SELECT -> expo picker

    const [IsFilterOn, setFilterVisibility] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [weekday, setWeekday] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorite').then(resp => {
            if (resp) {
                // setFavorite(JSON.parse(resp));
                setFavorites(
                    JSON.parse(resp).map((teacher: Teacher) => teacher.id)
                );
            }
        });
    }

    // segundo param vazio, só dispara uma vez, ao carregar
    // caso tenha uma variável, dispara sempre que ela mudar seu valor
    // useEffect(
    //     () => {
    //         AsyncStorage.getItem('favorite').then(resp => {
    //             if (resp) {
    //                 // setFavorite(JSON.parse(resp));
    //                 setFavorites(
    //                     JSON.parse(resp).map((teacher: Teacher) => teacher.id)
    //                 );
    //             }
    //         });
    //     }, 
    //     []
    // );

    // CONTEXTO DO REACT NATIVE
    //useFocusEffect(() => loadFavorites());

    async function searchTeachers() {
        loadFavorites();
        const response = await api.get(
            'classes',
            {
                params: {
                    subject,
                    weekday,
                    time
                }
            }
        );

        console.log(response.data);
        setFilterVisibility(false);
        setTeachers(response.data);
    }

    function toggleFilter() {
        setFilterVisibility(!IsFilterOn);
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                btnFilter={(
                    <BorderlessButton onPress={toggleFilter}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                {IsFilterOn && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>
                            Matéria
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>
                                    Dia da Semana
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={weekday}
                                    onChangeText={text => setWeekday(text)}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>
                                    Horário
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>
                        <RectButton style={styles.btnSubmit} onPress={searchTeachers}>
                            <Text style={styles.btnSubmitText}>
                                Filtrar
                            </Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map(
                    teacher => <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        favorite={favorites.includes(teacher.id)}
                    />
                )}
            </ScrollView>
        </View>
    );
}

export default TeachersList;