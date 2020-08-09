import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';

import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';
import PageHeader  from '../../components/PageHeader';
import Input       from '../../components/Input';
import Textarea    from '../../components/Textarea';
import Select      from '../../components/Select';
import Subjects    from '../../constants/subjects.constant';
import Weekdays    from '../../constants/weekdays.constant';
import api         from '../../services/api';

function TeacherForm() {
    const history = useHistory();

    const [name, setName]         = useState('');
    const [avatar, setAvatar]     = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [bio, setBio]           = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost]       = useState('');


    const [scheduleItems, setScheduleItems] = useState([
        {
            weekday: 0,
            from: '',
            to: ''
        },
    ]); 

    function addScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {
                weekday: 0,
                from: '',
                to: ''
            }
        ]);
    }

    function setScheduleItemValue(index: number, field: string, value: string) {
        const updatedItems = scheduleItems.map((scheduleItem, scheduleIndex) =>{
            if (index === scheduleIndex) {
                return {...scheduleItem, [field]: value};
            }
            return scheduleItem;
        });

        setScheduleItems(updatedItems);
    }

    function createClass(evt: FormEvent) {
        evt.preventDefault();
        console.log({
            name, 
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        });

        api
            .post(
                'classes',
                {
                    name, 
                    avatar,
                    whatsapp,
                    bio,
                    subject,
                    cost: Number(cost),
                    schedule: scheduleItems
                }
            )
            .then(() => {
                alert('Sucesso');
                history.push('/');
            })
            .catch(() => alert('Erro!'));
    }    

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas!"
                description="O primeiro passo é preencher o formulário de inscrição"
            />
            <main>
                <form onSubmit={createClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            name="name" 
                            label="Nome Completo"
                            value={name}
                            onChange={(evt) => {setName(evt.target.value)}}
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar}
                            onChange={(evt) => {setAvatar(evt.target.value)}}
                        />
                        <Input 
                            name="whatsapp" 
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(evt) => {setWhatsApp(evt.target.value)}}
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            onChange={(evt) => {setBio(evt.target.value)}}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            name="subject" 
                            label="Matéria" 
                            options={Subjects}
                            value={subject}
                            onChange={(evt) => {setSubject(evt.target.value)}}
                        />
                        <Input 
                            name="cost" 
                            label="Custo da hora/aula"
                            value={cost}
                            onChange={(evt) => {setCost(evt.target.value)}}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários Disponíveis
                            <button type="button" onClick={addScheduleItem}>
                                + Novo Horário
                            </button>
                        </legend>

                        {scheduleItems.map((item, index) => (    
                            <div key={index} className="schedule-item">
                                <Select 
                                    name="weekday" 
                                    label="Dia da Semana" 
                                    options={Weekdays}
                                    value={item.weekday}
                                    onChange={evt => setScheduleItemValue(index, 'weekday', evt.target.value)}
                                />
                                <Input 
                                    name="from" 
                                    label="De" 
                                    type="time"
                                    value={item.from}
                                    onChange={evt => setScheduleItemValue(index, 'from', evt.target.value)}
                                />
                                <Input 
                                    name="to" 
                                    label="Até" 
                                    type="time"
                                    value={item.to}
                                    onChange={evt => setScheduleItemValue(index, 'to', evt.target.value)}
                                />
                            </div>
                        ))}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante!"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;