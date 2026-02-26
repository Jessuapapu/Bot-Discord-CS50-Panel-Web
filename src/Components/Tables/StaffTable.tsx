import { useState } from "react";
import type { OfficeInformacion } from "../../../interfaces/OfficesData";

const getStaffImage = (staff: string) => {
    return `https://code-fu.net.ni/wp-content/uploads/2025/07/${staff}-001.webp`;
};

export default function StaffTable({ Id, staff, bloque, canal }: OfficeInformacion) {
    const [staffList] = useState(staff);

    return (
        <div className="w-full bg-black border border-zinc-800 rounded-b-xl shadow-2xl overflow-hidden">
            
            {/* Sistema de Información de Oficina - Compacto y Refinado */}
            <div className="grid grid-cols-1 md:grid-cols-3 bg-zinc-900/10 border-b border-zinc-800">
                <div className="flex flex-col items-center justify-center p-4 border-r border-zinc-800/50">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">Office ID</span>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        <h3 className="text-lg font-black text-white tracking-tight">#{Id}</h3>
                    </div>
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 border-r border-zinc-800/50">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">Bloque</span>
                    <span className="text-sm font-bold text-zinc-300">{bloque}</span>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">Canal</span>
                    <span className="text-sm font-bold text-zinc-300">CH- {canal}</span>
                </div>
            </div>

            {/* Tabla de Staff - Escala Profesional */}
            <div className="p-4 sm:p-5">
                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-zinc-600">
                                <th className="pb-2 text-center text-[9px] uppercase font-black tracking-widest w-16">Pos.</th>
                                <th className="pb-2 text-left text-[9px] uppercase font-black tracking-widest px-6">Personnel</th>
                                <th className="pb-2 text-center text-[9px] uppercase font-black tracking-widest">Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffList.length > 0 ? (
                                staffList.map((nombre, index) => (
                                    <tr key={index} className="group bg-zinc-900/20 hover:bg-zinc-800/40 transition-all duration-300">
                                        {/* Numeración */}
                                        <td className="py-3 text-center rounded-l-lg border-y border-l border-zinc-800/40 group-hover:border-zinc-700">
                                            <span className="text-xl font-black text-zinc-700 group-hover:text-zinc-500 transition-colors italic">
                                                {(index + 1).toString().padStart(2, '0')}
                                            </span>
                                        </td>
                                        
                                        {/* Nombre */}
                                        <td className="py-3 px-6 border-y border-zinc-800/40 group-hover:border-zinc-700">
                                            <div className="flex flex-col">
                                                <span className="text-base font-bold text-zinc-200 tracking-tight group-hover:text-white transition-colors">
                                                    {nombre}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Imagen Balanceada */}
                                        <td className="py-3 text-center rounded-r-lg border-y border-r border-zinc-800/40 group-hover:border-zinc-700">
                                            <div className="flex justify-center">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-10 transition-all duration-500"></div>
                                                    <img
                                                        src={getStaffImage(nombre)}
                                                        alt={nombre}
                                                        className="relative w-14 h-14 rounded-xl object-cover border border-zinc-800 group-hover:border-blue-500/50 transition-all duration-300 shadow-lg"
                                                        onError={(e) => {
                                                            e.currentTarget.onerror = null;
                                                            e.currentTarget.src = `https://code-fu.net.ni/wp-content/uploads/2024/01/${nombre}-001.webp`;
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="py-12 text-center bg-zinc-900/5 rounded-xl border border-dashed border-zinc-800">
                                        <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest">Registry Empty</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer de Estado - Minimalista */}
            <div className="py-3 px-6 bg-zinc-900/30 border-t border-zinc-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500/80"></span>
                    </span>
                    <span className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">Secured Node</span>
                </div>
                <span className="text-[8px] text-zinc-700 font-bold uppercase tracking-widest">
                    Office Assets: {staffList.length}
                </span>
            </div>
        </div>
    );
}