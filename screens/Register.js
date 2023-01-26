import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Colors,
    Button,
    TextInput,
    placeholder,
    setState,
    onChangeText,
    Alert,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const RegisterScreen = ( {navigation} ) => {
    const [date, setDate] = useState(new Date());
    const [username, setUsername] = useState('');
    const [checkValidUsername, setCheckValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [checkValidPassword, setCheckValidPassword] = useState(false);
    const [checkSpecialChar, setCheckSpecialChar] = useState(false);
    const [checkUpperChar, setCheckUpperChar] = useState(false);
    const [checkDigitChar, setCheckDigitChar] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checkValidConfirmPassword, setCheckValidConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const [mobileNum, setMobileNum] = useState('');
    const [checkValidMobileNumber, setCheckValidMobileNumber] = useState(false);

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
          DateTimePickerAndroid.open({
              value: date,
              onChange,
              mode: currentMode,
              is24Hour: true,
              maximumDate: new Date(),
          }, 
          );
      };
  
      const showDatepicker = () => {
          showMode('date');
      };

    const RegisterUser = async () => {
        try{
            const response = await fetch('http://localhost:8000/api/customerregister', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    birthdate: date.toLocaleDateString(),
                    password: password,
                    email: email,
                    mobile_number: mobileNum
                })
            });
            if ((response).status === 201) {
                setUsername('');
                setPassword('');
                setEmail('');
                setMobileNum('');
                Alert.alert('User Created Successfully!');
                navigation.navigate('Login');
            }
            if ((response).status === 500){
                Alert.alert('Username Already Exists');
            }
        const json = await response.json();
        setData(json.customeruser);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    const handleCheckUsername = text => {
        if (text.length < 8){
            setCheckValidUsername(true);
        }else{
            setCheckValidUsername(false);
        }
    }

    const handleCheckPassword = text => {
        //let strongpassword = /^(?=(?:[^A-Z]*[A-Z]){1})(?=(?:[^0-9]*[0-9]){1}).{8,}$/;
        let upper = /(?=(?:[^A-Z]*[A-Z]){1})/;
        let special = /(?=[^!@#$&*]*[!@#$&*])/;
        let digit = /(?=(?:[^0-9]*[0-9]){1})/;
        setPassword(text)
        if (text.length < 8){
            setCheckValidPassword(true);
        } else {
            setCheckValidPassword(false);
        }
        if(upper.test(text)){
            setCheckUpperChar(false);
        } else {
            setCheckUpperChar(true);
        }
        if(special.test(text)){
            setCheckSpecialChar(false);
        } else {
            setCheckSpecialChar(true);
        }
        if(digit.test(text)){
            setCheckDigitChar(false);
        } else {
            setCheckDigitChar(true);
        }
    }

    const handleCheckConfirmPassword = (text, password) => {
        if (text != password){
            setCheckValidConfirmPassword(true);
        }else{
            setCheckValidConfirmPassword(false);
        }
    }

    const handleCheckEmail = text => {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEmail(text)
        if(regex.test(text)){
            setCheckValidEmail(false);
        } else {
            setCheckValidEmail(true);
        }
    }

    const handleCheckMobileNumber = text => {
        if (text.length != 11){
            setCheckValidMobileNumber(true);
        }else{
            setCheckValidMobileNumber(false);
        }
    }

    const handleUserValidation = () => {
        errors = [];

        let regex2 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regex2.test(email) == false){
            errors.push("Invalid Email format")
        }
        if (username.length < 8){
            errors.push("Username should have at least 8 characters")
        }
        if (password.length < 8){
            errors.push("Password should have at least 8 characters")
        }
        if(checkUpperChar == true){
            errors.push("Password should have at least 1 Uppercase character")
        }
        if(checkSpecialChar == true){
            errors.push("Password should have at least 1 Special character")
        }
        if(checkDigitChar == true){
            errors.push("Password should have at least 1 Digit");
        }
        if (password != confirmPassword){
            errors.push("Password is not the same as Confirm Password")
        }
        if (mobileNum.length != 11){
            errors.push("Mobile number should be valid 11 digit number")
        }
        if (errors.length == 0){
            RegisterUser();
        }else{
            Alert.alert("Error!", errors.join('\n'))
        }
    }


    return(
        <View style = {styles.body}>
            <Image source = { require('../images/paw.png')} style = {styles.paw}/>
            <Image source = { require('../images/bone.png')} style = {styles.bone}/>
            <TouchableOpacity onPress={ () => navigation.goBack(null)} style = {{ marginBottom: -80 }}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

            
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.whiteBox}>
            <ScrollView>

            <Text style = {styles.header}>Sign Up</Text>

        
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [handleCheckUsername(text), setUsername(text)] }
            placeholder='Enter Username'
            placeholderTextColor= 'gray'
            maxLength={15} 
            />
            <Image source = { require('../images/userIcon.png')} style = {styles.userIcon}/>
            {
            checkValidUsername ? (
                <Text style = {styles.textFailed}>Username should contain atleast 8 characters</Text>
                ) : (
                <Text style = {styles.textFailed}> </Text>
            )
            }    

            <TextInput 
            style = { styles.input }
            placeholder = 'Enter Password'
            placeholderTextColor= 'gray'
            maxLength={15}
            secureTextEntry = {true}
            onChangeText = { (text) => [handleCheckPassword(text), setPassword(text)] } />
            <Image source = { require('../images/password.png')} style = {styles.userIcon}/>
            {checkValidPassword ? (
                <Text style = {styles.textFailed}>Password should be at least 8 Characters</Text>
                ) : (
                <Text style = {styles.noText}> </Text>
            )}
            {checkUpperChar ? (
                <Text style = {styles.textFailed}>Password should contain atleast 1 Uppercase character</Text>
                ) : (
                <Text style = {styles.noText}> </Text>
            )}
            {checkSpecialChar ? (
                <Text style = {styles.textFailed}>Password should contain atleast 1 Special character</Text>
                ) : (
                <Text style = {styles.noText}> </Text>
            )}
            {checkDigitChar ? (
                <Text style = {styles.textFailed}>Password should contain atleast 1 Digit</Text>
                ) : (
                <Text style = {styles.noText}> </Text>
            )}
            

            <TextInput 
            style = { styles.input }
            placeholder = 'Confirm Password'
            placeholderTextColor= 'gray'
            maxLength={15}
            secureTextEntry = {true}
            onChangeText = { (text) => [handleCheckConfirmPassword(text, password), setConfirmPassword(text)] } />
            <Image source = { require('../images/password.png')} style = {styles.userIcon}/>
            {
            checkValidConfirmPassword ? (
                <Text style = {styles.textFailed}>Password and Confirm Password isnt the same</Text>
                ) : (
                <Text style = {styles.textFailed}> </Text>
            )
            }

            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [handleCheckEmail(text), setEmail(text)] }
            placeholder='Enter Email'
            placeholderTextColor= 'gray'
            maxLength={50} 
            />
            <Image source = { require('../images/email.png')} style = {styles.email}/>
            {
            checkValidEmail ? (
                <Text style = {styles.textFailed}>Invalid Email format</Text>
                ) : (
                <Text style = {styles.textFailed}> </Text>
            )
            }

            <TextInput 
            style = { styles.input }
            placeholder = 'Enter Mobile Number'
            placeholderTextColor= 'gray'
            keyboardType='numeric'
            maxLength={11}
            onChangeText = { (text) => [handleCheckMobileNumber(text) ,setMobileNum(text)] } />
            <Image source = { require('../images/phone.png')} style = {styles.userIcon}/>
            {
            checkValidMobileNumber ? (
                <Text style = {styles.textFailed}>Mobile number should be valid 11 digit number</Text>
                ) : (
                <Text style = {styles.textFailed}> </Text>
            )
            }
                
            <TouchableOpacity style = { styles.btn } onPress={ handleUserValidation }>
            <Text style = {styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
            <View style = {{ backgroundColor: 'white', 
            width: 360,
            height: 200, }}>

            </View>
            

        </View>
    );
};

