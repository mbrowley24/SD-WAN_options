


const user_validations = () =>{

    const digit_char = (password: string) => {

        return /[0-9]/.test(password);
    }

    const email_input = (email: string) => {

        if(email.length > 200){

            return false;
        }

        return /^[a-zA-Z0-9@._%+-]*$/.test(email);

    }

    const email_validation = (email: string) => {

        if(email.length > 200){
            return false;
        }

        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

    }

    const injection_filter = (password: string) => {

        return /^[^'"`;{}$\\<>]*$/.test(password);
    }


    const lowercase_char = (password: string) => {
        return /[a-z]/.test(password);
    }

    const name_input = (name: string) => {

        if(name.length > 25){

            return false;
        }else if(name.length === 0){
            return true;
        }

        return /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name);
    }


    const password_input = (password: string) => {


        if(password.length > 20){

            return false;

        }else if(password.length === 0 ){

            return true;
        }

        return /^[A-Za-z0-9!@#%^&*_+=-]+$/.test(password);

    }

    const password_length = (password: string) => {

        return password.length >= 10;
    }

    const password_valid  = (password: string) => {

        let isValid = true;

        if(password.length < 10 && password.length > 20){

            isValid = false;
        }

        if(!injection_filter(password)){
            isValid = false;
        }

        return isValid;

    }

    const special_char = (password: string) => {

        return /^[A-Za-z0-9!@#%^&*_+=-]+$/.test(password);

    }


    const user_reg_validation = (user:FormState) =>{
        const errors = {};


        //check first name
        if(user.first_name?.length > 25){

            errors["first_name"] = "no more than 25 characters" ;

        }else if(user.first_name.length < 2){

            errors['first_name'] = "must be at least 2 characters";

        }else if(!name_input(user.first_name)){

            errors["first_name"] = 'invalid';

        }else{

            delete errors["first_name"];
        }

        //check last name
        if(user.last_name.length > 25){

            errors["last_name"] = "no more than 25 characters" ;

        }else if(user.last_name.length < 2){

            errors['last_name'] = "must be at least 2 characters";

        }else if(!name_input(user.last_name)){

            errors["last_name"] = 'invalid';

        }else{

            delete errors["last_name"];
        }

        //check username
        if(user.username.length > 20){

            errors["username"] = "no more than 25 characters";

        }else if(user.username.length < 3){

            errors["username"] = "must be at least 3 characters";

        }else if(!username_valid(user.username)){
            console.log(username_valid(user.username));
            errors["username"] = "invalid";

        }else{

            delete errors["username"];
        }


        //check email
        if(user.email.length > 200){

            errors["email"] = "no more than 200 characters";

        }else if(user.email.length < 6){

            errors["email"] = "must be at least 6 characters";

        }else if(!email_validation(user.email)){

            errors["email"] = "invalid email";

        }else{

            delete errors["email"];
        }


        //check passwords
        if(user.password.length > 20){

            errors["password"] = "20 characters max";

        }else if(user.password.length < 10){

            errors["password"] = "must be at least 10 characters";
        }else{
            delete errors["password"];
        }

        if(user.password != user.password_confirm){

            errors["password_confirm"] = "passwords don't match";
        }else{

            delete errors["password_confirm"];
        }


        return errors;

    }

    const uppercase_char = (password: string) =>{

        return /[A-Z]/.test(password);
    }

    const username_char_check = (username: string) =>{

        if(username.trim().length > 25){

            return false;

        }else if(username.trim().length === 0){

            return true
        }

        return /^[a-zA-Z0-9_-]+$/.test(username)
    }

    const username_valid = (username: string) =>{

        return /[a-zA-Z0-9_]{3,20}$/.test(username)
    }

    return {
        digit_char,
        email_input,
        email_validation,
        injection_filter,
        lowercase_char,
        name_input,
        password_input,
        password_length,
        password_valid,
        special_char,
        uppercase_char,
        username_char_check,
        user_reg_validation,
        username_valid,
    }
}

export default user_validations;