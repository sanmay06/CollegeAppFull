import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Alert, Dimensions } from 'react-native';
import api from '@/Axios';
import { ThemeContext } from '@/hooks/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const UpdateAttendance = ({ semester, section, subject }) => {
    const { theme } = useContext(ThemeContext);
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [dates, setDates] = useState([]);
    const [attendanceGrid, setAttendanceGrid] = useState({}); // { studentId: { dateString: status } }
    const [employee, setEmployee] = useState(null);
    const [subjectObj, setSubjectObj] = useState(null);

    const baseSize = screenWidth;

    useEffect(() => {
        fetchData();
    }, [semester, section, subject]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Employee from AsyncStorage
            const empData = await AsyncStorage.getItem('user'); // Assuming user object is stored
            if (empData) {
                const parsedUser = JSON.parse(empData);
                // We need the employee entity, but let's assume we have it or can use the ID
                setEmployee(parsedUser);
            }

            // 2. Fetch Students
            const studentsRes = await api.get(`/attendance/students?semester=${semester}&section=${section}`);
            const studentsList = studentsRes.data;
            setStudents(studentsList);

            // 3. Fetch Existing Attendance
            const attendanceRes = await api.get(`/attendance?semester=${semester}&section=${section}&subject=${subject}`);
            const existingAttendance = attendanceRes.data;

            // 4. Extract unique dates and organize grid
            const uniqueDates = [...new Set(existingAttendance.map(a => new Date(a.date).toDateString()))].sort((a, b) => new Date(a) - new Date(b));

            const grid = {};
            studentsList.forEach(s => {
                grid[s.id] = {};
                uniqueDates.forEach(d => {
                    grid[s.id][d] = "NA";
                });
            });

            existingAttendance.forEach(a => {
                const dStr = new Date(a.date).toDateString();
                if (grid[a.student.id]) {
                    grid[a.student.id][dStr] = a.status;
                }
            });

            setDates(uniqueDates);
            setAttendanceGrid(grid);

            if (existingAttendance.length > 0) {
                setSubjectObj(existingAttendance[0].subject);
            }

        } catch (error) {
            console.error("Error fetching attendance data:", error);
            Alert.alert("Error", "Failed to load attendance data");
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = (studentId, dateStr) => {
        const statuses = ["NA", "P", "A"];
        const currentStatus = attendanceGrid[studentId][dateStr] || "NA";
        const nextIndex = (statuses.indexOf(currentStatus) + 1) % statuses.length;
        const nextStatus = statuses[nextIndex];

        setAttendanceGrid(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [dateStr]: nextStatus
            }
        }));
    };

    const addNewDate = () => {
        const today = new Date().toDateString();
        if (dates.includes(today)) {
            Alert.alert("Info", "Today's column already exists");
            return;
        }
        setDates(prev => [...prev, today]);
        setAttendanceGrid(prev => {
            const newGrid = { ...prev };
            students.forEach(s => {
                newGrid[s.id] = { ...newGrid[s.id], [today]: "NA" };
            });
            return newGrid;
        });
    };

    const saveAttendance = async () => {
        try {
            const attendanceList = [];

            // We need the subject object and employee object to save properly
            // If we don't have them, we might need to fetch them

            for (const student of students) {
                for (const dateStr of dates) {
                    const status = attendanceGrid[student.id][dateStr];
                    if (status !== "NA") {
                        attendanceList.push({
                            date: new Date(dateStr),
                            student: { id: student.id },
                            subject: subjectObj || { subjectName: subject }, // Minimal object if not fetched
                            employee: employee ? { id: employee.id } : null,
                            status: status,
                            section: section
                        });
                    }
                }
            }

            if (attendanceList.length === 0) {
                Alert.alert("Warning", "No attendance data to save");
                return;
            }

            await api.post('/attendance/bulk', attendanceList);
            Alert.alert("Success", "Attendance saved successfully");
        } catch (error) {
            console.error("Error saving attendance:", error);
            Alert.alert("Error", "Failed to save attendance");
        }
    };

    if (loading) return <ActivityIndicator size="large" color={theme.primary} />;

    return (
        <View style={{ flex: 1 }}>
            <ScrollView horizontal>
                <View style={styles.table}>
                    {/* Header Row */}
                    <View style={[styles.row, styles.header]}>
                        <Text style={[styles.headerText, { width: 80 }]}>ID</Text>
                        <Text style={[styles.headerText, { width: 150 }]}>Name</Text>
                        {dates.map((date, index) => (
                            <Text key={index} style={[styles.headerText, { width: 100, textAlign: 'center' }]}>
                                {new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                            </Text>
                        ))}
                    </View>

                    {/* Student Rows */}
                    {students.map((student, index) => (
                        <View key={student.id} style={[styles.row, index % 2 === 0 ? styles.normalRow : styles.altRow]}>
                            <Text style={[styles.cell, { width: 80 }]}>{student.id}</Text>
                            <Text style={[styles.cell, { width: 150 }]}>{student.name}</Text>
                            {dates.map((dateStr, idx) => (
                                <Pressable
                                    key={idx}
                                    style={[styles.statusBox, { width: 100 },
                                    attendanceGrid[student.id][dateStr] === "P" ? styles.present :
                                        attendanceGrid[student.id][dateStr] === "A" ? styles.absent : styles.notUpdated]}
                                    onPress={() => toggleStatus(student.id, dateStr)}
                                >
                                    <Text style={styles.statusText}>{attendanceGrid[student.id][dateStr]}</Text>
                                </Pressable>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.controls}>
                <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={addNewDate}>
                    <Text style={styles.buttonText}>Add Today's Date</Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: '#28a745' }]} onPress={saveAttendance}>
                    <Text style={styles.buttonText}>Save All</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    table: {
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    header: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 14,
        color: '#fff',
        paddingHorizontal: 10,
    },
    cell: {
        fontSize: 13,
        color: '#333',
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    statusBox: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderRadius: 4,
    },
    statusText: {
        fontWeight: 'bold',
        color: '#333'
    },
    present: {
        backgroundColor: '#d4edda',
    },
    absent: {
        backgroundColor: '#f8d7da',
    },
    notUpdated: {
        backgroundColor: '#e2e3e5',
    },
    altRow: {
        backgroundColor: '#f9f9f9',
    },
    normalRow: {
        backgroundColor: '#fff',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 150,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default UpdateAttendance;
