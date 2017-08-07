import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Body, Button, Left, Title, Right, Icon,View } from 'native-base';
import { StyleSheet, Text,Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
class Login extends Component {
    constructor(props) {
        super(props)
          this.state = {
          
            email: '',
            password: '',
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
        let email = this.state.email;
        let password = this.state.password;
       
        let obj = {
          
            email: email,
            password: password,
          
        }
        console.log('object', obj)
        this.props.loginData(obj)

    }


    render() {
        return (
            <Image
        source={require('../images/1.png')}
        style={styles.container}>
                <Content>
                    <Header  style={styles.hdr} >
                        <Left
                        
                        
                        >
                            <Button transparent>
                                 <Icon name="ios-arrow-back" 
                                  onPress={() => Actions.signupCon()}
                                 />
                            </Button>
                        </Left>
                        <Body>
                            <Title>LOGIN PAGE</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Form>

                        <Item floatingLabel>
                            <Label>Email</Label>
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

                        <Button 
                        onPress={this.handleForm}
                        
                         style={styles.btn} full success>
                            <Text>Login</Text>
                        </Button>
                    </Form>





                </Content>
            </Image>
        )
    }
}



export default Login;

const styles = StyleSheet.create({
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
btn : {
    width :300,
    marginTop:150,
    marginLeft: 22,
     backgroundColor: '#1eb3cd',
}, 
inpt : {
    width:200,
    height : 60,
     backgroundColor: 'transparent',
     color:'white',
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
  },container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
