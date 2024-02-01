// Every Types

function isProperId(id: number):boolean {
    return id != null && id >= 0;
}

// User

type ProviderModel = {
    id: number
    address? :string,
    phone_number?: string,
}

type OrganizerModel = {
    id: number
    celebration_date? :string,
    days_to_ceremony: number
}

type UserModel = {
    id: number
    email :string,
    role :string,
    name? :string,
    surname? :string,
    provider? :ProviderModel,
    organizer? :OrganizerModel,
}

const defaultEmptyUser: UserModel = {
    id: -1,
    email: "",
    role: "",
    provider: {
        id: -1,
      address: "",
      phone_number: "",
    },
    organizer: {
        id: -1,
      celebration_date: "",
      days_to_ceremony: 0
    },
};

type UserRegister = {
    email :string,
    role :string,
    name? :string,
    surname? :string,
    celebration_date? :string
    address? :string
    phone_number? :string
    password: string,
    password_confirmation: string
}

type UserLogin = {
    email :string,
    password: string
}

interface Authentication {
    user: UserModel;
    logged_in: boolean;
  }
  
  const emptyAuthentication: Authentication = {
    user: defaultEmptyUser,
    logged_in: false,
  };
  
  const initAuthentication: Authentication = {
    user: defaultEmptyUser,
    logged_in: true,
  };

type AuthenticationResponse = {
    logged_in :boolean,
    user? :UserModel,
    addition_data? :any
}

type LogoutResponse = {
    logged_out :boolean
}

type HomePageDataResponse = {
    user :UserModel | null,
    addition_data :any
}

const emptyHomePageData : HomePageDataResponse = {
    user: null,
    addition_data: undefined
}

type ProviderUserContact = {
    address :string
    phone_number :string
}

type OrganizerUserCelebrationDays = {
    days_to_ceremony :string
}

// Guests

interface GuestModel {
    id: number;
    user_id: number;
    name: string;
    surname: string;
    addition_attribiutes: AdditionAttribiuteModel[];
    created_at?: string;
    updated_at?: string;
  }

const EMPTY_GUEST_MODEL: GuestModel = {
    id: -1,
    user_id: -1,
    name: "Marek",
    surname: "Kowalski",
    addition_attribiutes: []
}

interface NameModel {
    id: number;
    organizer_id: number;
    name: string;
    default_value: string;
    created_at?: string;
    updated_at?: string;
}
interface AdditionAttribiuteModel {
    id: number;
    addition_attribiute_name_id: number;
    guest_id: number;
    value: string;
    created_at?: string;
    updated_at?: string;
}

const EMPTY_NAME_MODEL: NameModel = {
    id: 0,
    organizer_id: 0,
    name: "",
    default_value: ""
}

const EMPTY_ADDITION_ATTRIBIUTE_MODEL: AdditionAttribiuteModel = {
    id: 0,
    addition_attribiute_name_id: 0,
    guest_id: 0,
    value: ""
}

// Offer

interface OfferModel {
    id: number;
    provider_id: number;
    title: string;
    description: string;
    address: string;
    addition_contact_data: string;
    category: string;
    prize: number;
    images: [];
    created_at?: string;
    updated_at?: string;
  }

  interface OfferApiResponse {
    data: OfferModel
    status: number
  }
  const OFFER_ID_KEY = "offer[id]"
  const OFFER_TITLE_KEY = "offer[title]"
  const OFFER_ADDRESS_KEY = "offer[address]"
  const OFFER_ADDITION_CONTACT_DATA_KEY = "offer[addition_contact_data]"
  const OFFER_DESCRIPTION_KEY = "offer[description]"
  const OFFER_CATEGORY_KEY = "offer[category]"
  const OFFER_PRIZE_KEY = "offer[prize]"
  const OFFER_IMAGES_KEY = "offer[images][]"

  const OFFER_CATEGORY_OPTIONS = ["venue", "music", "camera", "other"];
  const MIN_OFFER_PRIZE = 0;
  const MAX_OFFER_PRIZE = 50000;

  const EMPTY_OFFER_MODEL: OfferModel = {
      id: -1,
      provider_id: -1,
      title: "",
      description: "",
      address: "",
      addition_contact_data: "",
      images: [],
      category: OFFER_CATEGORY_OPTIONS[0],
      prize: 0,
  }

  interface OfferContactModel {
    user: {
        email: string,
        address?: string,
        phone_number?: string,
    },
    offer: {
        address: string,
        addition_contact_data?: string
    }
  }

  const OFFER_EMPTY_CONTACT_DATA: OfferContactModel = {
      user: {
          email: "",
          address: undefined,
          phone_number: undefined
      },
      offer: {
          address: "",
          addition_contact_data: undefined
      }
  }

