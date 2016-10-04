// Import libraries for making a component
import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  AlertIOS,
  ActivityIndicator} from 'react-native';
import t from 'tcomb-form-native';

// App components
import Main from '../main/Main.js';
import MenuButton from '../nav/MenuButton.js';
import MyAdventures from '../MyAdventures/myAdventuresContainer';

// Create Session Storage Key for AsyncStorage
var STORAGE_KEY = 'id_token';

var Email = t.refinement(t.String, string => {
  return /^\w+@\w+\.\w+$/i.test(string);
}, 'Email')

var Form = t.form.Form;

var Person = t.struct({
  email: Email,
  password: t.String
});

var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true,
      error: 'Enter a password',
      placeholder: '********',
      autoCapitalize: 'none',
      autoCorrect: false
    },
    email: {
      error: 'Enter a valid email',
      placeholder: 'yourname@gmail.com',
      autoCapitalize: 'none',
      autoCorrect: false
    }
  }
};

// Auth Component Class
var Auth = React.createClass({

 // Update the local storage session
 // after sign up / sign in and refreshing session token
 async _onValueChange(item, selectedValue) {
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
    // Test AsyncStorage
    // var session = AsyncStorage.getItem(STORAGE_KEY);
    // console.log('stored session: ', session);
  },

  // Clear Form
  clearForm() {
    this.setState({ input: null });
  },

  // SignUp Handler
  userSignUp() {
    var input = this.refs.form.getValue();
    if (input) {
      this.setSpinner();
      fetch("https://treasure-trek.herokuapp.com/api/signup", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password
        })
      }).then(function (res){
        return res.json()
      }).then((data)=> {
        this.setSpinner();
        //Check for Valid Token
        if (data.userid) {
          this._onValueChange(STORAGE_KEY, data.userid);
          // AlertIOS.alert( "Signup Success!" );
          this.props.resetToRoute({
            name: "My Adventures",
            component: MyAdventures,
            leftCorner: MenuButton
          });
        } else {
          AlertIOS.alert( "Someone has that email. Signup with a new email or Login" );
          this.clearForm();
        }
      })
      .done();
    }
  },

  // SignIn Handler
  userLogin() {
    var input = this.refs.form.getValue();
    if (input) {
      this.setSpinner();
      fetch("https://treasure-trek.herokuapp.com/api/signin", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password
        })
      }).then(function (res){
        return res.json()
      }).then((data)=> {
        this.setSpinner();
        if (data.userid) {
          this._onValueChange(STORAGE_KEY, data.userid);
          // AlertIOS.alert( "Login Success!" );
          this.props.resetToRoute({
            name: "My Adventures",
            component: MyAdventures,
            leftCorner: MenuButton
          });
        } else {
          AlertIOS.alert( "Invalid Email/Password. Try again." );
          this.clearForm();
        }
      })
      .done();
    }
  },



  // Logout Handler
  async userLogout() {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        AlertIOS.alert("Logout Success!");
        this.clearForm();
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
  },

  setSpinner() {
    this.setState({
      waiting: !this.state.waiting
    });
  },

  componentWillMount() {
    this.setState({
      waiting: false
    })
  },

  render() {
    return (
      <Image source={require('../../resources/land-blue.png')}>

          <View style={styles.container}>
            <ActivityIndicator
            animating={this.state.waiting}
            size = "large"
            />
            <View>
              <Form
                ref="form"
                type={Person}
                options={options}
              />
            </View>
            <View>
              <TouchableHighlight style={styles.button} onPress={this.userSignUp} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.button} onPress={this.userLogin} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableHighlight>
            </View>
          </View>

      </Image>
    );
  }
});

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    paddingTop: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2 },
    shadowOpacity: 0.9,
    elevation: 2,
    position: 'relative'
  },
  textStyle1: {
    fontSize: 12,
  },
  textStyle2: {
    fontSize: 8,
  },
  submitStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  container: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 10,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(52,52,52,0)'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
}

// Make componenet available for other parts of the app
export default Auth;
