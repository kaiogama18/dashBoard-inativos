import { Card } from ".."
import CountUp from "react-countup";

export default ({ children, crop, title }) => {
  return (
    <Card>
      <p className="title">
        {crop ? <>{title}</> : <>Carregando...</>}
      </p>
      <p className="subtitle">
        Safra: <CountUp start={0} end={crop} duration={1} />
      </p>
      <br />
      {children}
    </Card>
  );
};
