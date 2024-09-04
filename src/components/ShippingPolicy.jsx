import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { X } from "lucide-react";

export default function ShippingPolicy() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="text" size="sm">
        Shipping Policy
      </Button>
      <Dialog open={open} handler={handleOpen} className="overflow-scroll">
        <DialogHeader className="flex justify-between items-center">
          Shipping Policy
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="rounded-full"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </Button>
        </DialogHeader>
        <DialogBody className="max-h-screen overflow-auto">
          <p>
            As this is a dine-in policy, there is no delivery option available.
          </p>
        </DialogBody>
      </Dialog>
    </>
  );
}
