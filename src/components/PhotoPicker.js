import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { AppButton } from './ui/AppButton'

export const PhotoPicker = ({ onPick }) => {
    // изначально картинки нет
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Извините, нам нужно разрешение доступа к камере, чтобы это работало!');
            }
          }
        })();
    }, []);

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            onPick(result.uri)
        }
    };

    return (
        <View style={styles.wrapper}>
            <AppButton style={styles.button} onPress={pickImage}>
                Выбрать фото
            </AppButton>
            {/* если картинка создана, тогда рендерим ее */}
            {image && <Image style={styles.image} source={{ uri: image }} />}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 400,
        marginTop: 10
    },
    button: {
        padding: 10
    }
})