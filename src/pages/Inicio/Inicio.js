import React, { useEffect, useState } from "react";
import { Container, Loader } from "semantic-ui-react";
import { getMoviles } from "../../api/movil";
import { size } from "lodash";
import "./Inicio.scss";
import { ListMoviles } from "../../components/Movil";

export default function Inicio() {
  const [moviles, setMoviles] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  useEffect(() => {
    (async () => {
      const response = await getMoviles();
      setMoviles(response.docs);
      setPagination({
        limit: response.limit,
        page: response.page,
        pages: response.pages,
        total: response.total,
      });
    })();
  }, [page]);

  return (
    <div className="inicio">
      {!moviles && <Loader active>Cargando moviles</Loader>}
      {moviles && size(moviles) === 0 && (
        <div>
          <h3>No hay Moviles</h3>
        </div>
      )}
      {size(moviles) > 0 && (
        <ListMoviles
          moviles={moviles}
          pagination={pagination}
          setPage={setPage}
        />
      )}
    </div>
  );
}
