import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { CareSign } from './CareSign'

export const CareSignsList = ({ data, onCareSignPress }) => {

    let numColumns = 4
    return (
        <View>
        <FlatList
            // style={styles.postList}
            numColumns={numColumns}
            data={data}
            keyExtractor={careSign => careSign.id.toString()}
            renderItem={({ item }) => <CareSign careSign={item} onCareSignPress={onCareSignPress} />}
        />
        </View>
    )
}

// const styles = StyleSheet.create({
//     postList: {
//         // overflow: 'hidden', 
//         // flexDirection: 'column-reverse',
//         // justifyContent: 'space-between',
        
//     }
// })  