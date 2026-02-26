import { useEffect, useState } from "react";
import CardTabsOffices from "../Components/Cards/CardTabOffices";
import type { OfficesEstudiantes, OfficeInformacion } from "../../interfaces/OfficesData";

const UrlApi = import.meta.env.VITE_URL_API;

export default function Index() {
  const [estudiantes, setEstudiantes] = useState<Record<string, OfficesEstudiantes>>({});
  const [offices, setOffices] = useState<Record<string, OfficeInformacion>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resEst, resOff] = await Promise.all([
          fetch(`${UrlApi}/offices/activas/estudiantes`),
          fetch(`${UrlApi}/offices/activas/informacion`)
        ]);
        
        const dataEst = await resEst.json();
        const dataOff = await resOff.json();

        setEstudiantes(dataEst);
        setOffices(dataOff);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-10 px-4 gap-10">
      {!loading ? (
        Object.keys(offices).map((key) => (
          <CardTabsOffices
            key={key}
            office={offices[key]}
            estudiantes={estudiantes[key]} 
          />
        ))
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="w-10 h-10 border-4 border-zinc-900 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}