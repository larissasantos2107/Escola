import React, {useState} from "react";
import './styles.css'
import axios from "axios";

const ModalProfessores = ({
    isOpen,
    onClose,
    professorSelecionado,
    setSeta,
    seta 

})=>{
    if(!isOpen) return null

    const [id, setId] = useState(professorSelecionado?.id || '')
    const [ni, setNi] = useState(professorSelecionado?.ni || '')
    const [nome, setNome] = useState(professorSelecionado?.nome || '')
    const [email, setEmail] = useState(professorSelecionado?.email || '')
    const [tel, setTel] = useState(professorSelecionado?.tel || '')
    const [ocupacao, setOcupacao] = useState(professorSelecionado?.ocupacao || '')
    const token = localStorage.getItem('token')

    const handleSubmit = (e)=>{
        e.preventDefault()
        const novoProfessor = {ni, nome, email, tel, ocupacao}
        if(professorSelecionado){
            atualizar({...professorSelecionado, ...novoProfessor})
        }else{
            console.log("Teste novo professor: ", novoProfessor)
            criar(novoProfessor)
        }
    }

    const newTeacher = async() =>{
        try {
            await axios.post('http://127.0.0.1:8000/api/professores', 
                {   ni: ni,
                    nome: nome,
                    email: email,
                    tel: tel,
                    ocupacao: ocupacao
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            console.log("prof inserido sucefful")
            setSeta(!seta)
            onClose(true)
        } catch (error) {
            
        }
    }

    const editTeacher = async() =>{
        try {
            await axios.put(`http://127.0.0.1:8000/api/professor/${professorSelecionado.id}`, 
                {   ni: ni,
                    nome: nome,
                    email: email,
                    tel: tel,
                    ocupacao: ocupacao
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            setSeta(!seta)
            onClose(true)
        } catch (error) {
            
        }
    }


    return(
        <div className="modal-modal">
            <div className="container-modal">
                <div className="head-modal">
                <button className="close-button" onClick={onClose}>X</button>
                </div>
                <h2>{professorSelecionado ? `Editar | ${professorSelecionado.nome}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa1">
                            <input
                                className="ni-modal"
                                value={ni}
                                placeholder="ni"
                                onChange={(e)=>setNi(e.target.value)}
                            />
                            <input
                                className="nome-modal"
                                value={nome}
                                placeholder="nome"
                                onChange={(e)=>setNome(e.target.value)}
                            />
                            <input
                                className="email-modal"
                                value={email}
                                placeholder="email"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <input
                                className="tel-modal"
                                value={tel}
                                placeholder="tel"
                                onChange={(e)=>setTel(e.target.value)}
                            />
                            <input
                                className="ocupacao-modal"
                                value={ocupacao}
                                placeholder="ocupacao"
                                onChange={(e)=>setOcupacao(e.target.value)}
                            />
                        </div>
                        <div className="caixa2">
                            
                        </div>
                    </form>
                </div>
                <div className="footer-modal">
                    <button 
                        className= "button-save" 
                        type="submit" 
                        onClick={professorSelecionado? editTeacher : newTeacher}>
                        {professorSelecionado ? "Atualizar" : "Salvar"}</button> 
                </div>
            </div>
        </div>
    )
}


export default ModalProfessores
