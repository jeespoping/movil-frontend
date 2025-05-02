import React, { useState } from "react";
import { Button, Confirm, Icon, Image } from "semantic-ui-react";
import "./MovilItem.scss";
import { deleteMovil } from "../../../api/movil";
import { toast } from "react-toastify";

export function MovilItem({ movil, onReload }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      setLoading(true);

      const response = await deleteMovil(movil._id);

      if (response) {
        toast.success("Eliminado correctamente");
      }

      onReload();

      onOpenCloseConfirm();

      setLoading(false);
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
          <Button
            loading={loading}
            icon
            as="a"
            href={`/movil/${movil.url}`}
            target="_blank"
          >
            <Icon name="eye" />
          </Button>
          <Button
            loading={loading}
            icon
            color="red"
            onClick={onOpenCloseConfirm}
          >
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
