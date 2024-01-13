type User = {
    id: number
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
    role :string,
    name? :string,
    surname? :string,
    celebration_date? :string
    city? :string
    phone_number? :string
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

// Event 

type EventModel = {
    id: number,
    name: string,
    date: string
}

const EMPTY_EVENT_MODEL: EventModel = {
    id: -1,
    name: "",
    date: ""
}

// Note

type NoteModel = {
    id?: number,
    name?: string,
    body?: string
}

export {EMPTY_EVENT_MODEL};

export type { 
    User, UserRegister, UserLogin, AuthenticationResponse, LogoutResponse,
    EventModel, NoteModel };