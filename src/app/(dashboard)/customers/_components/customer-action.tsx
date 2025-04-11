import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  data: Customer;
}

const CustomerActions = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["promotion"],
    mutationFn: (email: string) =>
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/superadmin/verifier/roleChange`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      ).then((res) => res.json()),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      console.log(data);
      if (!data.success) {
        toast.error(data.message ?? "Failed to promote as verifier", {
          richColors: true,
        });
        return;
      }

      // handle Success
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Promoted Successfull", {
        richColors: true,
        position: "top-right",
        description: data.message,
      });
    },
    onError: (err) => {
      toast.error(err.message, {
        richColors: true,
      });
    },
  });

  return (
    <>
      <AlertDialog open={open} onOpenChange={(p) => setOpen(p)}>
        <AlertDialogTrigger asChild>
          <Button size="sm">Promote</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to promote this user?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will grant the user verifier privileges. Once
              promoted, the user will have additional responsibilities and
              access rights.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={() => mutate(data.email)} disabled={isPending}>
              Promote
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CustomerActions;
