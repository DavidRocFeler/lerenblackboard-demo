import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const AddFeature = () => {
  return (
    <div className="relative flex justify-center items-center p-6 rounded-xl overflow-hidden shadow-lg  w-full h-screen ">
        <Link href="/" className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors">
          <X size={24} />
        </Link>
      
      {/* Contenido */}
      <div className="relative z-10">
        {/* Botón de cierre */}
        
        {/* Mensaje principal */}
        <div className="text-center py-8 px-4">
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Te gustaría esta función en tu App?
          </h3>
          <p className="text-white text-lg mb-6">
            Si deseas agregar esta característica a la App comunícate con soporte
          </p>
          <a 
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            Contactar Soporte
          </a>
        </div>
        
        {/* Footer */}
        <div className="text-center text-white text-opacity-80 text-sm mt-4">
          Desarrollado por <span className="font-semibold">GRODEVAI TECHNOLOGY</span>
        </div>
      </div>
    </div>
  );
};

export default AddFeature;