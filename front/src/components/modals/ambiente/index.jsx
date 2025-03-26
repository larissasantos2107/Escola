import React, {useState,useEffect} from "react";
import './styles.css'
import axios from "axios";

const ModalAmbiente
 = ({
    isOpen,
    onClose,
    AmbienteSelecionado,
    setSeta,
    seta 

})=>{
    if(!isOpen) return null

    const [id, setId] = useState(AmbienteSelecionado?.id || '')
    const [sala, setSala] = useState(AmbienteSelecionado?.sala || '')
    const [codigo, setCodigo] = useState(AmbienteSelecionado?.codigo || '')
    const [periodo, setPeriodo] = useState(AmbienteSelecionado?.periodo || '')
    const [capacidade, setCapacidade] = useState(AmbienteSelecionado?.capacidade || '')
    const [responsavel, setResponsavel] = useState(AmbienteSelecionado?.responsavel || '')
    const [PeriodoOptions, setPeriodoOptions] = useState([]);
    const token = localStorage.getItem('token')

        useEffect(() => {
        async function fetchPeriodoOptions() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/periodo_choices", 
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
    
                setPeriodoOptions(response.data); // Aqui recebe a lista corretamente
    
            } catch (error) {
                console.error("Erro ao buscar opções de periodo:", error);
            }
        }
    
        fetchPeriodoOptions();
    }, []);

    const handleSubmit = (e)=>{
        e.preventDefault()
        const novoAmbiente = {sala, codigo, periodo, capacidade, responsavel }
        if(AmbienteSelecionado){
            atualizar({...AmbienteSelecionado, ...novoAmbiente})
        }else{
            console.log("Teste nova sala: ", novoAmbiente)
            criar(novoAmbiente)
        }
    }

    const newAmbiente = async() =>{
        try {
            await axios.post('http://127.0.0.1:8000/api/sala', 
                {   sala: sala,
                    codigo: codigo,
                    periodo: periodo,
                    capacidade: capacidade,
                    responsavel: responsavel,
                    
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

    const editAmbiente = async() =>{
        try {
            await axios.put(`http://127.0.0.1:8000/api/sala/${AmbienteSelecionado.id}`, 
                {   sala: sala,
                    codigo: codigo,
                    periodo: periodo,
                    capacidade: capacidade,
                    responsavel: responsavel,
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
                <h2>{AmbienteSelecionado ? `Editar | ${AmbienteSelecionado.sala}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa1">
                            <input
                                className="sala-modal"
                                value={sala}
                                placeholder="sala"
                                onChange={(e)=>setSala(e.target.value)}
                            />
                            <input
                                className="codigo-modal"
                                value={codigo}
                                placeholder="codigo"
                                onChange={(e)=>setCodigo(e.target.value)}
                            />
                            <select
                                className="capacidade-modal"
                                value={periodo}
                                onChange={(e) => setPeriodo(e.target.value)} // Corrigido: setTipo_Curso com "C" maiúsculo
                            >
                                <option value="">Selecione o tipo</option>
                                {PeriodoOptions.length > 0 ? (
                                PeriodoOptions.map((option) => (
                                <option key={option[0]} value={option[0]}>
                                    {option[1]}
                                </option>
                            ))
                        ) : (
                            <option disabled>Carregando...</option>
                        )}
                            </select>
                            <input
                                className="responsavel-modal"
                                value={responsavel}
                                placeholder="responsavel"
                                onChange={(e)=>setResponsavel(e.target.value)}
                            />
                            <input
                                className="capacidade-modal"
                                value={capacidade}
                                placeholder="capacidade"
                                onChange={(e)=>setCapacidade(e.target.value)}
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
                        onClick={AmbienteSelecionado? editAmbiente : newAmbiente}>
                        {AmbienteSelecionado ? "Atualizar" : "Salvar"}</button> 
                </div>
            </div>
        </div>
    )
}


export default ModalAmbiente

