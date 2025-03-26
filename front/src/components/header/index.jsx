import React from "react";
import {ImExit} from "react-icons/im"
import './styles.css'
import { useNavigate} from 'react-router-dom'


export default function Header() {

    const navigate = useNavigate(); // Mover o useNavigate para o corpo do componente

    const logout = () => {
        console.log(localStorage.getItem("token"));
        localStorage.removeItem('token');
        console.log(localStorage.getItem("token"));
        localStorage.removeItem('refresh_token');
        navigate("/login"); // Utilizar o navigate corretamente
    }
    return (
        <div className="container_header">
            <section className="body_header">
                <div className="title">
                    <h1>Disciplinas</h1>
                </div>
                <div className="nav">
                    <span>Create</span>
                    <span>Read</span>
                    <span>Update</span>
                    <span>Delete</span>
                </div>
                <div className="exit">
                    <ImExit onClick={logout}/>
                </div>
            </section>
        </div>
    )
}