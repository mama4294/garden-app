import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { db } from "../../firebase";

type Props = {
  state: Planter;
};

const Save = ({ state }: Props) => {
  const { data: session } = useSession();

  const handleSave = async () => {
    const notification = toast.loading("Saving...");
    try {
      updateDoc(
        doc(db, "users", session?.user?.email!, "planters", state.id),
        state
      ).then(() => toast.success("Saved", { id: notification }));
    } catch (error) {
      toast.error("There was an error", { id: notification });
    }
  };

  return (
    <button onClick={handleSave} className="btn btn-sm btn-primary">
      Save
    </button>
  );
};

export default Save;
