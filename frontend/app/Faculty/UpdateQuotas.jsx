import Header from '@/components/ui/Header'
import React from 'react'
import { View } from 'react-native';
import QuotasTable from '@/components/commonPages.jsx/QuotasTable';

export default updateUsers = () => {
    return (
        <View style = {{flex: 1}}>
            <Header />
            <QuotasTable />
        </View>
    )
}