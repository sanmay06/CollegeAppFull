import { ThemeContext } from '@/hooks/ThemeProvider';
import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, Button, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '@/Axios';
import Table from '../ui/table';
import SearchInput from '../ui/SearchInput';

export default function UserTable() {
  const { theme } = useContext(ThemeContext);
  const [role, setRole] = useState(null);
  const [data, setData] = useState();
  const [msg, setMsg] = useState({ error: true, msg: "" });

  // Date Picker state
  const [showDob, setShowDob] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  // Form state (merged)
  const [form, setForm] = useState({
    usn: "", branch: "", email: "", password: "", phone: "", name: "",
    age: "", dob: new Date(), joinDate: new Date(),
    cgpa: "", semester: "", year: "", backlogs: "",
    salary: "", quota: ""
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

  const fetchData = (role) => {
    api.get(`user/${role}`)
      .then((response) => {
        if (response.data) setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setMsg({ error: true, msg: error.response?.data || "An error occurred" });
      });
  };

  useEffect(() => {
    if (!role) return;
    fetchData(role);
  }, [role]);

  function formatDate(d) {
    if (typeof d === "string") d = new Date(d);
    return d instanceof Date && !isNaN(d.getTime())
      ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      : "";
  }

  const addUser = () => {
    const payload = {
      ...form,
      dob: formatDate(form.dob),
      joinDate: formatDate(form.joinDate),
    };

    api.post(`user/create/${role}`, payload)
      .then((response) => {
        if (response.data === "Done") setMsg({ error: false, msg: "Success" });
        else setMsg({ error: true, msg: response.data });
        fetchData(role);
      })
      .catch((error) => {
        setMsg({ error: true, msg: error.response?.data || "An error occurred" });
      });
  };

  return (
    <View contentContainerStyle = {{flexGrow: 1}}>
      {/* Role Selection */}
      <View style={styles.form}>
        <Text style={styles.label}>Select the type of user</Text>
        <View style={styles.buttonCont}>
          <Button onPress={() => setRole("student")} title={"Student"} />
          <Button onPress={() => setRole("teacher")} title={"Teacher"} />
          <Button onPress={() => setRole("admin")} title={"Faculty"} />
        </View>
      </View>

      {/* User Data Table */}
      {role && data && <Table header={data.headings} data={data.users} role = {role} keys = {data.keys}/>}

      {/* Add User Form */}
      {role && (
        <View style={styles.form}>
            <Text style={styles.formTitle}>Add New {role}</Text>
            
            {/* Common fields with labels */}
            <Text style={styles.label}>USN</Text>
            <TextInput style={styles.input} placeholder="USN" value={form.usn} onChangeText={v => setForm({ ...form, usn: v })} />
            
            <Text style={styles.label}>Branch</Text>
            <TextInput style={styles.input} placeholder="Branch" value={form.branch} onChangeText={v => setForm({ ...form, branch: v })} />
            
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Email" value={form.email} onChangeText={v => setForm({ ...form, email: v })} />
            
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="Password" value={form.password} onChangeText={v => setForm({ ...form, password: v })} />
            
            <Text style={styles.label}>Phone</Text>
            <TextInput style={styles.input} placeholder="Phone" value={form.phone} onChangeText={v => setForm({ ...form, phone: v })} />
            
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="Name" value={form.name} onChangeText={v => setForm({ ...form, name: v })} />
            
            <Text style={styles.label}>Age</Text>
            <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" value={String(form.age)} onChangeText={v => setForm({ ...form, age: v })} />
            
            {/* DOB Picker with label */}
            <Text style={styles.label}>Date of Birth</Text>
            {Platform.OS === 'web' ? (
            <input
                type="date"
                style={{
                ...styles.dateField,
                padding: 8,
                fontSize: 16,
                outline: 'none',
                border: '1px solid ' + (theme.border || '#ccc'),
                borderRadius: 6,
                marginBottom: 10,
                background: theme.background,
                color: theme.text,
                width: '99.2%',
                }}
                value={form.dob ? formatDate(form.dob) : ''}
                onChange={e => {
                setForm({ ...form, dob: new Date(e.target.value) });
                }}
            />
            ) : (
            <>
                <TouchableOpacity onPress={() => setShowDob(true)}>
                <Text style={styles.dateField}>{formatDate(form.dob)}</Text>
                </TouchableOpacity>
                {showDob && (
                <DateTimePicker
                    value={form.dob || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                    setShowDob(false);
                    if (selectedDate) setForm({ ...form, dob: selectedDate });
                    }}
                />
                )}
            </>
            )}

            {/* Join Date Picker with label */}
            <Text style={styles.label}>Join Date</Text>
            {Platform.OS === 'web' ? (
            <input
                type="date"
                style={{
                ...styles.dateField,
                padding: 8,
                fontSize: 16,
                outline: 'none',
                border: '1px solid ' + (theme.border || '#ccc'),
                borderRadius: 6,
                marginBottom: 10,
                background: theme.background,
                color: theme.text,
                width: '99.2%',
                }}
                value={form.joinDate ? formatDate(form.joinDate) : ''}
                onChange={e => {
                setForm({ ...form, joinDate: new Date(e.target.value) });
                }}
            />
            ) : (
            <>
                <TouchableOpacity onPress={() => setShowJoin(true)}>
                <Text style={styles.dateField}>{formatDate(form.joinDate)}</Text>
                </TouchableOpacity>
                {showJoin && (
                <DateTimePicker
                    value={form.joinDate || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                    setShowJoin(false);
                    if (selectedDate) setForm({ ...form, joinDate: selectedDate });
                    }}
                />
                )}
            </>
            )}

            {/* Extra fields for Student, with labels */}
            {role === "student" && (
            <>
                <Text style={styles.label}>Quota Name</Text>
                <SearchInput path = {'/quota/search'} setValue = {setForm} form = {form} style = {styles.label} theme = {theme}/>
                <Text style={styles.label}>CGPA</Text>
                <TextInput style={styles.input} placeholder="CGPA" keyboardType="numeric" value={String(form.cgpa)} onChangeText={v => setForm({ ...form, cgpa: v })} />
                <Text style={styles.label}>Semester</Text>
                <TextInput style={styles.input} placeholder="Semester" keyboardType="numeric" value={String(form.semester)} onChangeText={v => setForm({ ...form, semester: v })} />
                <Text style={styles.label}>Year</Text>
                <TextInput style={styles.input} placeholder="Year" keyboardType="numeric" value={String(form.year)} onChangeText={v => setForm({ ...form, year: v })} />
                <Text style={styles.label}>Backlogs</Text>
                <TextInput style={styles.input} placeholder="Backlogs" keyboardType="numeric" value={String(form.backlogs)} onChangeText={v => setForm({ ...form, backlogs: v })} />
                
            </>
            )}

            {/* Extra field for Teacher/Admin, with label */}
            {(role === "teacher" || role === "admin") && (
            <>
                <Text style={styles.label}>Salary</Text>
                <TextInput style={styles.input} placeholder="Salary" keyboardType="numeric" value={String(form.salary)} onChangeText={v => setForm({ ...form, salary: v })} />
            </>
            )}

            <Button title="Add User" onPress={addUser} />
            <Text style={msg.error ? styles.msgerror : styles.msgsuccess}>{msg.msg}</Text>
        </View>
        )}

    </View>
  );
}
