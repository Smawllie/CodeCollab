export interface UsersContext {
    id:string | null;
    loading:boolean;
    errorMessage :null | string;
}

export interface UserForm{
    email :string;
    password:string;
}

