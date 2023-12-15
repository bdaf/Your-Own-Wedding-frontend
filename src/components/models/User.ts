type User = {
    email :string,
    role :string,
    name? :string,
    surname? :string,
    city? :string,
    phone_number?: string,
    celebration_date?: Date
}

type RegisterAndLoginResponse = {
    logged_in :boolean,
    user? :User
}

type LogoutResponse = {
    logged_out :boolean
}

export type { User, RegisterAndLoginResponse, LogoutResponse };