import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '100vh',
};

// Default center: Dhaka, Bangladesh
const defaultCenter = {
    lat: 23.8103,
    lng: 90.4125,
};

// Function to generate random latitude and longitude near Dhaka
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

const randomMarkers = generateRandomMarkers(50); // Generate 50 random markers

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'Key', // Replace with your API key
    });

    const [map, setMap] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null); // For tracking the active marker

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    // Fetch user's current location
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
            {/* Map Container */}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* Marker for the user's location */}
                {currentLocation && (
                    <Marker
                        position={currentLocation}
                        title="You are here"
                        icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        }}
                    />
                )}

                {/* Random markers around Dhaka */}
                {randomMarkers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        title={`Marker ID: ${marker.id}`}
                        onClick={() => handleMarkerClick(marker)} // Handle click to show info
                    />
                ))}

                {/* InfoWindow for the active marker */}
                {activeMarker && (
                    <InfoWindow
                        position={{
                            lat: activeMarker.lat,
                            lng: activeMarker.lng,
                        }}
                        onCloseClick={() => setActiveMarker(null)} // Close info on clicking the close button
                    >
                        <div>
                            <h3>{activeMarker.name}</h3>
                            <p>Status: {activeMarker.status}</p>
                            <p>Rating: {activeMarker.rating} / 5</p>
                            <p>Address: {activeMarker.address}</p>
                            <button
                                onClick={() => alert('Viewing ratings...')} // Add custom functionality for viewing ratings
                                style={{ backgroundColor: '#007bff', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '5px' }}
                            >
                                View Ratings
                            </button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>

            {/* My Location Button */}
            <button
                onClick={handleMyLocation}
                style={{
                    position: 'absolute',
                    top: '400px',
                    left: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    zIndex: 1000,
                    fontSize: '16px',
                    fontWeight: 'bold',
                }}
            >
                {loading ? 'Finding Location...' : 'My Location'}
            </button>

            {/* Error or Loading Message */}
            {error && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        padding: '10px',
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        borderRadius: '5px',
                        fontSize: '14px',
                    }}
                >
                    {error}
                </div>
            )}
        </div>
    ) : (
        <div>Loading...</div> // Fallback content while the map loads
    );
};

export default Map;
