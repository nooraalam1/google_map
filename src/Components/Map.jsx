import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '100vh',
};

const defaultCenter = {
    lat: 23.8103,
    lng: 90.4125,
};

const generateRandomMarkers = (numMarkers) => {
    const markers = [];
    const latMin = 23.7;
    const latMax = 23.9;
    const lngMin = 90.35;
    const lngMax = 90.45;

    for (let i = 0; i < numMarkers; i++) {
        const lat = Math.random() * (latMax - latMin) + latMin;
        const lng = Math.random() * (lngMax - lngMin) + lngMin;
        markers.push({ id: i, lat, lng, name: `Place ${i + 1}`, status: i % 2 === 0 ? 'Online' : 'Offline', rating: Math.floor(Math.random() * 5) + 1, address: `Address of Place ${i + 1}` });
    }
    return markers;
};

const randomMarkers = generateRandomMarkers(50);

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'YOUR_GOOGLE_MAP_API_KEY',
    });

    const [map, setMap] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const handleMyLocation = () => {
        setLoading(true);
        setError(null);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const userLocation = { lat: latitude, lng: longitude };
                    setCurrentLocation(userLocation);
                    map.panTo(userLocation);
                    map.setZoom(14);
                    setLoading(false);
                },
                (error) => {
                    console.error("Error fetching user's location:", error);
                    setLoading(false);
                    setError('Failed to get your location. Please allow location access.');
                }
            );
        } else {
            setLoading(false);
            setError('Geolocation is not supported by this browser.');
        }
    };

    const handleMarkerClick = (marker) => {
        setActiveMarker(marker);
    };

    return isLoaded ? (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {currentLocation && (
                    <Marker
                        position={currentLocation}
                        title="You are here"
                        icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                            scaledSize: new window.google.maps.Size(40, 40),
                        }}
                    />
                )}

                {randomMarkers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        title={`Marker ID: ${marker.id}`}
                        onClick={() => handleMarkerClick(marker)}
                        icon={{
                            url: 'https://img.icons8.com/ios/452/marker.png', // Custom marker icon
                            scaledSize: new window.google.maps.Size(40, 40),
                        }}
                    />
                ))}

                {activeMarker && (
                    <InfoWindow
                        position={{
                            lat: activeMarker.lat,
                            lng: activeMarker.lng,
                        }}
                        onCloseClick={() => setActiveMarker(null)}
                    >
                        <div className="info-window" style={infoWindowStyle}>
                            <h3 style={infoWindowTitleStyle}>{activeMarker.name}</h3>
                            <p style={infoWindowTextStyle}>Status: <span style={statusStyle(activeMarker.status)}>{activeMarker.status}</span></p>
                            <p style={infoWindowTextStyle}>Rating: {activeMarker.rating} / 5</p>
                            <p style={infoWindowTextStyle}>Address: {activeMarker.address}</p>
                            <button
                                onClick={() => alert('Viewing ratings...')}
                                style={viewRatingsButtonStyle}
                            >
                                View Ratings
                            </button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>

            <button
                onClick={handleMyLocation}
                style={myLocationButtonStyle}
            >
                {loading ? 'Finding Location...' : 'My Location'}
            </button>

            {error && (
                <div style={errorMessageStyle}>
                    {error}
                </div>
            )}
        </div>
    ) : (
        <div style={loadingMessageStyle}>Loading...</div>
    );
};

// Styling for the InfoWindow, Buttons, and Error
const infoWindowStyle = {
    width: '200px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
};

const infoWindowTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
};

const infoWindowTextStyle = {
    fontSize: '14px',
    color: '#555',
    margin: '5px 0',
};

const statusStyle = (status) => ({
    color: status === 'Online' ? 'green' : 'red',
    fontWeight: 'bold',
});

const viewRatingsButtonStyle = {
    marginTop: '10px',
    padding: '8px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
};

const myLocationButtonStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};

const errorMessageStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    padding: '12px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
};

const loadingMessageStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#007bff',
};

export default Map;
