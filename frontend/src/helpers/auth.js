const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // If token is present, return true, else return false
  }
  
  export default isLoggedIn;