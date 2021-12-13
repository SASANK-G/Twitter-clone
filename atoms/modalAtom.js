
import { atom } from "recoil";

//This is how we write atom using useState
//useState cannot be used globally
//const [modalState, setModalState] = useState(false)


//atom can be used globally anywhere
export const modalState = atom({
    key:"modalState",
    default:false,

});

export const postIdState = atom({
    key:"postIdState",
    default:"",

});