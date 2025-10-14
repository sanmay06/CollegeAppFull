import UsersTable from '@/components/commonPages.jsx/UsersTable'
import Header from '@/components/ui/Header'
import React from 'react'
import { View, ScrollView } from 'react-native';

export default updateUsers = () => {
    return (
        <ScrollView style = {{flex: 1}}>
            <Header />
            <UsersTable />
        </ScrollView>
    )
}