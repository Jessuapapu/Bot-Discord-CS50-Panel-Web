import { useState } from "react";
import type { OfficeInformacion } from "../../../interfaces/OfficesData";

interface QuickEditFormProps {
  office: OfficeInformacion;
  onSave: (updatedOffice: OfficeInformacion) => void;
}

export default function FormEditOffices({ office, onSave }: QuickEditFormProps) {
  const [formData, setFormData] = useState({
    bloque: office.bloque,
    canal: office.canal,
    staff: office.staff.join(", "), // Convertimos array a string para editar fácil
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...office,
      bloque: formData.bloque,
      canal: formData.canal,
      staff: formData.staff.split(",").map((s) => s.trim()).filter((s) => s !== ""),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Bloque</label>
          <input
            type="text"
            value={formData.bloque}
            onChange={(e) => setFormData({ ...formData, bloque: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Canal</label>
          <input
            type="text"
            value={formData.canal}
            onChange={(e) => setFormData({ ...formData, canal: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Staff (separado por comas)</label>
        <textarea
          value={formData.staff}
          onChange={(e) => setFormData({ ...formData, staff: e.target.value })}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors h-24 resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase py-3 rounded-lg transition-all"
      >
        Guardar Cambios Rápidos
      </button>
    </form>
  );
}