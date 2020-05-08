import { CropPicker, Navbar, ResultCrop, Plots, Layout } from '../components';
import React from 'react';
import nextCookie from "next-cookies";
import { withAuthSync } from "../utils/auth";
import PropTypes from 'prop-types'

class Index extends React.Component {
  static pageTransitionDelayEnter = true

  state = {
    crop: '',
    loaded: false,
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
        <div className="home bg-gray-200">
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

// export default Index

Index.propTypes = {
  pageTransitionReadyToEnter: PropTypes.func,
}

Index.defaultProps = {
  pageTransitionReadyToEnter: () => { },
}

Index.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
};
export default withAuthSync(Index);

