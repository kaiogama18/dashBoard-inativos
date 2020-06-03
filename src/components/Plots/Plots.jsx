import { Mixed, ROC, Ks, Feature, Confusion } from "../Charts";

const Plots = ({ crop }) => {
  return crop ? (
    <>
      <Feature crop={crop} />
      <Ks crop={crop} />
      <ROC crop={crop} />
      <Mixed crop={crop} />
      {/* <Confusion crop={crop} /> */}

      {/* <div class="grid grid-rows-3 col-span-3 grid-flow-col gap-4 bg-red-400">

        <div class="grid   col-span-2 grid-flow-col gap-4 bg-red-600">
          12312
      </div>

        <div class="grid col-span-3 grid-flow-col gap-4">
          12312
      </div>
       
        {/* <div class="row-span-1 col-span-2 bg-red-400">12312</div>
        <div class="row-span-2 col-span-2 bg-red-300">12333</div>
        <div class="row-span-3 bg-red-500">3213</div>
        
        </div> */}


    </>
  ) : <div className=" col-span-3  flex items-center justify-center p-5">
      <div className="flex items-center justify-center text-center flex-col">
        <img className="w-7/12" src="/noChartj.png" />
        <p className="title mt-5 text-gray-600">Por favor, selecione uma safra</p>
      </div>
    </div>
};

export default Plots;
