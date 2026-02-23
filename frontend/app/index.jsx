import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '@/hooks/ThemeProvider'
import Header from '@/components/ui/Header'
import { useRouter } from 'expo-router'
import api from '@/Axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ScreenWrapper from '@/components/ui/ScreenWrapper'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const Index = () => {
  return (
    <ScreenWrapper style={{ paddingHorizontal: 0 }}>
      <Header />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 16 }}>
        <Login />
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Index;

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [form, setForm] = useState({
    "usn": "",
    "password": ""
  });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const styles = StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
      width: '100%',
      maxWidth: 400, // Limit width on large screens
      alignSelf: 'center',
      padding: 24,
      backgroundColor: theme.card.background,
      borderRadius: 16,
      shadowColor: theme.card.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
      borderWidth: 1,
      borderColor: theme.card.border,
      marginBottom: 40,
    },
    title: {
      color: theme.text,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      color: theme.textLight,
      fontSize: 14,
      marginBottom: 32,
      textAlign: 'center',
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 24,
      resizeMode: 'contain',
    }
  })

  const login = async () => {
    setIsLoading(true);
    setMsg("");

    api.post('/login', form)
      .then((response) => {
        setIsLoading(false);
        if (response.data.msg === "Login successful") {
          const role = response.data.role;
          console.log("response: ", response.data);
          setMsg(""); // Clear error on success
          AsyncStorage.setItem("token", response.data.token);
          AsyncStorage.setItem("role", role);
          AsyncStorage.setItem("usn", form.usn);
          router.push(role === 'STUDENT' ? "/Student/" : role === "EMPLOYEE" ? "/Employee/" : "/")
        }
        else
          setMsg("Invalid username or password");
      })
      .catch((error) => {
        setIsLoading(false);
        setMsg("An error occurred. Please try again.");
        console.log(error);
      });
  }

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('@/assets/images/BIT logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to access your dashboard</Text>

      <Input
        label="User ID (USN)"
        placeholder="Enter your USN"
        value={form.usn}
        onChangeText={(text) => setForm({ ...form, usn: text })}
        autoCapitalize="characters"
      />

      <Input
        label="Password"
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        secureTextEntry
        error={msg}
      />

      <Button
        title="Sign In"
        onPress={login}
        loading={isLoading}
        disabled={form.usn === "" || form.password === ""}
        style={{ marginTop: 16, width: '100%' }}
      />
    </View>
  )
}
