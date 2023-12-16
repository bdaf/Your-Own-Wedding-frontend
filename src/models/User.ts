type User = {
    email :string,
    role :string,
    name? :string,
    surname? :string,
    city? :string,
    phone_number?: string,
    celebration_date?: Date
}

type UserRegister = {
    email :string,
    password: string,
    password_confirmation: string
}

type UserLogin = {
    email :string,
    password: string
}

type AuthenticationResponse = {
    logged_in :boolean,
    user? :User
}

type LogoutResponse = {
    logged_out :boolean
}

export type { User, UserRegister, UserLogin, AuthenticationResponse, LogoutResponse };