import { LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED } from "../types"

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
    case REMOVE_POST:
        return {
            ...state,
            allPosts: state.allPosts.filter(p => p.id !== action.payload),
            bookedPosts: state.bookedPosts.filter(p => p.id !== action.payload)
        }
    default:
        return state
  }
}