import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalTurmas from "../../components/modals/turmas";


export default function Turmas() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    const [seta, setSeta] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [TurmaSelecionado, setTurmaSelecionado] = useState(null)

    useEffect(() => {
        if (!token) return;
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/turma',
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
                await axios.delete(`http://127.0.0.1:8000/api/turma/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(dados.filter((turma) => { turma.id !== id }))
                setSeta(!seta)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const criar = async(novaTurma)=>{
        console.log("Nova turma: ", novaTurma)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/turma',
                {
                    turma: turma,
                    codigo: codigo
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novaTurma])
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }


    const atualizar = async (turma)=>{
        setTurmaSelecionado(turma)
        setModalOpen(true)

    }

    return (
        <div>
            <Header />
            
            <div className="container_turma">
                <div className="lista">
                    <table>
                        <thead>
                            <tr className="icons">
                                <div className="col1"></div>
                                <div className="col2"></div>
                                <div className="col3_turma"><th>ID</th></div>
                                <div className="col4_turma"><th>TURMA</th></div>
                                <div className="col5_turma"><th>CODIGO</th></div>                                
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((turma) => (
                                <tr key={turma.id} className="campos">
                                    <td className="icons">
                                        <div className="col1">
                                            <FaEdit className="edit" onClick={() => atualizar(turma)}/>
                                        </div>
                                        <div className="col2">
                                            <FaTrash className="delete" onClick={() => apagar(turma.id)} />
                                        </div>

                                    </td>
                                    <div className="col3_turma"><td>{turma.id}</td></div>
                                    <div className="col4_turma"><td>{turma.turma}</td></div>
                                    <div className="col5_turma"><td>{turma.codigo}</td></div>                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setTurmaSelecionado(null)}}/>
                    </div>
                    <div className="id">
                        <input placeholder="id" />
                    </div>
                    <div className="nome">
                        <input placeholder="nome da turma" />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>
                <ModalTurmas
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    TurmaSelecionado={TurmaSelecionado}
                    setSeta = {setSeta}
                    seta = {seta}
                />
            </div>
            <Footer />
        </div>
    )
}

