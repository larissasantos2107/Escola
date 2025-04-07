import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Importando o hook useNavigate
import './styles.css';

export default function SignUp() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Inicializando o hook useNavigate
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/signup/", 
                {
                    username: user,
                    password: password
                }
            );
            setMessage("Usuário cadastrado com sucesso!");
            navigate("/home");  // A página Home, que pode ser configurada no seu React Router
        } catch (error) {
            setMessage("Erro ao cadastrar usuário. Verifique os dados e tente novamente.");
        }
    };

    return (
        <div className="container_up">
            <div className="body_up">
                
                <label>Username</label>
                <input
                    className="caixa_up"
                    value={user}
                    onChange={(e) => { setUser(e.target.value) }}
                />
                <input
                    type="password"
                    className="caixa_up"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <button className="botao_up" onClick={onSubmit}>
                    Cadastrar
                </button>

                <h5>{message}</h5>
            </div>
        </div>
    )
}