const styles = StyleSheet.create({
    body: {
    backgroundColor: 'rgb(109, 169, 22)',
    flex: 1,
    fontFamily: 'Roboto',
    },
    userIcon: {
    width:20,
    height:20,
    marginLeft: 300,
    marginTop: -35
    },
    email: {
    width:25,
    height:20,
    marginLeft: 295,
    marginTop: -35
    },
    textFailed: {
    color: 'red',
    marginLeft: 30,
    marginTop: 10,
    },
    noText: {
    marginTop: -6,
    marginBottom: -6,
    },
    paw: {
    width: 300,
    height: 300,
    marginTop: -120,
    marginLeft: -70,
    },
    bone: {
    width: 120,
    height: 120,
    marginLeft: 280,
    marginTop: -150
    },
    back: {
    width: 30,
    height: 30,
    marginLeft: 15,
    marginTop: -120
    },
    whiteBox: {
    width: Dimensions.get('window').width,
    height: 550,
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowOffset: {width: 6, height: 6},
    shadowRadius: 10,
    shadowColor: 'white',
    shadowOpacity: 1,
    backgroundColor: 'white',
    },
    header: {
    fontSize: 30,
    color: 'rgb(80, 140, 2)',
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 30,
    fontWeight: 'bold'
    },
    input: {
    padding: 2,
    width: 300,
    height: 40,
    marginBottom: 10,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
    },
    hello: {
    fontSize: 30,
    color: 'green',
    padding: 30,
    fontWeight: 'bold',
    },
    hello2: {
    fontSize: 20,
    color: 'green',
    padding: 5,
    fontWeight: 'bold',
    },
    btnText:{
    color: 'white',
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    },
    btn:{
    backgroundColor: 'rgb(80, 140, 2)',
    color: 'white',
    width: 300,
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    },
});


export default RegisterScreen;