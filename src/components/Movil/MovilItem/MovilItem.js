import React, { useState } from "react";
import { Button, Confirm, Icon, Image } from "semantic-ui-react";
import "./MovilItem.scss";

export function MovilItem({ movil }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      console.log("Eliminando");

      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="movil-item">
        <div className="movil-item__info">
          <Image
            src={`${process.env.REACT_APP_BASE_PATH}/${movil.miniature}`}
          />
          <div>
            <p>{movil.title}</p>
          </div>
        </div>
        <div>
          <Button icon as="a" href={movil.url} target="_blank">
            <Icon name="eye" />
          </Button>
          <Button icon color="red" onClick={onOpenCloseConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>
      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`Eliminar el movil ${movil.title}`}
        size="mini"
      />
    </>
  );
}
