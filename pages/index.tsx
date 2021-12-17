import Head from 'next/head'
import Image from 'next/image'
import { DefaultLayout } from '../layouts/default'
import { Map } from '../components/map';
import styles from '../styles/Home.module.css'
import { GetStaticProps } from 'next';

export default function Home({ apiKey }) {
  return (
    <DefaultLayout>
      <Head>
        <title>ATM Locations</title>
        <meta name="description" content="Locations of ATMs near you" />
      </Head>
      <Map apiKey={apiKey}></Map>
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  }
}
