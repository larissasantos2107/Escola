import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalAmbiente from "../../components/modals/ambiente"


export default function Ambientes() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    const [seta, setSeta] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [AmbienteSelecionado, setAmbienteSelecionado] = useState(null)

    useEffect(() => {
        if (!token) return;
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/sala',
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
                await axios.delete(`http://127.0.0.1:8000/api/sala/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(dados.filter((sala) => { sala.id !== id }))
                setSeta(!seta)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const criar = async(novoAmbiente)=>{
        console.log("Novo sala: ", novoAmbiente)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/sala',
                {
                    sala: sala,
                    codigo: codigo,
                    capacidade: capacidade,
                    responsavel: responsavel,
                    periodo: periodo
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novoAmbiente])
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }


    const atualizar = async (sala)=>{
        setAmbienteSelecionado(sala)
        setModalOpen(true)

    }

    return (
        <div>
            <Header />
            
            <div className="container_curso">
                <div className="lista">
                    <table>
                        <thead>
                            <tr className="icons">
                                <div className="col1"></div>
                                <div className="col2"></div>
                                <div className="col3_ambiente"><th>ID</th></div>
                                <div className="col4_ambiente"><th>CODIGO</th></div>
                                <div className="col5_ambiente"><th>SALA</th></div>                               
                                <div className="col6_ambiente"><th>CAPACIDADE</th></div>                               
                                <div className="col7_ambiente"><th>RESPONSAVEL</th></div>                               
                                <div className="col8_ambiente"><th>PERIODO</th></div>                               
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((sala) => (
                                <tr key={sala.id} className="campos">
                                    <td className="icons">
                                        <div className="col1">
                                            <FaEdit className="editt" onClick={() => atualizar(sala)}/>
                                        </div>
                                        <div className="col2">
                                            <FaTrash className="deletee" onClick={()=>apagar(sala.id)} />
                                        </div>

                                    </td>
                                    <div className="col3_ambiente"><td>{sala.id}</td></div>
                                    <div className="col4_ambiente"><td>{sala.codigo}</td></div>
                                    <div className="col5_ambiente"><td>{sala.sala}</td></div>
                                    <div className="col6_ambiente"><td>{sala.capacidade}</td></div>
                                    <div className="col7_ambiente"><td>{sala.responsavel}</td></div>
                                    <div className="col8_ambiente"><td>{sala.periodo}</td></div>                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setAmbienteSelecionado(null)}}/>
                    </div>
                    <div className="id">
                        <input placeholder="id" />
                    </div>
                    <div className="nome">
                        <input placeholder="nome da sala" />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>
                <ModalAmbiente
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    AmbienteSelecionado={AmbienteSelecionado}
                    setSeta = {setSeta}
                    seta = {seta}
                />
            </div>
            <Footer />
        </div>
    )
}

