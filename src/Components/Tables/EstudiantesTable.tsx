import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import type { OfficesEstudiantes } from "../../../interfaces/OfficesData";

const UrlApi = import.meta.env.VITE_URL_API;
const socket = io(UrlApi, { transports: ["websocket"] });

export default function EstudiantesTable({ Id, Usuarios }: OfficesEstudiantes) {
  const [usuarios, setUsuarios] = useState(Usuarios);

  useEffect(() => {
    const handleUpdate = (data: OfficesEstudiantes) => {
      if (data.Id === Id) setUsuarios(data.Usuarios);
    };
    socket.on("ActualizarTabla", handleUpdate);
    return () => { socket.off("ActualizarTabla", handleUpdate); };
  }, [Id]);

  return (
    <div className="w-full bg-zinc-950">
      <div className="max-h-[650px] overflow-y-auto custom-scrollbar border-t border-zinc-900">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-zinc-950 z-20 shadow-[0_1px_0_0_rgba(39,39,42,1)]">
            <tr>
              <th className="py-4 px-4 text-center text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] w-16">#</th>
              <th className="py-4 px-6 text-left text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Estudiante</th>
              <th className="py-4 px-4 text-center text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Discord ID</th>
              <th className="py-4 px-4 text-center text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Tiempo</th>
              <th className="py-4 px-4 text-center text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Cumplimiento</th>
              <th className="py-4 px-4 text-center text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Grupo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/50">
            {usuarios.length > 0 ? (
              usuarios.map((estudiante, index) => {
                const cumplimiento = Number(estudiante.cumplimientoReal ?? 0);
                const isHigh = cumplimiento >= 0.5;

                return (
                  <tr key={index} className="hover:bg-zinc-900/30 transition-colors group">
                    <td className="py-3 px-4 text-center">
                      <span className="text-zinc-600 font-mono text-[11px] font-bold">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </td>

                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <img
                            className="h-8 w-8 rounded-full object-cover border border-zinc-800 group-hover:border-blue-500/50 transition-all"
                            src={estudiante.avatar || `https://ui-avatars.com/api/?name=${estudiante.IdUsuario}&background=18181b&color=fff`}
                            alt={estudiante.IdUsuario}
                          />
                          <span className={`absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full border-2 border-zinc-950 ${isHigh ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        </div>
                        <span className="text-zinc-300 font-bold text-xs tracking-tight group-hover:text-white transition-colors">
                          {estudiante.IdUsuario}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/30 px-2 py-0.5 rounded border border-zinc-800/50">
                        {estudiante.IdDiscord || "---"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-baseline gap-1">
                        <span className="text-zinc-300 font-bold text-xs">{estudiante.TiempoTotal ?? 0}</span>
                        <span className="text-[9px] text-zinc-600 font-black uppercase">min</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-col items-center min-w-[80px]">
                        <span className={`text-[10px] font-black mb-1 ${isHigh ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {cumplimiento}%
                        </span>
                        <div className="w-12 h-1 bg-zinc-900 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-700 ${isHigh ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                            style={{ width: `${Math.min(cumplimiento, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="text-[9px] font-black text-blue-500 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10 uppercase tracking-tighter">
                        {estudiante.grupo || "S/G"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-24 text-center">
                  <p className="text-zinc-700 font-black uppercase tracking-[0.4em] text-[10px]">
                    No active connections detected
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer interno de la tabla para estadísticas rápidas */}
      <div className="px-6 py-3 border-t border-zinc-900 bg-zinc-950/50 flex justify-between items-center">
        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
          Total Session Capacity: <span className="text-zinc-400">{usuarios.length} / 50</span>
        </p>
        <div className="flex gap-4">
             <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[8px] text-zinc-500 font-bold uppercase">Optimal</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <span className="text-[8px] text-zinc-500 font-bold uppercase">Warning</span>
             </div>
        </div>
      </div>
    </div>
  );
}