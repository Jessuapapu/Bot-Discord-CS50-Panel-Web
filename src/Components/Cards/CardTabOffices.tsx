import { useState } from "react";
import { Link } from "react-router-dom";
import EstudiantesTable from "../Tables/EstudiantesTable";
import StaffTable from "../Tables/StaffTable";
import FormEditOffices from "../Forms/FormEditRapidoOffices";// Importamos el nuevo form
import type { OfficesEstudiantes, OfficeInformacion } from "../../../interfaces/OfficesData";

const Icons = {
  General: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  Lista: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Editar: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  External: () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
};

interface Props {
  office: OfficeInformacion;
  estudiantes?: OfficesEstudiantes;
}

export default function CardTabsOffices({ office, estudiantes }: Props) {
  const [selectedTab, setSelectedTab] = useState("general");

  const handleQuickSave = (data: OfficeInformacion) => {
    console.log("Datos a guardar:", data);
    // Aquí iría tu lógica de mutación/Update
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-10 px-4">
      {/* Tabs */}
      <div className="flex border-b border-zinc-800 mb-6">
        {["general", "lista", "editar"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${
              selectedTab === tab
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="min-h-[350px]">
          {selectedTab === "general" && (
            <StaffTable Id={office.Id} staff={office.staff} bloque={office.bloque} canal={office.canal} />
          )}

          {selectedTab === "lista" && estudiantes && (
            <EstudiantesTable Id={estudiantes.Id} Usuarios={estudiantes.Usuarios} />
          )}

          {selectedTab === "editar" && (
            <FormEditOffices office={office} onSave={handleQuickSave} />
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-zinc-900/30 border-t border-zinc-800 p-4 flex justify-between items-center">
          <span className="text-[10px] text-zinc-600 font-mono uppercase">ID: {office.Id}</span>
          <Link
            to={"/offices/" + office.Id}
            className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors group"
          >
            VER DETALLES COMPLETOS
            <Icons.External />
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-500"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}