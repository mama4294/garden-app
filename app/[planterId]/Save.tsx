import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";

type Props = {
  state: Planter;
};

const Save = ({ state }: Props) => {
  const { data: session } = useSession();

  const handleSave = async () => {
    addDoc(
      collection(db, "users", session?.user?.email!, "planters", state.id),
      state
    );
  };

  return (
    <button onClick={handleSave} className="btn btn-sm btn-primary">
      Save
    </button>
  );
};

export default Save;
