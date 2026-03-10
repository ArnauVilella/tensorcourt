import React from 'react';
import { Map, Marker } from 'pigeon-maps';

const InteractiveMap = ({ lat, lng }) => {
  return (
    <div className="h-full w-full">
      <Map defaultCenter={[lat, lng]} defaultZoom={13}>
        <Marker width={50} anchor={[lat, lng]} />
      </Map>
    </div>
  );
};

export default InteractiveMap;