import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';

import RestaurantCard from '../components/RestaurantCard'

const ViewRestaurant = (props:any) => {
  const [state, setState] = useState({
    id: 'first place',
    image: '/assets/image.jpg',
    rating: Math.random(),
    name: 'MCD Juanda',
    address:
      'Jl. Raya Pabean No.6, Dabean, Pabean, Kec. Sedati, Kabupaten Sidoarjo, Jawa Timur 61253',
  });

  useEffect(() => {
    const restaurant = async () => {
      const response = await fetch(`/api/restaurants/${props.match.params.id}`);
      const restaurants = await response.json();

      setState(restaurants);
    };

    restaurant();
  }, [props]);


  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Inbox" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>


      <IonContent fullscreen>
        <RestaurantCard data={state}/>
      </IonContent>
    </IonPage>
  )
}

export default ViewRestaurant
