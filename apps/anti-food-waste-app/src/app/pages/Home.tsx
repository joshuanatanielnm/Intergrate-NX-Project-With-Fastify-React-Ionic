import './Home.css';

import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { Message, getMessages } from '../data/messages';
import React, { useEffect, useState } from 'react';

import MessageListItem from '../components/MessageListItem';
import RestaurantCard from '../components/RestaurantCard';

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [state, setState] = useState([{
    id: 'first place',
    image: '/assets/image.jpg',
    rating: Math.random(),
    name: 'MCD Juanda',
    address:
      'Jl. Raya Pabean No.6, Dabean, Pabean, Kec. Sedati, Kabupaten Sidoarjo, Jawa Timur 61253',
  }]);

  useEffect(() => {
    const restaurant = async () => {
      const response = await fetch('/api/restaurants');
      const restaurants = await response.json();

      setState(restaurants);
    };

    restaurant();
  }, []);


  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>

        <h1>Anti Food Waste</h1>

        {state.map((v) => {
          return <RestaurantCard key={v.id} data={v} />;
        })}
      </IonContent>
    </IonPage>
  );
};

export default Home;
