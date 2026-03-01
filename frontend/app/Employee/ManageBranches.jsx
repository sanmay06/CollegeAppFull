import BranchesTable from '@/components/commonPages.jsx/BranchesTable'
import Header from '@/components/ui/Header'
import React from 'react'
import { View, ScrollView } from 'react-native';

const ManageBranches = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <Header />
            <BranchesTable />
        </ScrollView>
    )
}

export default ManageBranches;
