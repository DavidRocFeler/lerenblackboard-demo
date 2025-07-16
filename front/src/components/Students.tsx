import React, { useState, useEffect } from 'react';
import { Download, Check, ClipboardList, Printer } from 'lucide-react';
import StudentProfile from './StudentProfile';

const Students = () => {
  const [activeTab, setActiveTab] = useState<'status' | 'control'>('status');
  const [copies, setCopies] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [paymentStatus, setPaymentStatus] = useState<Record<string, boolean>>({});
  const [currentDatePeru, setCurrentDatePeru] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);


  const students = [
    { id: 'student-1', name: 'Valentina A.' },
    { id: 'student-2', name: 'Alessca' },
    { id: 'student-3', name: 'Rafaella' },
    { id: 'student-4', name: 'Denzel' },
    { id: 'student-5', name: 'Austin' },
    { id: 'student-6', name: 'Mateo' },
    { id: 'student-7', name: 'Anthuan' },
    { id: 'student-8', name: 'Dominic' },
    { id: 'student-9', name: 'Alex' },
    { id: 'student-10', name: 'Alessandro' },
    { id: 'student-11', name: 'Enzo' },
    { id: 'student-12', name: 'Luz Valentina' },
    { id: 'student-13', name: 'Bianca' },
    { id: 'student-14', name: 'Valeria' },
    { id: 'student-15', name: 'Thiago' },
    { id: 'student-16', name: 'Eva' },
    { id: 'student-17', name: 'Angeles' },
    { id: 'student-18', name: 'Jhesta' },
    { id: 'student-19', name: 'Evelyn' },
    { id: 'student-20', name: 'Génesis' },
    { id: 'student-21', name: 'Jick' },
    { id: 'student-22', name: 'Valentina R.' },
    { id: 'student-23', name: 'Dylan' },
    { id: 'student-24', name: 'Hyrum' },
    { id: 'student-25', name: 'Carlos' }
  ];

  // Función para obtener y actualizar la fecha actual en horario de Perú (UTC-5)
  const updatePeruDate = () => {
    const now = new Date();
    // Ajustar a UTC-5 (horario de Perú)
    const peruOffset = -5 * 60 * 60 * 1000;
    const peruTime = new Date(now.getTime() + peruOffset);
    
    const year = peruTime.getUTCFullYear();
    const month = (peruTime.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = peruTime.getUTCDate().toString().padStart(2, '0');
    setCurrentDatePeru(`${year}-${month}-${day}`);
  };

  // Función para formatear la fecha como MM/DD
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
  };

  // Actualizar la fecha al cargar y cada día
  useEffect(() => {
    updatePeruDate();
    // Configurar intervalo para actualizar a medianoche (hora Perú)
    const midnightPeru = new Date();
    midnightPeru.setUTCHours(5, 0, 0, 0); // 00:00 hora Perú (UTC-5)
    if (new Date() > midnightPeru) {
      midnightPeru.setUTCDate(midnightPeru.getUTCDate() + 1);
    }
    const timeUntilMidnight = midnightPeru.getTime() - new Date().getTime();
    
    const timer = setTimeout(() => {
      updatePeruDate();
      // Ahora actualizar cada 24 horas
      setInterval(updatePeruDate, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  const togglePaymentStatus = (studentId: string) => {
    setPaymentStatus(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handleCopyChange = (studentId: string, value: string) => {
    setCopies(prev => ({
      ...prev,
      [studentId]: parseInt(value) || 0
    }));
  };

  const handleNoteChange = (studentId: string, value: string) => {
    setNotes(prev => ({
      ...prev,
      [studentId]: value
    }));
  };

  const toggleAttendance = (studentId: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handleStudentClick = (studentId: string) => {
    setSelectedStudent(studentId);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
  };

  if (selectedStudent) {
    return (
      <StudentProfile 
        studentId={selectedStudent} 
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div>
      <div className="border-0 shadow-lg rounded-lg bg-white">
        <div className="p-6">
          <div className="flex flex-col md:items-center justify-start md:justify-between">
            <div className='mr-auto w-full flex'>
              <h2 className="text-xl font-bold text-blue-900">
                Gestión de Alumnos
              </h2>
              <button className='ml-auto cursor-pointer py-1 px-2 rounded-lg bg-blue-600 text-white'> Guardar </button>             
            </div>
            <div className="flex gap-2 mt-5 ml-auto w-full">
              <button 
                onClick={() => setActiveTab('status')}
                className={`cursor-pointer px-3 py-1 rounded-md text-sm ${
                  activeTab === 'status' 
                    ? 'bg-blue-600 text-white' 
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Estado de Pagos
              </button>
              <button 
                onClick={() => setActiveTab('control')}
                className={`cursor-pointer px-3 py-1 rounded-md text-sm ${
                  activeTab === 'control' 
                    ? 'bg-blue-600 text-white' 
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Control Diario
              </button>
              <button className="cursor-pointer border border-gray-300 hover:bg-gray-50 px-3 py-1 rounded-md text-sm flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0">
          {activeTab === 'status' ? (
            <div className="border rounded-lg overflow-hidden">
              <div className="w-full overflow-x-auto">
                <div className="min-w-max">
                  <div className="grid grid-cols-12 gap-2 font-medium text-sm text-gray-500 p-2 bg-gray-50">
                    <div className="col-span-6">Alumno</div>
                    <div className="col-span-3 text-center">Fecha</div>
                    <div className="col-span-3 text-center">Estado</div>
                  </div>
                  
                  {students.map((student) => (
                    <div key={student.id} className="grid grid-cols-12 gap-2 items-center p-2 border-t hover:bg-gray-50">
                      <div 
                        className="col-span-6 font-medium cursor-pointer hover:text-blue-600"
                        onClick={() => handleStudentClick(student.id)}
                      >
                        {student.name}
                      </div>
                      
                      <div className="col-span-3 flex justify-center">
                        <span className="text-[1rem] text-black">
                          {formatDate(currentDatePeru)}
                        </span>
                      </div>
                      
                      <div className="col-span-3 flex justify-center">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                            paymentStatus[student.id]
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                          onClick={() => togglePaymentStatus(student.id)}
                        >
                          {paymentStatus[student.id] ? "Pagado" : "Pendiente"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="w-[100%] sm:w-full overflow-x-auto">
                  <div className="min-w-max">
                    <div className="grid grid-cols-12 gap-2 font-medium text-sm text-gray-500 p-2 bg-gray-50">
                      <div className="col-span-3">Alumno</div>
                      <div className="col-span-2 text-center">Fecha</div>
                      <div className="col-span-2 text-center">Asistencia</div>
                      <div className="col-span-3 text-center">Copias Entregadas</div>
                      <div className="col-span-2">Anotaciones</div>
                    </div>
                    
                    {students.map((student) => (
                      <div key={student.id} className="grid grid-cols-12 gap-2 items-center p-2 border-t hover:bg-gray-50">
                        <div 
                          className="col-span-3 font-medium cursor-pointer hover:text-blue-600"
                          onClick={() => handleStudentClick(student.id)}
                        >
                          {student.name}
                        </div>
                        
                        <div className="col-span-2 flex justify-center">
                          <span className="text-[1rem] text-black">
                            {formatDate(currentDatePeru)}
                          </span>
                        </div>
                        
                        <div className="col-span-2 flex justify-center">
                          <button
                            onClick={() => toggleAttendance(student.id)}
                            className={`h-8 w-8 p-0 rounded-full flex items-center justify-center ${
                              attendance[student.id] 
                                ? 'bg-blue-600 text-white' 
                                : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="col-span-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={copies[student.id] || ''}
                              onChange={(e) => handleCopyChange(student.id, e.target.value)}
                              className="h-8 w-20 border border-gray-300 rounded-md px-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0"
                            />
                            <Printer className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        
                        <div className="col-span-2">
                          <div className="relative">
                            <textarea
                              value={notes[student.id] || ''}
                              onChange={(e) => handleNoteChange(student.id, e.target.value)}
                              placeholder="Observaciones"
                              className="h-8 min-h-[32px] text-sm border border-gray-300 rounded-md px-2 py-1 w-full focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ClipboardList className="absolute right-2 top-1 h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;


