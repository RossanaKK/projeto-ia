import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  
    const [erro, setErro] = useState(""); 
    const [sucesso, setSucesso] = useState(""); 
    const navigate = useNavigate();
    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        setErro(""); 
        setSucesso("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully");
            setSucesso("Login efetuado com sucesso! A entrar...");
            setTimeout(() => {
                navigate("/chat");
            }, 1500);
        } catch (error: any) {
            console.log(error);
            setErro("Dados incorretos. Verifica o teu email e palavra-passe.");
        }
    }   
    return (
        <div className="container mt-5 d-flex justify-content-center">
            <form onSubmit={handleLogin} className="card p-4 shadow-sm" style={{ width: '350px' }}>
                <h3 className="text-center mb-3">Entrar</h3>
                {erro && (
                    <div className="alert alert-danger py-2 text-center small" role="alert">
                        {erro}
                    </div>
                )}
                {sucesso && (
                    <div className="alert alert-success py-2 text-center small" role="alert">
                        {sucesso}
                    </div>
                )}
                <input className="form-control mb-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Email" required />
                <input className="form-control mb-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password" required />
                <button className="btn btn-primary w-100" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;