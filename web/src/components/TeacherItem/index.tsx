import React from 'react';

import './styles.css';
import whatsIcon   from '../../assets/images/icons/whatsapp.svg';
import { Teacher } from '../../interfaces/teacher.interface';
import api from '../../services/api';

interface TeacherItemProps {
    teacher: Teacher
}
const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {

    function addConnection() {
        api.post('connections', {user_id: teacher.id});
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>{teacher.bio}</p>
            <footer>
                <p>
                    Preço por hora:
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a 
                    href={`https://wa.me/${teacher.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={addConnection}
                >
                    <img src={whatsIcon} alt="WhatsApp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;