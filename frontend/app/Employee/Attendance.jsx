import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';

import UpdateAttendance from '../../components/commonPages.jsx/UpdateAttendance';

const Attendance = () => {
    const [form, setForm] = useState({
        semester: "",
        section: "",
        subject: ""
    })
    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Attendance</Text>
            <View style={{ marginBottom: 15 }}>
                <Text>Semester</Text>
                <TextInput
                    style={{ borderBottomWidth: 1, padding: 5 }}
                    placeholder="Semester"
                    value={form.semester}
                    onChangeText={(text) => setForm({ ...form, semester: text })}
                />
            </View>
            <View style={{ marginBottom: 15 }}>
                <Text>Section</Text>
                <TextInput
                    style={{ borderBottomWidth: 1, padding: 5 }}
                    placeholder="Section"
                    value={form.section}
                    onChangeText={(text) => setForm({ ...form, section: text })}
                />
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text>Subject</Text>
                <TextInput
                    style={{ borderBottomWidth: 1, padding: 5 }}
                    placeholder="Subject"
                    value={form.subject}
                    onChangeText={(text) => setForm({ ...form, subject: text })}
                />
            </View>

            {form.semester && form.section && form.subject ? (
                <UpdateAttendance semester={form.semester} section={form.section} subject={form.subject} />
            ) : (
                <Text>Please fill all fields to manage attendance</Text>
            )}

        </ScrollView>
    );
};

export default Attendance;