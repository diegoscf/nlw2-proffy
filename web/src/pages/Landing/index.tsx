import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import './styles.css';

import logoImg         from '../../assets/images/logo.svg';
import landingImg      from '../../assets/images/landing.svg';
import studyIcon       from '../../assets/images/icons/study.svg';
import toTeachIcon     from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import api             from '../../services/api';


function Landing() {
    const [ttlConnections, setTotalConnections] = useState(0);

    // função e array de dependencias => array vazio é pra quando só for pra executar ao carregar a tela
    useEffect(
        () => {
            api.get('connections').then(resp => setTotalConnections(resp.data.total));
        }, 
        []
    );

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                <img 
                    src={landingImg} 
                    alt="Plataforma de estudos" 
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>
                    <Link to="teach" className="give-classes">
                        <img src={toTeachIcon} alt="Dar Aulas"/>
                        Dar Aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {ttlConnections} conexões já realizadas.
                    <img src={purpleHeartIcon} alt="Coração roxo"/>
                </span>
            </div>
        </div>
    )
}

export default Landing;