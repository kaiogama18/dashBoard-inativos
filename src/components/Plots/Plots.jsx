import { Mixed, ROC, Ks, Feature, Confusion } from "../Charts";

const Plots = ({ crop }) => {
  return crop ? (
    <>
     <div className="grid grid-cols-3  overflow-hidden gap-4 col-span-3">

      {/* <Confusion crop={crop} /> */}
      <Feature crop={crop} />
      <Mixed crop={crop} />
      <Ks crop={crop} />
      <ROC crop={crop} />
      </div>
    </>
  ) : <div className="col-span-3 flex items-center justify-center p-5">
      <div className="flex items-center justify-center text-center flex-col">
        <img className="w-7/12" src="/noChartj.png" />
        <p className="title mt-5 text-gray-600">Por favor, selecione uma safra</p>
      </div>
    </div>
};

export default Plots;
