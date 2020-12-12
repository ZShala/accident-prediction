import React, { useEffect } from 'react';
// import useSwr from "swr";
import { Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from 'react-palm/tasks';
import { Provider, useDispatch } from "react-redux";
import { addDataToMap } from "kepler.gl/actions";
import KeplerGl from "kepler.gl";
import KeplerGlMap from "./components/KeplerGlMap/Map"

import Layout from './components/Layout/Layout';
import './App.css';
import * as mapboxgl from 'mapbox-gl';
import Maps from '../src/components/Maps/Maps';
import NewComponent from './pages/NewComponent';
import MainMap from './pages/MainMap';

const customizedKeplerGlReducer = keplerGlReducer
  .initialState({
    uiState: {
      // hide side panel to disallow user customize the map
      readOnly: true,

      // customize which map control button to show
      // mapControls: {
      //   visibleLayers: {
      //     show: false
      //   },
        // mapLegend: {
        //   show: true,
        //   active: true
        // },
        // splitMap: {
        //   show: false
        // }
      // }
    }
  });

const reducers = combineReducers({
  keplerGl: customizedKeplerGlReducer
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

const App = () => {
    return (
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route path="/" exact component={KeplerGlMap} />
            <Route path="/mapsPage" component={Maps} />
          </Switch>
        </Layout>
      </Provider>
    );
}

export default withRouter(App);