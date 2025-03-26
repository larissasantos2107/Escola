import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalCursos from "../../components/modals/cursos";


export default function Cursos() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    const [seta, setSeta] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [CursoSelecionado, setCursoSelecionado] = useState(null)

    useEffect(() => {
        if (!token) return;
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/curso',
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
        console.log("MMMMMMMMMMMMMMM", id);
        
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/curso/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(dados.filter((curso) => { curso.id !== id }))
                setSeta(!seta)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const criar = async(novoCurso)=>{
        console.log("Novo curso: ", novoCurso)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/curso',
                {
                    curso: curso,
                    codigo: codigo,
                    tipo_curso: tipo_curso,
                    hora_aula: hora_aula,
                    sigla: sigla
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novoCurso])
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }


    const atualizar = async (curso)=>{
        setCursoSelecionado(curso)
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
                                <div className="col3_cursos"><th>ID</th></div>
                                <div className="col4"><th>CURSO</th></div>
                                <div className="col5"><th>CODIGO</th></div>                               
                                <div className="col6"><th>TIPO_CURSO</th></div>                               
                                <div className="col7"><th>HORA_AULA</th></div>                               
                                <div className="col8"><th>SIGLA</th></div>                               
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((curso) => (
                                <tr key={curso.id} className="campos">
                                    <td className="icons">
                                        <div className="col1">
                                            <FaEdit className="editt" onClick={() => atualizar(curso)}/>
                                        </div>
                                        <div className="col2">
                                            <FaTrash className="deletee" onClick={()=>apagar(curso.id)} />
                                        </div>

                                    </td>
                                    <div className="col3_cursos"><td>{curso.id}</td></div>
                                    <div className="col4"><td>{curso.curso}</td></div>
                                    <div className="col5"><td>{curso.codigo}</td></div>
                                    <div className="col6"><td>{curso.tipo_curso}</td></div>
                                    <div className="col7"><td>{curso.hora_aula}</td></div>
                                    <div className="col8"><td>{curso.sigla}</td></div>                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setCursoSelecionado(null)}}/>
                    </div>
                    <div className="id">
                        <input placeholder="id" />
                    </div>
                    <div className="nome">
                        <input placeholder="nome da curso" />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>
                <ModalCursos
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    CursoSelecionado={CursoSelecionado}
                    setSeta = {setSeta}
                    seta = {seta}
                />
            </div>
            <Footer />
        </div>
    )
}

