import { ThemeContext } from '@/hooks/ThemeProvider';
import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, Button, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '@/Axios';
import Table from '../ui/table';

export default function QuotasTable() {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState();
  const [msg, setMsg] = useState({ error: true, msg: "" });
  const [ update, setUpdate] = useState(false);

  // Form state (merged)
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const styles = StyleSheet.create({
    container: { padding: 10, backgroundColor: theme.background },
    label: { fontSize: 16, fontWeight: "bold", color: theme.text, marginBottom: 10 },
    buttonCont: { flexDirection: "row", justifyContent: "space-around", marginBottom: 15 },
    form: { marginTop: 20, padding: 15, borderRadius: 8, backgroundColor: theme.card.background },
    formTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: theme.text },
    input: { borderWidth: 1, borderColor: theme.border, borderRadius: 6, padding: 10, marginBottom: 10, color: theme.text, backgroundColor: theme.background },
    dateField: { padding: 10, borderWidth: 1, borderColor: theme.border, borderRadius: 6, marginBottom: 10, color: theme.text, backgroundColor: theme.background },
    msgerror: { color: theme.error },
    msgsuccess: { color: theme.success }
  });

  const fetchData = () => {
    api.get(`quota`)
      .then((response) => {
        if (response.data) setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setMsg({ error: true, msg: error.response?.data || "An error occurred" });
      });
  };

  const updateData = async() => {
    try {
        const response = await api.put(`/quota/update`, data);
        if (response.data === "Done") {
            setMsg({ error: false, msg: "Update Successful" });
            setUpdate(false);
            fetchData();
        } else {
            setMsg({ error: true, msg: response.data });
        }
    } catch (error) {
        setMsg({ error: true, msg: error.response?.data || "An error occurred" });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addQuota = () => {
    if (!form.name || !form.description) {
      setMsg({ error: true, msg: "Please fill all fields" });
      return;
    }
    api.post(`/quota/create`, form)
      .then((response) => {
        if (response.data === "Done") setMsg({ error: false, msg: "Success" });
        else setMsg({ error: true, msg: response.data });
        fetchData();
      })
      .catch((error) => {
        setMsg({ error: true, msg: error.response?.data || "An error occurred" });
      });
  };

  return (
    <ScrollView contentContainerStyle = {{flexGrow: 1}}>
      {/* Role Selection */}

      {/* User Data Table */}
      {data && <Table header={["Name", "Description"]} data={data} role = {"quota"} keys = {["name", "description"]} width = {{quota: ["20%", '80%']}} setData = {setData} update = {setUpdate}/>}

        {update && 
            <View style={styles.buttonCont}>
                <Button title="Save Changes" onPress={updateData} />
                <Button title="Cancel" onPress={() => { setUpdate(false); fetchData(); }} />
            </View>
        }
      {/* Add User Form */}
      
        <View style={styles.form}>
            <Text style={styles.formTitle}>Add New Quota</Text>
            
            {/* Common fields with labels */}
            <Text style={styles.label}>Quota Name</Text>
            <TextInput style={styles.input} placeholder="name" value={form.name} onChangeText={v => setForm({ ...form, name: v })} />
            
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} placeholder="description" value={form.description} onChangeText={v => setForm({ ...form, description: v })} />

            <Button title="Add Quota" onPress={addQuota} />
            <Text style={msg.error ? styles.msgerror : styles.msgsuccess}>{msg.msg}</Text>
        </View>

    </ScrollView>
  );
}
