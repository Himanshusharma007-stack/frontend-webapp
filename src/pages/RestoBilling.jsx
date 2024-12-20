import RestoMenu from "./RestoMenu";
import BillingDialog from "../components/BillingDialog";

export default function RestoBilling(props) {
  return (
    <>
      <div className="flex flex-row-reverse">
        <BillingDialog />
      </div>
      <RestoMenu disableHeading={true} restaurantId={props?.restaurantId} />
    </>
  );
}
