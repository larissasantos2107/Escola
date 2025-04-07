import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './sttyles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalSubjects from "../../components/modals/subject";


export default function Disciplina() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    const [seta, setSeta] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [DisciplinaSelecionado, setDisciplinaSelecionado] = useState(null)

    useEffect(() => {
        if (!token) return;
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/disciplina',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [seta])

    const apagar = async (id) => {
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/disciplina/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(dados.filter((disciplina) => { disciplina.id !== id }))
                setSeta(!seta)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const criar = async(novaDisciplina)=>{
        console.log("Nova disciplina: ", novaDisciplina)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/disciplina',
                {
                    disciplina: disciplina,
                    codigo: codigo,
                    cargaHoraria: cargaHoraria
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novaDisciplina])
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }


    const atualizar = async (disciplina)=>{
        setDisciplinaSelecionado(disciplina)
        setModalOpen(true)

    }

    return (
        <div>
            <Header />
            
            <div className="container_disciplina">
                <div className="lista">
                    <table>
                        <thead>
                            <tr className="icons">
                                <div className="col1_d"></div>
                                <div className="col2_d"></div>
                                <div className="col3_d"><th>ID</th></div>
                                <div className="col4_d"><th>DISCIPLINA</th></div>
                                <div className="col5_d"><th>CODIGO</th></div>
                                <div className="col6_d"><th>CH</th></div>
                                
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((disciplina) => (
                                <tr key={disciplina.id} className="campos">
                                    <td className="icons">
                                        <div className="col1_d">
                                            <FaEdit className="edit" onClick={() => atualizar(disciplina)}/>
                                        </div>
                                        <div className="col2_d">
                                            <FaTrash onClick={() => apagar(disciplina.id)} />
                                        </div>

                                    </td>
                                    <div className="col3_d"><td>{disciplina.id}</td></div>
                                    <div className="col4_d"><td>{disciplina.disciplina}</td></div>
                                    <div className="col5_d"><td>{disciplina.codigo}</td></div>
                                    <div className="col6_d"><td>{disciplina.cargaHoraria}</td></div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setDisciplinaSelecionado(null)}}/>
                    </div>
                    <div className="id">
                        <input placeholder="id" />
                    </div>
                    <div className="nome">
                        <input placeholder="nome da disciplina" />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>
                <ModalSubjects
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    DisciplinaSelecionado={DisciplinaSelecionado}
                    setSeta = {setSeta}
                    seta = {seta}
                />
            </div>
            <Footer />
        </div>
    )
}

