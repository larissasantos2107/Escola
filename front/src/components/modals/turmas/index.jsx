import React, {useState} from "react";
import './styles.css'
import axios from "axios";

const ModalTurmas
 = ({
    isOpen,
    onClose,
    TurmaSelecionado,
    setSeta,
    seta 

})=>{
    if(!isOpen) return null

    const [id, setId] = useState(TurmaSelecionado?.id || '')
    const [codigo, setCodigo] = useState(TurmaSelecionado?.codigo || '')
    const [turma, setTurma] = useState(TurmaSelecionado?.turma || '')
    const token = localStorage.getItem('token')

    const handleSubmit = (e)=>{
        e.preventDefault()
        const novaTurma = {codigo, turma}
        if(TurmaSelecionado){
            atualizar({...TurmaSelecionado, ...novaTurma})
        }else{
            console.log("Teste nova codigo: ", novaTurma)
            criar(novaTurma)
        }
    }

    const newturma = async() =>{
        try {
            await axios.post('http://127.0.0.1:8000/api/turma', 
                {   codigo: codigo,
                    turma: turma
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            console.log("Turma inserido sucefful")
            setSeta(!seta)
            onClose(true)
        } catch (error) {
            
        }
    }

    const editturma = async() =>{
        try {
            await axios.put(`http://127.0.0.1:8000/api/turma/${TurmaSelecionado.id}`, 
                {   codigo: codigo,
                    turma: turma
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
                <h2>{TurmaSelecionado ? `Editar | ${TurmaSelecionado.codigo}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa1">
                            <input
                                className="codigo-modal"
                                value={codigo}
                                placeholder="codigo"
                                onChange={(e)=>setCodigo(e.target.value)}
                            />
                            <input
                                className="turma-modal"
                                value={turma}
                                placeholder="turma"
                                onChange={(e)=>setTurma(e.target.value)}
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
                        onClick={TurmaSelecionado? editturma : newturma}>
                        {TurmaSelecionado ? "Atualizar" : "Salvar"}</button> 
                </div>
            </div>
        </div>
    )
}


export default ModalTurmas

