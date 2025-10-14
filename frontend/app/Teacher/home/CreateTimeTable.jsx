import React from 'react';
import { View } from 'react-native';
import Header from '@/components/ui/Header';
import CTT from '@/components/commonPages.jsx/CTimeTable';

const TimeTable = () => {

  return (
    <View>
      <Header />
      <CTT />
    </View>
  );
};

export default TimeTable;
