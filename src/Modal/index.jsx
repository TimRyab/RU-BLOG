import React, {useState, useContext} from "react";
import { Ctx } from "../App";
import "./style.css";

export default ({state, auth, updState}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwd2, setPwd2] = useState("");
    
    const [authType,setAuthType] = useState(auth);
    const {db, updDb, updUName, updUId,api} = useContext(Ctx);


    const handler = e => {
        e.preventDefault();
        if (authType) {
            api.logIn({
                email: email,
                password:pwd
            })
                .then(res => res.json())
                .then(data =>{
                    console.log(data.message);
                    console.log(data);
                    if(data.message === "ok"){
                        updUId(data.data._id);
                        updUName(data.data.name)
                        localStorage.setItem("author", data.data.name)
                        localStorage.setItem("userId", data.data._id)
                    }
                    setEmail("");
                    setName("");
                    setPwd("");
                    setPwd2("");
                    updState(false);
                    setAuthType(auth);
                });
        } else {
            api.signUp({
                        name: name,
                        password: pwd,
                        email: email
                    })
                    .then(res => res.json())
                    .then(data =>{
                        console.log(data);
                        if(data.message === "ok"){
                            updUId(data.data._id);
                            localStorage.setItem("userId", data.data._id)
                        }
                        setEmail("");
                        setName("");
                        setPwd("");
                        setPwd2("");
                        updState(false);
                        setAuthType(auth);
                    })
        }        
    }
    const changeAuthType = e => setAuthType(!authType)

    return <div className="modal__container" style={{
        display: state ? "flex" : "none"
    }}>
        <div className="modal">
            <h2>{authType ? "????????" : "??????????????????????"}</h2>
            <form onSubmit={handler}>
             
                <input
                    className="auth-reg-input"
                    type="email"
                    name="email"
                    placeholder="?????????????????????? ??????????"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                {!authType && <input 
                    className="auth-reg-input"
                    type="text"
                    name="name"
                    value={name}
                    placeholder="?????? ????????????????????????"
                    onChange={(e) => {setName(e.target.value)}}
                />}
                <input 
                    className="auth-reg-input"
                    type="password"
                    name="pwd"
                    placeholder="????????????"
                    value={pwd}
                    onChange={(e) => {setPwd(e.target.value)}}
                />
                {!authType && <input 
                    className="auth-reg-input"
                    type="password"
                    placeholder="?????????????????? ????????????"
                    value={pwd2}
                    onChange={(e) => {setPwd2(e.target.value)}}
                />}
                <br />
                <button 
                    type="submit"
                    disabled={!authType && (!pwd || !pwd2 || pwd !== pwd2)}
                >
                    {authType ? "??????????" : "????????????????????????????????????"}
                </button>
            </form>
            <button type="button" onClick={() =>{
                updState(!state)
                setEmail("");
                setName("");
                setPwd("");
                setPwd2("");
                setAuthType(auth);
            }}>close</button>

            <button type="button" onClick={changeAuthType}>{authType ? "????????????????????????????????????" : "??????????"}</button>

        </div>
    </div>
}