import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateProjectForm from "./CreateProjectForm";

const CardForm = () => {
  return (
    <DialogContent className="sm:max-w-[425px] p-8">
      <DialogHeader className="mb-3">
        <DialogTitle>ESの情報を登録します</DialogTitle>
      </DialogHeader>
      <div className="w-full">
        <CreateProjectForm />
      </div>
    </DialogContent>
  );
};

export default CardForm;
