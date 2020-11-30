class User{
    static getAuth(){
        return JSON.parse(localStorage.getItem("auth"));
    }
    static setAuth(auth){
        localStorage.setItem("auth", auth);
    }
    static setDeviceId(id){
        localStorage.setItem("device_id",id);
    }
    static getDeviceId(){
        return localStorage.getItem("device_id");
    }
    static getAccessTokenExpirationDate(){
        return User.getAuth().ts;
    }
    static logout(){
        localStorage.clear();
        window.location.reload();
    }
}

export {
    User
};