import { LOAD_POSTS } from "../types"

const initState = {
    allPosts: [],
    bookedPosts: []
}

export const postReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                allPosts: action.payload,
                bookedPosts: action.payload.filter(post => post.booked) // booked === true
            }
        default: return state
    }
}