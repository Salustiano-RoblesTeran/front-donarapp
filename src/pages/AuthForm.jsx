import { useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>
        <form>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nombre"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          )}
          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline ml-2"
          >
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
