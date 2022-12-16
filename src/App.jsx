import React, {createContext,useState} from "react";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Footer from "./pages/Footer";
import Api from "../api"
export const Ctx = createContext({})

export const App = () => {
    const [db,updDb] = useState(JSON.parse(localStorage.getItem("db") || "[]"));
    const [userId,setUserId] = useState(localStorage.getItem("userId") || "");
    const [userName,setUserName] = useState(localStorage.getItem("author") || "");
    const [profile,setProfile] = useState("");
    const [email, setEmail] = useState("");
    const [postText, setPText] = useState(localStorage.getItem("postText") || "[]");
    const [postTitle, setPTitle] = useState(localStorage.getItem("postTitle") || "");
    const [postImg, setPImg] = useState(localStorage.getItem("postImg") || "");


    return (
        <Ctx.Provider value={{
            db: db,
            userId: userId,
            userName: userName,
            email:email,
            api: new Api(),
            updDb: updDb,
            updUId: setUserId,
            updUName: setUserName,
            profile: setProfile,
            
            postTitle: setPTitle,
            postText: setPText,
            postImg: setPImg,
            
            updPTitle: setPTitle,
            updPText: setPText,
            updPImg: setPImg


        }}>
            <Header />
            <Main />
            <Footer />
        </Ctx.Provider>
    );
};
