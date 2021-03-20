import { LOAD_POSTS, TOGGLE_BOOKED } from "../types"

const initialState = {
    allPosts: [],
    bookedPosts: []
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
        return {
            ...state,
            allPosts: action.payload,
            bookedPosts: action.payload.filter(post => post.booked) // booked === true
        }
    case TOGGLE_BOOKED:
        // изменение флага добавления в избранное по id поста
        const allPosts = state.allPosts.map(post => {
            if (post.id === action.payload) {
                post.booked = !post.booked
            }
            return post
        })
        // в state заменяем ключ allPosts на новый
        return {
        ...state,
            allPosts,
            bookedPosts: allPosts.filter(post => post.booked)
        }
    default:
        return state
  }
}