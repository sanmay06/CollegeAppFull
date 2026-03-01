import { ThemeContext } from '@/hooks/ThemeProvider';
import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, Button, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import api from '@/Axios';
import Table from '../ui/table';

export default function BranchesTable() {
    const { theme } = useContext(ThemeContext);
    const [data, setData] = useState();
    const [msg, setMsg] = useState({ error: true, msg: "" });
    const [update, setUpdate] = useState(false);

    // Form state
    const [form, setForm] = useState({
        branchName: "",
        branchDesc: "",
    });

    const styles = StyleSheet.create({
        container: { padding: 10, backgroundColor: theme.background },
        label: { fontSize: 16, fontWeight: "bold", color: theme.text, marginBottom: 10 },
        buttonCont: { flexDirection: "row", justifyContent: "space-around", marginBottom: 15 },
        form: { marginTop: 20, padding: 15, borderRadius: 8, backgroundColor: theme.card.background },
        formTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: theme.text },
        input: { borderWidth: 1, borderColor: theme.border, borderRadius: 6, padding: 10, marginBottom: 10, color: theme.text, backgroundColor: theme.background },
        msgerror: { color: theme.error },
        msgsuccess: { color: theme.success }
    });

    const fetchData = () => {
        api.get(`/branch/all`)
            .then((response) => {
                if (response.data) setData(response.data);
            })
            .catch((error) => {
                setMsg({ error: true, msg: error.response?.data || "An error occurred fetching branches" });
            });
    };

    const updateData = async () => {
        try {
            const response = await api.put(`/branch/update`, data);
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

    const deleteBranch = (name) => {
        if (!name) return;
        api.delete(`/branch/delete/${name}`)
            .then((response) => {
                if (response.data === "Done") setMsg({ error: false, msg: "Branch deleted successfully" });
                else setMsg({ error: true, msg: response.data });
                fetchData();
            })
            .catch((error) => {
                setMsg({ error: true, msg: error.response?.data || "An error occurred during deletion" });
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addBranch = () => {
        if (!form.branchName || !form.branchDesc) {
            setMsg({ error: true, msg: "Please fill all fields" });
            return;
        }
        api.post(`/branch/add`, form)
            .then((response) => {
                if (response.data === "Done") {
                    setMsg({ error: false, msg: "Success" });
                    setForm({ branchName: "", branchDesc: "" });
                } else {
                    setMsg({ error: true, msg: response.data });
                }
                fetchData();
            })
            .catch((error) => {
                setMsg({ error: true, msg: error.response?.data || "An error occurred" });
            });
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Branch Data Table */}
            {data && (
                <Table
                    header={["Name", "Description"]}
                    data={data}
                    role={"branch"}
                    keys={["branchName", "branchDesc"]}
                    width={{ branch: ["30%", '70%'] }}
                    setData={setData}
                    update={setUpdate}
                />
            )}

            {update && (
                <View style={styles.buttonCont}>
                    <Button title="Save Changes" onPress={updateData} />
                    <Button title="Cancel" onPress={() => { setUpdate(false); fetchData(); }} />
                </View>
            )}

            {/* Add Branch Form */}
            <View style={styles.form}>
                <Text style={styles.formTitle}>Add New Branch</Text>

                <Text style={styles.label}>Branch Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. CSE"
                    value={form.branchName}
                    onChangeText={v => setForm({ ...form, branchName: v })}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. Computer Science and Engineering"
                    value={form.branchDesc}
                    onChangeText={v => setForm({ ...form, branchDesc: v })}
                />

                <Button title="Add Branch" onPress={addBranch} />
            </View>

            {/* Delete Branch Form */}
            <View style={styles.form}>
                <Text style={styles.formTitle}>Delete Branch</Text>
                <Text style={styles.label}>Branch Name to Delete</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. CSE"
                    value={form.deleteName || ""}
                    onChangeText={v => setForm({ ...form, deleteName: v })}
                />
                <Button title="Delete Branch" color={theme.error} onPress={() => deleteBranch(form.deleteName)} />
            </View>

            {msg.msg ? <View style={{ padding: 20 }}><Text style={msg.error ? styles.msgerror : styles.msgsuccess}>{msg.msg}</Text></View> : null}

        </ScrollView>
    );
}
