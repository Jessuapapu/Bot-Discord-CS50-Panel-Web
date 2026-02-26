import type { Estudiante } from "./EstudianteData";
// Definimos la estructura esperada de los datos (ajústalo según tu modelo real)
export interface OfficeData {
    Id: string;
    staff: string[];
    Usuarios: Estudiante[];
    bloque: string;
    canal: string;
    Estado: number
}

export interface OfficesEstudiantes{
    Id: string;
    Usuarios: Estudiante[];
}


export interface OfficeInformacion {
    Id: string;
    staff: string[];
    bloque: string;
    canal: string;
}
