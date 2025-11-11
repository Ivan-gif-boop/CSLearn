import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        alert("Login successful!");
        
        // Redirect based on role
        if (data.user.role === 'admin') {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="hidden lg:block lg:w-1/2 relative">
          <img src="/images/login-image.jpg" alt="Learning" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-indigo-600 bg-opacity-20"></div>
        </div>

        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Code className="h-12 w-12 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue learning</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                required 
                placeholder="Your email address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                required 
                placeholder="Your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg disabled:bg-indigo-400"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}