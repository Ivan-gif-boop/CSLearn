import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code, User, Shield } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data
        localStorage.setItem('user', JSON.stringify(data.user));
        
        alert("Registration successful!");
        navigate(formData.role === "admin" ? "/admin-dashboard" : "/dashboard");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="hidden lg:block lg:w-1/2 relative">
          <img src="/images/Register-image.jpg" alt="Learning" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-indigo-600 bg-opacity-20"></div>
        </div>

        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Code className="h-12 w-12 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join CSLearn to start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Select Role</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'student'})}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    formData.role === 'student' 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                      : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-400'
                  }`}
                >
                  <User className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Student</div>
              </button>
                
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'admin'})}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    formData.role === 'admin' 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                      : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-400'
                  }`}
                >
                  <Shield className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Admin</div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg disabled:bg-indigo-400"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}