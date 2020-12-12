import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
// import Footer from '../components/Footer/Footer';

const MainMap = () => {
  const [data, setData] = useState('');
  const [viewport, setViewport] = useState({
    mapStyle: 'mapbox://styles/mapbox/streets-v11',
    latitude: 42.650806,
    longitude: 21.140663,
    width: '100vw',
    height: '90vh',
    zoom: 8,
    minZoom: 7
  })

  useEffect(async () => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }

    const url = `http://localhost:5000/api/accident/getAccidents`;
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers
    });
    const res = await response.json();
    console.log('dataaaa', res)
    setData(res);
  }, [])

  return (
    <div>
      <ReactMapboxGl 
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1IjoiemFuYXNoYWxhIiwiYSI6ImNraHplc3V3dTBlbjAzMG10OGZ1YXZldncifQ.KyOo6uy1Cu6Hfs6qZimxXg"}
      >
        {/* {data && data.map((point, index) => {
          <Marker
            key={index}
            longitude={point.location.coordinates[0]}
            latitude={point.location.coordinates[1]}
          >

          </Marker>
        })} */}
      </ReactMapboxGl>
      {/* <Footer clicked={() => (this.props.history.push('/mapsPage'))} arrow='&#8964;'> SHIKO HARTAT TJERA </Footer> */}
    </div>
  )
};

export default MainMap;