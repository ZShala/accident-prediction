import React, { useState, useEffect } from "react";
import KeplerGl from "kepler.gl";
import { useDispatch } from "react-redux";
import { addDataToMap } from "kepler.gl/actions";

import classes from './Map.module.scss'; 
import useSwr from "swr";

const Map = () => {
  const dispatch = useDispatch();

  const { data } = useSwr("accidents", async () => {
    const response = await fetch(
      "http://localhost:5000/api/accident/accidentsJSON"
    );
    const data = await response.json();
    console.log('data', data)
    return data;
  })

  useEffect(() => {
    if (data) {
      dispatch(addDataToMap({
        // datasets
        datasets: {
          info: {
            label: 'Aksidentet ne Kosove',
            id: 'kosovo_accidents'
          },
          data
        },
        // option
        option: {
          centerMap: true,
          readOnly: false
        },
        info: {
          title: 'Aksidentet ne Kosove',
          description: 'Harta e te gjitha aksidenteve ne Kosove'
        },
        // config
        config: {
          // mapStyle: {styleType: 'light'}
          
        }
      }))
    }
  }, [data])

  return (
    <div className={classes.Map}>
      <KeplerGl
        id="accidents"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  )
}

export default Map;