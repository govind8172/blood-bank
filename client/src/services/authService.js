import { userLogin, userRegister } from "../redux/features/auth/authAction";
import store from "../redux/store"

export const handleLogin=(e,email,password,role)=>{
    e.preventDefault()
    try {
        if(!role||!email||!password)
            {
                return alert("All fields are compulsory");
            }
        store.dispatch(userLogin({email,password,role}))
        
    } catch (error) {
        console.log(error)
        
    }
};
export const handleRegister=(e,name,role,email,password,phone,hospital,organization,address,website)=>{
    e.preventDefault()
    try {
        //console.log('Register ',name,role,email,password,phone,hospital,organization,address,website)
        store.dispatch(userRegister({name,role,email,password,phone,hospital,organization,address,website}))
        
    } catch (error) {
        console.log(error);
    }
}