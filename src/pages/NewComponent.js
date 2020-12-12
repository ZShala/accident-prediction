import React, { useEffect, useState } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import Footer from '../components/Footer/Footer';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiemFuYXNoYWxhIiwiYSI6ImNraHplc3V3dTBlbjAzMG10OGZ1YXZldncifQ.KyOo6uy1Cu6Hfs6qZimxXg',
});
const NewComponent = () => {
  const [data, setData] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 42.650806,
    longitude: 21.140663,
    width: '100vw',
    height: '90vh',
    zoom: 8
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
      <Map
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: '95vh',
          width: '100vw',
        }}
        center={[21.140663, 42.650806]}
      >
        {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer> */}
        {data && data.map((point, index) => {
          console.log('point.location.coordinates[1]', point.location.coordinates[1])
          return (
          <Marker
            key={index}
            // coordinates={[point.location.coordinates[0], point.location.coordinates[1]]}
            coordinates={[point.location.coordinates[0], point.location.coordinates[1]]}
            anchor="bottom"
          >
            <img style={{width: '30px'}} src='https://img.freepik.com/free-vector/location_53876-25530.jpg?size=338&ext=jpg'/>
          </Marker>
        )})}
      </Map>
      <Footer clicked={() => (this.props.history.push('/mapsPage'))} arrow='&#8964;'> SHIKO HARTAT TJERA </Footer>
    </div>
  );
}

export default NewComponent;
