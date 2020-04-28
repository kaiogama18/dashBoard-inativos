import { CropPicker, Navbar, ResultCrop, Plots, Layout } from '../components';
import React from 'react';


class Index extends React.Component {
  state = {
    crop: '',
  };

  handleCropChange = async (crop) => {
    this.setState({
      crop: crop,
    });
  };

  render() {
    const { crop } = this.state;
    return (
      <Layout>
        <div className="home">
          <Navbar />
          <div className="card-grid">
            <CropPicker handleCropChange={this.handleCropChange} />
            <ResultCrop crop={crop} />
            <Plots crop={crop} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Index;

