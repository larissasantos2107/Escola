import React, {useState} from "react";
import './styles.css'
import axios from "axios";

const ModalDisciplina = ({
    isOpen,
    onClose,
    disciplinaSelecionado,
    setSeta,
    seta 

})=>{
    if(!isOpen) return null

    const [disciplina, setDiciplina] = useState(disciplinaSelecionado?.id || '')
    const [codigo, setCodigo] = useState(disciplinaSelecionado?.ni || '')
    const [cargaHoraria, setCargaHoraria] = useState(disciplinaSelecionado?.nome || '')
    const token = localStorage.getItem('token')

    const handleSubmit = (e)=>{
        e.preventDefault()
        const novaDisciplina = {disciplina, codigo, cargaHoraria}
        if(disciplinaSelecionado){
            atualizar({...disciplinaSelecionado, ...novaDisciplina})
        }else{
            console.log("Teste nova disciplina: ", novaDisciplina)
            criar(novaDisciplina)
        }
    }

    const newDisciplini = async() =>{
        try {
            await axios.post('http://127.0.0.1:8000/api/disciplina', 
                {   disciplina: disciplina,
                    codigo: codigo,
                    cargaHoraria: cargaHoraria
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

    const editDisciplini = async() =>{
        try {
            await axios.put(`http://127.0.0.1:8000/api/disciplina/${disciplinaSelecionado.id}`, 
                {  disciplina: disciplina,
                    codigo: codigo,
                    cargaHoraria: cargaHoraria
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
                <h2>{disciplinaSelecionado ? `Editar | ${disciplinaSelecionado.disciplina}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa1">
                            <input
                                className="disciplina-modal"
                                value={disciplina}
                                placeholder="disciplina"
                                onChange={(e)=>setDiciplina(e.target.value)}
                            />
                            <input
                                className="codigo-modal"
                                value={codigo}
                                placeholder="codigo"
                                onChange={(e)=>setCodigo(e.target.value)}
                            />
                            <input
                                className="cargaHoraria-modal"
                                value={cargaHoraria}
                                placeholder="carga Horaria"
                                onChange={(e)=>setCargaHoraria(e.target.value)}
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
                        onClick={disciplinaSelecionado? editDisciplini : newDisciplini}>
                        {disciplinaSelecionado ? "Atualizar" : "Salvar"}</button> 
                </div>
            </div>
        </div>
    )
}


export default ModalDisciplina
