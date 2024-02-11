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

export const search = (query) => {
    return fetch(`/api/vinyls/discogs/${query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const getMe = (payload) => {
    return fetch('/api/users/me', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${payload}`
        }
    })
}

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