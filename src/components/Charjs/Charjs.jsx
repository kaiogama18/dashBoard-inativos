import FeaturePlot from './Chart/FeaturePlot/featurePlot';
import KsPlot from '../ksPlot';
import ROCcurves from '../ROCcurves';
import MixedChart from '../MixedChart';

const Charjs = ({ crop }) => {
  return (
    <>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 col-span-2"> */}
      <FeaturePlot crop={crop} />
      <KsPlot crop={crop} />
      <ROCcurves crop={crop} />
      <MixedChart crop={crop} />
      {/* </div> */}
      {/* <ConfusionPlot safra={valuekey} /> */}
    </>
  );
};

export default Charjs;
