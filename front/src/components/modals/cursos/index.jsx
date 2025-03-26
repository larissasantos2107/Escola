import React, {useState,useEffect} from "react";
import './styles.css'
import axios from "axios";

const ModalCursos
 = ({
    isOpen,
    onClose,
    CursoSelecionado,
    setSeta,
    seta 

})=>{
    if(!isOpen) return null

    const [id, setId] = useState(CursoSelecionado?.id || '')
    const [curso, setCursos] = useState(CursoSelecionado?.curso || '')
    const [codigo, setCodigo] = useState(CursoSelecionado?.codigo || '')
    const [tipo_curso, setTipo_Curso] = useState(CursoSelecionado?.tipo_curso || '')
    const [hora_aula, setHora_Aula] = useState(CursoSelecionado?.hora_aula || '')
    const [sigla, setSigla] = useState(CursoSelecionado?.sigla || '')
    const [tipoCursoOptions, setTipoCursoOptions] = useState([]);
    const token = localStorage.getItem('token')

        useEffect(() => {
        async function fetchTipoCursoOptions() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/tipo_curso_choices", 
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
    
                setTipoCursoOptions(response.data); // Aqui recebe a lista corretamente
    
            } catch (error) {
                console.error("Erro ao buscar opções de tipo de curso:", error);
            }
        }
    
        fetchTipoCursoOptions();
    }, []);

    const handleSubmit = (e)=>{
        e.preventDefault()
        const novoCurso = {curso, codigo, tipo_curso, hora_aula, sigla}
        if(CursoSelecionado){
            atualizar({...CursoSelecionado, ...novoCurso})
        }else{
            console.log("Teste novo curso: ", novoCurso)
            criar(novoCurso)
        }
    }

    const newCurso = async() =>{
        try {
            await axios.post('http://127.0.0.1:8000/api/curso', 
                {   curso: curso,
                    codigo: codigo,
                    tipo_curso: tipo_curso,
                    hora_aula: hora_aula,
                    sigla: sigla,
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            console.log("Curso inserido sucefful")
            setSeta(!seta)
            onClose(true)
        } catch (error) {
            
        }
    }

    const editCurso = async() =>{
        try {
            await axios.put(`http://127.0.0.1:8000/api/curso/${CursoSelecionado.id}`, 
                {   curso: curso,
                    codigo: codigo,
                    tipo_curso: tipo_curso,
                    hora_aula: hora_aula,
                    sigla: sigla,
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
                <h2>{CursoSelecionado ? `Editar | ${CursoSelecionado.curso}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa1">
                            <input
                                className="curso-modal"
                                value={curso}
                                placeholder="curso"
                                onChange={(e)=>setCursos(e.target.value)}
                            />
                            <input
                                className="codigo-modal"
                                value={codigo}
                                placeholder="codigo"
                                onChange={(e)=>setCodigo(e.target.value)}
                            />
                            <select
                                className="tipo_curso-modal"
                                value={tipo_curso}
                                onChange={(e) => setTipo_Curso(e.target.value)} // Corrigido: setTipo_Curso com "C" maiúsculo
                            >
                                <option value="">Selecione o tipo</option>
                                {tipoCursoOptions.length > 0 ? (
                                tipoCursoOptions.map((option) => (
                                <option key={option[0]} value={option[0]}>
                                    {option[1]}
                                </option>
                            ))
                        ) : (
                            <option disabled>Carregando...</option>
                        )}
                            </select>
                            <input
                                className="hora_aula-modal"
                                value={hora_aula}
                                placeholder="hora da aula"
                                onChange={(e)=>setHora_Aula(e.target.value)}
                            />
                            <input
                                className="sigla-modal"
                                value={sigla}
                                placeholder="sigla"
                                onChange={(e)=>setSigla(e.target.value)}
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
                        onClick={CursoSelecionado? editCurso : newCurso}>
                        {CursoSelecionado ? "Atualizar" : "Salvar"}</button> 
                </div>
            </div>
        </div>
    )
}


export default ModalCursos

