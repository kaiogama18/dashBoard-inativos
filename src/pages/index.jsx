import { CropPicker, Navbar, ResultCrop, Plots, Layout } from '../components';
import React from 'react';
import nextCookie from "next-cookies";
import { withAuthSync } from "../utils/auth";
import { Router } from "next/router";

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

// export default Index;
Index.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
  // console.log("ajuste::: " + token)
};
export default withAuthSync(Index);

