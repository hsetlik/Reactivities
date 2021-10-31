import React from "react";
import { Container, Header, Image, Segment, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";


export default observer(function HomePage() {
    const {userStore, modalStore} = useStore();
    return (
        <Segment inverted textAlign='center' className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Reactivities
                </Header>
                    {userStore.isLoggedIn ? (
                        <>
                        <Header as='h2' inverted content='Welcome to Reactivities' />
                        <Button as={Link} to='/activities' content='Go To Activities' size='huge' inverted />
                        </>
                    ) : (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm />)} content='Login' size='huge' inverted />
                            <Button onClick={() => modalStore.openModal(<RegisterForm />)} content='Register' size='huge' inverted />
                        </>
                    )}
            </Container>
        </Segment>
    )
})