import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { io } from "socket.io-client";

// Componentes
import StaffTable from "../Components/Tables/StaffTable";
import EstudiantesTable from "../Components/Tables/EstudiantesTable";

// Interfaces
import type { OfficeData } from "../../interfaces/OfficesData";
import type { Estudiante } from "../../interfaces/EstudianteData";

const UrlApi = import.meta.env.VITE_URL_API;
const socket = io(UrlApi, { transports: ["websocket"] });

export default function OfficeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [office, setOffice] = useState<OfficeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Modales y Estados de formulario
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStudent, setNewStudent] = useState<Partial<Estudiante>>({
    IdUsuario: "",
    IdDiscord: "",
    grupo: "",
  });

  useEffect(() => {
    if (!id) return;
    fetch(`${UrlApi}/offices/get/${id}`)
      .then((res) => res.json())
      .then((data: OfficeData) => {
        setOffice(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    socket.on("ActualizarOficina", (data: OfficeData) => {
      if (data.Id === id) setOffice(data);
    });

    return () => { socket.off("ActualizarOficina"); };
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-zinc-500 text-xs font-medium tracking-widest uppercase">Cargando datos...</span>
    </div>
  );

  if (!office) return <div className="text-zinc-400 p-20 text-center">Oficina no encontrada.</div>;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans antialiased">
      
      {/* --- NAVEGACIÓN / HEADER --- */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/offices" className="text-zinc-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-white tracking-tight">
                Offices<span className="text-zinc-500 font-normal"> / </span>{office.Id}
              </h1>
              <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Panel de Gestión</p>
            </div>
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors">Cancelar</button>
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-zinc-200 transition-all">Guardar Cambios</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg text-xs font-semibold hover:bg-zinc-800 transition-all">Editar Información</button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* --- COLUMNA IZQUIERDA: CONFIGURACIÓN --- */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Card: Detalles Técnicos */}
          <section className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-6 shadow-sm">
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              Detalles de Offices
            </h2>
            <div className="space-y-5">
              <div className="group">
                <label className="text-[10px] font-bold text-zinc-600 uppercase mb-1.5 block">Bloque</label>
                {isEditing ? (
                  <input className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none transition-all" value={office.bloque} onChange={(e) => setOffice({...office, bloque: e.target.value})} />
                ) : (
                  <p className="text-lg font-medium text-zinc-200">{office.bloque}</p>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-600 uppercase mb-1.5 block">Canal</label>
                {isEditing ? (
                  <input className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none transition-all" value={office.canal} onChange={(e) => setOffice({...office, canal: e.target.value})} />
                ) : (
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Channel {office.canal}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Card: Staff Asignado */}
          <section>
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Personal de Staff</h2>
              <button onClick={() => setShowStaffModal(true)} className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-tighter">
                + Añadir Staff
              </button>
            </div>
            <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-xl overflow-hidden shadow-sm">
              <StaffTable Id={office.Id} staff={office.staff} bloque={office.bloque} canal={office.canal} />
            </div>
          </section>
        </aside>

        {/* --- COLUMNA DERECHA: TABLA PRINCIPAL --- */}
        <section className="lg:col-span-8">
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl overflow-hidden shadow-md">
            <div className="p-6 border-b border-zinc-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/20">
              <div>
                <h2 className="text-lg font-semibold text-white">Registro de Estudiantes</h2>
                <p className="text-xs text-zinc-500">Listado oficial de usuarios vinculados a este nodo de red.</p>
              </div>
              <button onClick={() => setShowStudentModal(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-blue-600/10">
                Matricular Estudiante
              </button>
            </div>
            <div className="p-1">
              <EstudiantesTable Id={office.Id} Usuarios={office.Usuarios} />
            </div>
          </div>
        </section>
      </main>

      {/* --- MODAL (SIMPLIFICADO) --- */}
      {showStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-1">Añadir Staff</h3>
            <p className="text-xs text-zinc-500 mb-6">El usuario tendrá permisos de gestión en este bloque.</p>
            <input 
              autoFocus
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm mb-6 outline-none focus:ring-2 ring-blue-500/20 transition-all text-zinc-200"
              placeholder="Nombre completo"
              value={newStaffName}
              onChange={(e) => setNewStaffName(e.target.value)}
            />
            <div className="flex gap-3">
              <button onClick={() => setShowStaffModal(false)} className="flex-1 py-2.5 text-xs font-semibold text-zinc-500 hover:text-zinc-300">Cancelar</button>
              <button onClick={() => setShowStaffModal(false)} className="flex-1 py-2.5 bg-white text-black rounded-lg text-xs font-bold hover:bg-zinc-200 transition-all">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}