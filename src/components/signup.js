import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Body, Button, Left, Title, Right, Icon } from 'native-base';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            cpassword: ''
        }
        this.handleForm = this.handleForm.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput = (e) => {
        this.setState({
            value: e.target.value
        })

    }
    handleForm = (e) => {
        e.preventDefault();
        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;
        let cpassword = this.state.cpassword;
        let obj = {
            name: name,
            email: email,
            password: password,
            cpassword: cpassword
        }
        console.log('object', obj)
        this.props.SignupData(obj)

    }

    render() {
        return (
            <Image
                source={require('../images/1.png')}
                style={styles.container}>
                <Content>
                    <Header style={styles.hdr} >
                        <Left


                        >
                            <Button transparent>
                                <Icon name="ios-arrow-back"
                                    onPress={() => Actions.loginCon()}

                                />
                            </Button>
                        </Left>
                        <Body>
                            <Title>SIGNUP PAGE</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Form onSubmit={this.handleForm}>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input
                                style={styles.inpt}
                                value={this.state.value}
                                onChangeText={(name) => this.setState({ name })}

                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Useremail</Label>
                            <Input

                                style={styles.inpt}
                                value={this.state.value}
                                onChangeText={(email) => this.setState({ email })}

                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input

                                secureTextEntry
                                style={styles.inpt}
                                value={this.state.value}
                                onChangeText={(password) => this.setState({ password })}

                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Confirm Password</Label>
                            <Input
                                secureTextEntry
                                style={styles.inpt}
                                value={this.state.value}
                                onChangeText={(cpassword) => this.setState({ cpassword })}

                            />
                        </Item>

                        <Button
                            type='submit'
                            onPress={this.handleForm}
                            style={styles.btn} full success>
                            <Text>sign up</Text>
                        </Button>
                    </Form>
                    <View  >

                        <Text style={styles.txt}>Have an account ? <Text onPress={() => Actions.loginCon()} style={{ color: '#1eb3cd' }}> Sign in</Text></Text>

                    </View>

                </Content>
            </Image>
        )
    }
}



export default Signup;

const styles = StyleSheet.create({
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
    btn: {
        width: 300,
        marginTop: 30,
        marginLeft: 22,
        backgroundColor: '#1eb3cd',
    },
    inpt: {
        width: 200,
        height: 60,
        backgroundColor: 'transparent',
        color: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',



    },
    background: {
        backgroundColor: '#acbad1',
        justifyContent: 'center'
    },
    hdr: {
        backgroundColor: '#1eb3cd',
    },
    active: {
        borderWidth: 2,
        borderColor: '#00ff00',
    },
    txt: {
        color: 'white',
        marginLeft: 80,
        marginTop: 20
    }, container: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },

});
