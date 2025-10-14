import { Text, View, StyleSheet, SafeAreaView, Pressable, TextInput  } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '@/hooks/ThemeProvider'
import Header from '@/components/ui/Header'
import { useRouter } from 'expo-router'
import api from '@/Axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Index = () => {
  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({  
    mainContainer: {
      backgroundColor: theme.background,
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    text: {
      color: theme.text,
      fontSize: 25,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    button:{
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.text,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '40%',
      marginTop: 20,
    }
  })

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />
      <Login />
    </SafeAreaView>
  )

}

export default Index;

const Login = () => {
    const { theme } = useContext(ThemeContext);
    const router = useRouter();
    const [ form, setForm ] = useState({
      "usn": "",
      "password":""
    });
    const [ msg, setMsg ] = useState(""); 
    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: theme.background,
            alignItems: 'center',
            width: '100%',
            height: '100%',
            flexGap: 10,
        },
        msgText: {
          color: 'red',
          fontSize: 16,
          marginTop: 10,
        },        
        text: {
            color: theme.labelText,
            fontSize: 25,
            padding: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
        },
        button: {
            margin: 20,
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            // color: theme.text,
            backgroundColor: theme.button.background ,
            color: theme.button.color,
        },
        inputText: {
            color: theme.text,
            fontSize: 25,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: theme.primary,
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 40,
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            height: '40%',
            marginTop: 20,
        },
        buttonText: {
          color: theme.text,
            fontSize: 25,
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 40,
        }
    })

    const login = async () => {
      api.post('/login', form)
      .then((response) => {
        // console.log(response);
        if(response.data.msg === "Login successful") {
          const role = response.data.role;
          setMsg("Sucess");
          console.log("response", response.data);
          AsyncStorage.setItem("token", response.data.token);
          AsyncStorage.setItem("role", role);
          AsyncStorage.setItem("usn", form.usn);
          AsyncStorage.setItem("branch",response.data.branch);
          // api.get('/test')
          // .then((response) => console.log("get response",response));
          router.push(role === 'STUDENT'? "/Student/": role === "TEACHER"? "/Teacher/": "/Faculty/")
        }
        else
          setMsg("Invalid username or password");        
      })
      .catch((error) => console.log(error));
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text}>Enter ID:</Text>
            <TextInput 
                value={form.usn}
                onChangeText={(text) => setForm({...form, usn: text})}
                style = {styles.inputText}
            />
            <Text style={styles.text}>Enter password:</Text>
            <TextInput 
                value={form.password}
                onChangeText={(text) => setForm({...form, password: text})}
                style = {styles.inputText}
            />
            <Text style = {styles.msgText}>{msg}</Text>
            <Pressable
                style={styles.button}
                disabled={form.usn === "" || form.password === ""}
                onPress={() => login()}
            >
              <Text style = {styles.buttonText}>
                Submit
              </Text>
            </Pressable>
        </View>
    )
}