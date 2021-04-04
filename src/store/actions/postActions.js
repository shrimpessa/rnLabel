import * as FileSystem from 'expo-file-system';

import { DB } from "../../db"
import { 
    ADD_POST, 
    LOAD_POSTS, 
    REMOVE_POST, 
    TOGGLE_BOOKED 
} from "../types"

export const loadPosts = () => {    
    return async dispatch => {
        const posts = await DB.getPosts()
        dispatch({
            type: LOAD_POSTS,
            payload: posts
        })
    }    
}

export const toogleBooked = post => async dispatch => {
    await DB.updatePost(post)
    dispatch({
      type: TOGGLE_BOOKED,
      payload: post.id
    })
}

export const addPost = post => async dispatch => {
    // получаем название файла картинки
    const imageName = post.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + imageName
    
    try {
        // перемещение файлов в асинхронном режиме
        FileSystem.moveAsync({
            to: newPath,
            from: post.img
        })
    } catch (e) {
        console.log('Error. postAction.js - addPost:', e)
    }

    //формирование объекта поста
    const payload = {...post, img: newPath}
    // и получение его id
    const id = await DB.createPost(payload)

    payload.id = id

    dispatch({
        type: ADD_POST,
        payload
    })
}

export const removePost = id => async dispatch => {
    await DB.removePost(id)
    dispatch({
        type: REMOVE_POST,
        payload: id
    })
}