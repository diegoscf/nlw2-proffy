import React, { useState, FormEvent } from 'react';

import './styles.css';
import PageHeader  from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input       from '../../components/Input';
import Select      from '../../components/Select';
import Subjects    from '../../constants/subjects.constant';
import Weekdays    from '../../constants/weekdays.constant';
import { Teacher } from '../../interfaces/teacher.interface';
import api         from '../../services/api';


function TeacherList() {
    const [subject, setSubject] = useState('');
    const [weekday, setWeekday] = useState('');
    const [time, setTime]       = useState('');
    
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    async function searchTeachers(evt: FormEvent) {
        evt.preventDefault();
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
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes aqui são os professores disponíveis:">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Matéria" 
                        options={Subjects}
                        value={subject}
                        onChange={(evt) => {setSubject(evt.target.value)}}
                    />
                    <Select 
                        name="weekday" 
                        label="Dia da Semana" 
                        options={Weekdays}
                        value={weekday}
                        onChange={(evt) => {setWeekday(evt.target.value)}}
                    />
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={(evt) => {setTime(evt.target.value)}}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher) => <TeacherItem key={teacher.id} teacher={teacher} />)}
            </main>
        </div>
    )
}

export default TeacherList;