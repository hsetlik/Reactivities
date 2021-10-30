import React from "react";
import { Container, Header, Image, Segment, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';


export default function HomePage() {
    return (
        <Segment inverted textAlign='center' className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Reactivities
                </Header>
                <Button as={Link} to='/activities' content='Enter' size='huge' inverted />
            </Container>
        </Segment>
    )
}