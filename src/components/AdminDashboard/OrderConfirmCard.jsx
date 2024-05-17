import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListDots, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default function OrderConfirmCard({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <FontAwesomeIcon
        icon={faPencilAlt}
        onClick={handleOpen}
        style={{ color: "red" }}
      />
      <Dialog open={open} handler={handleOpen}>
        <DialogBody>{data} </DialogBody>
      </Dialog>
    </>
  );
}
