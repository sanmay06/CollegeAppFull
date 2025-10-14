import React, { useState, useEffect } from 'react'
import api from '@/Axios'
import { Dropdown } from 'react-native-element-dropdown'

export default function SearchInput(props) {
  const [searchData, setSearchData] = useState([])   // full dataset
  const [searchArray, setSearchArray] = useState([]) // filtered dataset
  const [value, setValue] = useState(null)
  const theme = props.theme

  const getSearchData = async () => {
    try {
      const response = await api.get(props.path)
      setSearchData(response.data || [])
      setSearchArray(
        (response.data || []).map((item) => ({ label: item, value: item }))
      )
    } catch (error) {
      console.error("Error fetching search data:", error)
    }
  }

  const updateSearchArray = (text) => {
    if (!text) {
      setSearchArray(searchData.map((item) => ({ label: item, value: item })))
      return
    }

    const results = searchData.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    )
    setSearchArray(results.map((item) => ({ label: item, value: item })))
  }

  useEffect(() => {
    getSearchData()
  }, [])

  return (
    <Dropdown
      style={props.style}
      data={searchArray}
      labelField="label"
      valueField="value"
      
      placeholder="Search..."
      value={props.form.quota}
      search        // enables built-in search box (optional)
      onChange={(item) =>  props.setValue({ ...props.form, quota: item.value })}
      onChangeText={(text) => updateSearchArray(text)}
      placeholderStyle={{
        fontSize: 16,
        fontWeight: "bold",
        color: theme.text,
      }}
      selectedTextStyle={{
        fontSize: 16,
        fontWeight: "bold",
        color: theme.text,
      }}
      itemTextStyle={{ fontSize: 16, color: theme.text }}
    />
  )
}
