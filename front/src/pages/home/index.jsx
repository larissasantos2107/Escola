import axios from "axios";
import React, { useState, useEffect } from "react"; // useState o estado atual 
//import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styyles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import {useNavigate} from 'react-router-dom'


export default function Home() {
    const navigate = useNavigate()
    return(
        <div>
            <Header/>
            <div className="container_home">
                <h1>Home</h1>
                <button onClick={()=>navigate('/professor')}>Teachers</button>
                <button onClick={()=>navigate('/disciplinas')}>Subjects</button>
                <button onClick={()=>navigate('/turmas')}>Turmas</button>
                <button onClick={()=>navigate('/cursos')}>Cursos</button>
                <button onClick={()=>navigate('/ambientes')}>Ambientes</button>
            </div>
            <Footer/>
        </div>
    )
}








