// Authentication
export const signUp = (payload) => {
    return fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
}

export const login = (payload) => {
    return fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
}

// User routes
export const getUser = (payload) => {
    return fetch(`/api/users/${payload.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${payload.token}`
        }
    })
}

export const getUserShelves = (payload) => {
    return fetch('/api/shelf/me', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${payload}`
        }
    })
}

// Shelf routes
export const createShelf = (token, body) => {
    return fetch("/api/shelf", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
}

export const deleteShelf = (token, id) => {
    return fetch(`/api/shelf/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    })
}

export const getShelf = (id) => {
    return fetch(`/api/shelf/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const addToShelf = (payload) => {
    return fetch(`/api/shelf/addVinyl/${payload.shelfId}/${payload.vinylId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const updateShelf = (payload) => {
    return fetch(`/api/shelf/${payload.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
}

export const likeShelf = (payload) => {
    return fetch(`/api/like/${payload.userId}/${payload.shelfId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const deleteLike = (payload) => {
    return fetch(`/api/like/${payload.userId}/${payload.shelfId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// Vinyl routes
export const createVinyl = (payload) => {
    return fetch('/api/vinyls', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
}

export const removeFromShelf = (payload) => {
    return fetch(`/api/shelf/deleteVinyl/${payload.shelfId}/${payload.vinylId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

// Search
export const search = (query) => {
    return fetch(`/api/vinyls/discogs/${query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}
