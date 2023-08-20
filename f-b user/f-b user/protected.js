// function isAuthenticated() {
//    const user = localStorage.getItem('user');
//     return user !== null;
// }

// //Check if the user is authenticated
// if (!isAuthenticated()) {
//     window.location.href = './sign in.html' ;
// }

// const logout = () => {
//     localStorage.removeItem('user');
// }

function isAuthenticated() {
    try {
        const user = sessionStorage.getItem('user');
        return user !== null;
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false; // Return false in case of an error
    }
}

// Check if the user is authenticated
if (!isAuthenticated()) {
    window.location.href = './sign in.html';
}

const logout = () => {
    try {
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Error removing user:', error);
    }
}
