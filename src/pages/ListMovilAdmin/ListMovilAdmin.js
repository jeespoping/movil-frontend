import React, { useEffect, useState } from "react";
import { getMoviles } from "../../api/movil";
import "./ListMovilAdmin.scss";
import { Loader, Pagination } from "semantic-ui-react";
import { map, size } from "lodash";
import { MovilItem } from "../../components/Movil";

export default function ListMovilAdmin() {
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

  if (!moviles) return <Loader active inline="centered" />;
  if (size(moviles) === 0) return "No hay ningun movil";

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  return (
    <div className="list-moviles">
      {map(moviles, (movil) => (
        <MovilItem key={movil.id} movil={movil} />
      ))}

      <div className="list-moviles__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
