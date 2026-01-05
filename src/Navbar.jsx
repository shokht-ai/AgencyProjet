import { MapPin, UserCircle } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
       
              className="flex items-center space-x-2"
            >
              <MapPin className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ComeOn
              </span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {/*<Link
                to="/home"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Bosh sahifa
              </Link>*/}
              <Link
                to="/packages"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Paketlar
              </Link>
              <button
              
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {/* <Globe className="w-5 h-5" /> */}
                3D Sayohat
              </button>

              <button
          
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {/* <Sparkles className="w-5 h-5" /> */}
                AI Yordamchi
              </button>
              {/*<Link to="/" className="text-gray-700 hover:text-blue-600 transition">Agentliklar</Link>*/}
              {/* <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Biz haqimizda</Link> */}
              <button >
                <UserCircle className="text-gray-700 hover:text-blue-600 transition"></UserCircle>
              </button>
              {/*<Link to='/' className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                Ro'yxatdan o'tish
              </Link>*/}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
   
            >
  </button>
          </div>
        </div>


      </nav>
    );
}

export default Navbar;