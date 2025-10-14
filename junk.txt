import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default HomeMenuView = () => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/cottage.png' }}
        />
        <Text style={styles.info}>Intro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/administrator-male.png' }}
        />
        <Text style={styles.info}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/pie-chart.png' }}
        />
        <Text style={styles.info}>Charts</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/shop.png' }}
        />
        <Text style={styles.info}>Shop</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/product.png' }}
        />
        <Text style={styles.info}>Product</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/traffic-jam.png' }}
        />
        <Text style={styles.info}>Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/dusk/70/000000/visual-game-boy.png' }}
        />
        <Text style={styles.info}>Info</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/user.png' }}
        />
        <Text style={styles.info}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/family.png' }}
        />
        <Text style={styles.info}>Friends</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuBox: {
    backgroundColor: '#DCDCDC',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
  },
  icon: {
    width: 60,
    height: 60,
  },
  info: {
    fontSize: 22,
    color: '#696969',
  },
})