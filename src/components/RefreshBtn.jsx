import { RotateCw } from "lucide-react";

export default function RefreshBtn(props) {
  return (
    <button>
      <RotateCw
        className={props.isLoading ? "animate-spin" : ""}
        onClick={() => props.refresh()}
        disabled={props.isLoading}
      />
    </button>
  );
}
