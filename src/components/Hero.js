import path from "path";
import React, { useState, useEffect } from "react";
import { Card, Icon, Item, Image, Input, Header } from "semantic-ui-react";
import faker from "faker";
import axios from "axios";
import { Jumbotron, Container } from "react-bootstrap";
import css from './Hero.css';
import { NavBar } from './Navbar';



const Hero = ({ 
    results, 
    setResults, 
    show, 
    setShow 
}) => {

    return (
        <Container fluid>
            <Container style={{
                background: 'purple',
                height: '800px',
                backgroundImage: `url('/resources/rock_climbing_hanging_crop.jpeg')`, backgroundSize: 'cover'
            }}
            >
                <NavBar
                    results={results}
                    setResults={setResults}
                    show={show}
                    setShow={setShow} />
                <Header inverted color='orange' textAlign='right' style={{ fontFamily: 'Ultra', fontSize: '6rem', paddingRight: '50px', paddingTop: '50px' }}>The Great Outdoors</Header>
                <Header inverted textAlign='right' style={{ fontSize: '6rem', paddingRight: '50px', paddingTop: '25px', fontFamily: 'Calligraffitti' }}>Adventure awaits</Header>
            </Container>
        </Container>

    )

}

export { Hero }