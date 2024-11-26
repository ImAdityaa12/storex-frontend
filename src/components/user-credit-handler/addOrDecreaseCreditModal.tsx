import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalClose,
} from "../ui/responsive-dialog";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { DialogTitle } from "../ui/dialog";

const CreditChangeModal = ({
  id,
  action,
  handleCreditChange,
}: {
  id: string;
  action: "add" | "minus";
  handleCreditChange: (
    id: string,
    credit: number,
    action?: "add" | "minus"
  ) => void;
}) => {
  const [credit, setCredit] = useState<number>(0);
  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button variant="outline" className="p-2">
          {action === "add" ? <Plus size={14} /> : <Minus size={14} />}
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <DialogTitle>
            {action === "add" ? "Increase" : "Decrease"} Credit
          </DialogTitle>
        </ResponsiveModalHeader>
        <Input type="number" onChange={(e) => setCredit(+e.target.value)} />
        <ResponsiveModalClose
          className="w-fit ml-auto bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2"
          onClick={() => {
            handleCreditChange(id, credit, action);
          }}
        >
          {action === "add" ? "Increase" : "Decrease"}
        </ResponsiveModalClose>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default CreditChangeModal;
