import { useState, useEffect, useRef } from 'react'
import ReactDOMServer from 'react-dom/server'

type MapMarkerProps = google.maps.MarkerOptions & {
  id: string
  infoWindow?: google.maps.InfoWindow
}

// https://stackoverflow.com/a/55457810/5253897
function InfoWindowContent({ id, title }: { id: string; title: string }) {
  return (
    <>
      <h1 className="text-lg font-bold mb-1">{title}</h1>
      <a
        href={`https://goo.gl/maps/${id}`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 visited:text-purple-700"
      >
        Open in Google Maps
      </a>
    </>
  )
}

export const MapMarker = ({ id, infoWindow, ...options }: MapMarkerProps) => {
  const [marker] = useState(new google.maps.Marker())
  const listener = useRef<google.maps.MapsEventListener>()
  
  useEffect(() => {
    return () => {
      // remove marker
      marker.setMap(null)
    }
  }, [marker])
  
  useEffect(() => {
    if (!!infoWindow?.get('map')) {
      // infoWindow is open
      // https://stackoverflow.com/a/12410385/5253897
      infoWindow.close();
    }
    if (marker && infoWindow && (id || options.title)) {
      // https://developers.google.com/maps/documentation/javascript/markers#accessible
      listener.current = marker.addListener('click', () => {
        infoWindow?.close()
        infoWindow?.setContent(
          ReactDOMServer.renderToString(
            InfoWindowContent({ id, title: options.title }),
          ),
        )
        infoWindow?.open(marker.getMap(), marker)
      })
    }

    return () => {
      listener.current?.remove();
    }
  }, [marker, infoWindow, id, options.title])

  useEffect(() => {
    if (marker) {
      marker.setOptions(options)
    }
  }, [marker, options])

  return null
}
