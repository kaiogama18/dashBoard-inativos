import { Card } from ".."
import CountUp from "react-countup";
import Skeleton from "@material-ui/lab/Skeleton";

export default ({ children, crop, title }) => {
  return (
    <Card>
      <p className="title">
        {title ? title : <Skeleton width={200} animation="wave" />}
      </p>
      <p className="subtitle">
        Safra: <CountUp start={0} end={crop} duration={1} />
      </p>
      <br />
      {children}
    </Card>
  );
};
