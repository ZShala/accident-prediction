import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './App.css';
import * as mapboxgl from 'mapbox-gl';


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
      center: [0, 0],
      zoom: 1
    })
  }

  render() {

    return (

      <Layout>
        <Switch>
          <Route path="/" exact render={() => (<div style={{ width: "100%", height: "100vh" }} ref={this.mapRef}></div>)}  />
        </Switch>
      </Layout>
    );
  }
}

export default App;
