import { useState, useEffect, type FormEvent } from "react";
import type { Estudiante } from "../../../interfaces/EstudianteData"; 

interface EstudianteModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Estudiante | null;
  onSave: (updatedUser: Estudiante) => void;
}

export default function EstudianteModal({ isOpen, onClose, user, onSave }: EstudianteModalProps) {
  // Estado local para manejar los inputs sin afectar la tabla principal hasta guardar
  const [formData, setFormData] = useState<Estudiante | null>(null);

  // Cada vez que se abre el modal o cambia el usuario, actualizamos el estado local
  useEffect(() => {
    if (user) {
      setFormData({ ...user }); // Copia superficial para edición
    }
  }, [user, isOpen]);

  if (!isOpen || !formData) return null;

  const handleInputChange = (key: keyof Estudiante, value: string | number) => {
    setFormData((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-in fade-in duration-200">
      <form
        className="bg-gray-800 text-white rounded-xl shadow-2xl p-6 w-full max-w-2xl border border-gray-700"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Editar {formData.IdUsuario}</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) => {
            // Lógica original para filtrar campos que no se deben editar o son objetos/avatar
            if (key === "avatar" || typeof value === "object") return null;

            return (
              <div key={key}>
                <label className="block text-xs uppercase text-gray-400 mb-1">{key}</label>
                <input
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={value}
                  onChange={(e) => handleInputChange(key as keyof Estudiante, e.target.value)}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded transition-colors font-medium"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}