function offerModelTitleContains(offer: OfferModel, stringToContain: string): boolean {
    return offer.title.toLowerCase().includes(stringToContain.toLowerCase())
}
function offerModelDescriptionContains(offer: OfferModel, stringToContain: string): boolean {
    return offer.description.toLowerCase().includes(stringToContain.toLowerCase()) 
}
function offerModelAddressContains(offer: OfferModel, stringToContain: string): boolean {
    return offer.address.toLowerCase().includes(stringToContain.toLowerCase())
}
function offerModelCategoryConsistsOf(offer: OfferModel, stringToContain: string): boolean {
    return stringToContain.toLowerCase().includes(offer.category.toLowerCase())
}

// Event 

type EventModel = {
    id: number,
    name: string,
    date: string,
    notes: NoteModel[]
    created_at?: string;
    updated_at?: string;
}

const EMPTY_EVENT_MODEL: EventModel = {
    id: -1,
    name: "",
    date: "",
    notes: []
}

function isObjectEventModel(event:any):boolean {
    return event.id && event.name && event.date && event.notes;
}

// Note

type NoteModel = {
    id: number,
    name: string,
    body: string,
    status: string
    event_id?: number,
    created_at?: string;
    updated_at?: string;
}

const EMPTY_NOTE_MODEL: NoteModel = {
    id: -1,
    event_id: -1,
    name: "",
    body: "",
    status: "undone"
}

function isObjectNoteModel(note:any):boolean {
    return note.id && note.name && note.body;
}

// Filters

type FiltersModel = {
    prize: number[],
    categories: string[]
    address: string,
}

const EMPTY_FILTER_MODEL: FiltersModel = {
    prize: [2000, 5000],
    categories: [],
    address: "",
}

export {
    isProperId, 
    EMPTY_EVENT_MODEL, EMPTY_GUEST_MODEL, EMPTY_NOTE_MODEL, EMPTY_OFFER_MODEL, EMPTY_FILTER_MODEL, EMPTY_NAME_MODEL, EMPTY_ADDITION_ATTRIBIUTE_MODEL,
    isObjectEventModel, isObjectNoteModel,
    offerModelTitleContains, offerModelDescriptionContains, offerModelAddressContains, offerModelCategoryConsistsOf,
    OFFER_CATEGORY_OPTIONS, MIN_OFFER_PRIZE, MAX_OFFER_PRIZE, OFFER_EMPTY_CONTACT_DATA,
    OFFER_ID_KEY, OFFER_TITLE_KEY, OFFER_DESCRIPTION_KEY, OFFER_ADDRESS_KEY, OFFER_CATEGORY_KEY, OFFER_PRIZE_KEY, OFFER_IMAGES_KEY, OFFER_ADDITION_CONTACT_DATA_KEY,
    defaultEmptyUser, emptyAuthentication, initAuthentication, emptyHomePageData
};

export type { 
    UserModel, UserRegister, UserLogin, AuthenticationResponse, Authentication, LogoutResponse, HomePageDataResponse,
    ProviderUserContact, OrganizerUserCelebrationDays,
    GuestModel, NameModel, AdditionAttribiuteModel,
    OfferModel, OfferApiResponse, OfferContactModel,
    EventModel, NoteModel,
    FiltersModel 
};