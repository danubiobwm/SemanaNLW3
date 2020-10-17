import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import mapMarkerImg from "../images/map-marker.svg";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "../styles/pages/orphanages-map.css";
import MapIcon from "../Utils/MapIcon";

import api from "../services/api";


interface IOrphanage{
  id:number;
  latitude:number;
  longitude:number;
  name:string;
}


function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="local" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Juazeiro do Norte</strong>
          <span>Ceará</span>
        </footer>
      </aside>

      <Map
        center={[-7.1856939, -39.3504155]}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              position={[orphanage.latitude, orphanage.longitude]}
              icon={MapIcon}
              key={orphanage.id}
            >
              <Popup closeButton={false} minWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
