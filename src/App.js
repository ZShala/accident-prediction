import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './App.css';
import * as mapboxgl from 'mapbox-gl';
import Maps from '../src/components/Maps/Maps';
import Footer from '../src/components/Footer/Footer';
import { withRouter } from "react-router-dom";


class App extends Component {
  constructor() {
    super()
    this.mapRef = React.createRef()
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiemFuYXNoYWxhIiwiYSI6ImNraHplc3V3dTBlbjAzMG10OGZ1YXZldncifQ.KyOo6uy1Cu6Hfs6qZimxXg';

    // create mapbox object
    new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [21, 42.6],
      zoom: 8,
      minZoom: 7
    })
  }


  render() {

    return (
      <Layout>
        <Switch>
          <Route path="/" exact render={() => (<div style={{ width: "100%", height: "100vh", position: "absolute", left: "0", right: "0", top: "0", bottom: "0" }} ref={this.mapRef} >
            <Footer clicked={() => (this.props.history.push('/mapsPage'))} arrow='&#8964;'> SHIKO HARTAT TJERA </Footer>
          </div>)}
          />

          <Route path="/mapsPage" component={Maps} />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
