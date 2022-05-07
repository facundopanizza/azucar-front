import { FC, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

const Login: FC = () => {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onClick = async (e) => {
    e.preventDefault();

    try {
      const token = await axios.post<{ accessToken: string }>(`${process.env.NEXT_PUBLIC_BACK_URL}/auth/login`, {
        password
      });

      localStorage.setItem('token', token.data.accessToken);

      router.push('/products');
    } catch (error) {
      setError('Contraseña invalida');
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border rounded-xl px-6 py-4">
        <form onSubmit={(e) => onClick(e)}>
          <h1 className="mb-5 text-lg text-center">Iniciar Sesión</h1>

          <div>
            <label>Contraseña</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full border border-gray-500 focus:border-blue-500 rounded py-2 px-2 ${
                error ? 'border-red-500' : ''
              }`} type={showPassword ? "text" : "password"} />
            <button onClick={() => setShowPassword(!showPassword)} type="button" className="text-sm">{ showPassword ? 'ocultar contraseña' : 'mostrar contraseña' }</button>
            {error ? <div className="text-red-600">{error}</div> : null}
          </div>

          <button className="mb-2 mt-3 bg-brand py-2 px-4 rounded text-white">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  )
}

export default Login;