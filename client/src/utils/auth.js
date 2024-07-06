import decode from 'jwt-decode';

// Authservice handles token and user authentication status management.
class AuthService {
    // Gets the token from local storage and decodes it.
    getProfile() {
        return decode(this.getToken());
    }

    // Checks if user is logged in.
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // Checks if token is expired.
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    // Retrieves token from local storage.
    getToken() {
        return localStorage.getItem('id_token');
    }

    // Writes the signed token to local storage.
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign(`/user/${this.getProfile().data.id}`);
    }

    // Deletes the token from local storage.
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();