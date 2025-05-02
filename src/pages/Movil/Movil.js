import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovil } from "../../api/movil";
import { HeaderMovil } from "../../components/Movil";

export default function Movil() {
  const [movil, setMovil] = useState(null);
  const { url } = useParams();

  useEffect(() => {
    (async () => {
      const response = await getMovil(url);
      setMovil(response);
    })();
  }, [url]);

  if (!movil) return null;

  return (
    <>
      <HeaderMovil movil={movil} />
    </>
  );
}
