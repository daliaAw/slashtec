import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AddClient from './components/addClient';
import HomePage from './pages/homePage';

function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: any) => {
    console.log('Login Success:', credentialResponse);
    navigate('/home');
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900">Sign In with Google</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log('Login Failed')}
          useOneTap
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/add-client" element={<AddClient />} />
    </Routes>
  );
}
