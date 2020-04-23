import FeaturePlot from '../featurePlot';
import KsPlot from '../ksPlot';
import ROCcurves from '../ROCcurves';
import MixedChart from '../MixedChart';
import ConfusionPlot from '../confusionPlot';

const Charjs = ({ valuekey }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 col-span-2">
        <FeaturePlot safra={valuekey} />
        <KsPlot safra={valuekey} />
        <ROCcurves safra={valuekey} />
        <MixedChart safra={valuekey} />
      </div>
      <ConfusionPlot safra={valuekey} />
    </>
  );
};

export default Charjs;
