import React from 'react'
import { View, FlatList, StyleSheet, Platform } from 'react-native'
import { CareSign } from './CareSign'

export const CareSignsList = ({ data, onCareSignPress }) => {

    let numColumns = 4
    return (
        <View>
            <FlatList
                numColumns={numColumns}
                columnWrapperStyle={styles.row}
                data={data}
                keyExtractor={careSign => careSign.id.toString()}
                renderItem={({ item }) => <CareSign careSign={item} onCareSignPress={onCareSignPress} />}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    row: {
      flex: 1,
      justifyContent: "space-between",
      paddingRight: Platform.OS === 'android' ? 55 : 15,
      paddingLeft: 5
    }
  })