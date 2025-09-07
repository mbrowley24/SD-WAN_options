import user_validations from '../../utils/user_validations'


export type FormState = {
    username:string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
    confirm_password: string,
}



type FormAction = {type: string; payload: string}


export const initialState: FormState = {
    username         :'',
    first_name       :'',
    last_name        :'',
    email            :'',
    password         :'',
    password_confirm :'',
}


export const userFormReducer = (state: FormState, action: FormAction) => {
    const {email_input, name_input, password_input, username_char_check} = user_validations();

    const userInfo = JSON.parse(JSON.stringify(action.payload));

    switch (action.type) {
        case 'username':

            const username = action.payload;

            if(username_char_check(username)){

                return {...state, username:username.toLowerCase()};
            }

            return state;

        case 'first_name':

            const first_name = action.payload;

            if(name_input(first_name)){

                return {...state, first_name:first_name.toLowerCase()};
            }


            return state;

        case 'last_name':

            const last_name = action.payload;

            if(name_input(last_name)){

                return {...state, last_name:last_name.toLowerCase()};
            }

            return state;

        case 'email':
            const email = action.payload;
            console.log(email)
            if(email_input(email)){
                console.log('in here')
                return {...state, email:email.toLowerCase()};
            }

            return state;
        case 'password':

            const password = action.payload;
            if(password_input(password)){

                return {...state, password:password};
            }

            return state;

        case 'password_confirm':

            const confirmPassword = action.payload;

            if(password_input(confirmPassword)){

                return {...state, password_confirm:confirmPassword};
            }

            return state;

            default:
                return state
    }
}

