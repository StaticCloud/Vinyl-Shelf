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