import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { GetStaticProps } from 'next'
import {
  useRef,
  useState,
  useEffect,
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
} from 'react'
import { MapMarker } from './map-marker'
import { ATM_LOCATIONS } from '../atm-locations';

export function Map({ apiKey }: { apiKey: string }) {
  const center = { lat: 40.6421968, lng: -112.010997 }
  const zoom = 11
  return (
    <Wrapper apiKey={apiKey} render={MapStatus}>
      <MapInner center={center} zoom={zoom}>
        {ATM_LOCATIONS.map(({ id, ...rest }, i) => (
          <MapMarker key={id} id={id} {...rest}></MapMarker>
        ))}
      </MapInner>
    </Wrapper>
  )
}

function MapInner({
  center,
  zoom,
  children,
}: {
  center: google.maps.LatLngLiteral
  zoom: number
  children: ReactNode
}) {
  const ref = useRef(null)
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new google.maps.Map(ref.current, { center, zoom, styles: [] }))
    }
  }, [ref, map, center, zoom])

  const infoWindow = useRef<google.maps.InfoWindow>(
    new google.maps.InfoWindow(),
  )

  return (
    <>
      <div ref={ref} className="w-full h-full" />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map, infoWindow: infoWindow.current })
        }
      })}
    </>
  )
}

function MapStatus(status: Status) {
  if (status === Status.LOADING) return <div>Loading...</div>
  if (status === Status.FAILURE)
    return <div>😞 There was an error - please try again</div>
  return null
}
