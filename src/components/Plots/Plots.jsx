import { Mixed, ROC, Ks, Feature } from "../Charts";

const Plots = ({ crop }) => {
  return crop ? (
    <>
      <Feature crop={crop} />
      <Ks crop={crop} />
      <ROC crop={crop} />
      <Mixed crop={crop} />
    </>
  ) : <>Sem Safra</>
};




// const Plots = ({ crop }) => {
//   return (
//     <>
//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 col-span-2"> */}

//       {crop ? (
//         <Feature crop={crop} />
//         <Ks crop={crop} />
//         <ROC crop={crop} />
//         <Mixed crop={crop} />
//       ): null
//       }


//       {/* </div> */}
//       {/* <ConfusionPlot safra={valuekey} /> */}
//     </>
//   );
// };

export default Plots;
