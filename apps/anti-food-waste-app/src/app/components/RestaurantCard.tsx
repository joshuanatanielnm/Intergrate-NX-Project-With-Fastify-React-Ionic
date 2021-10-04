import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
} from '@ionic/react';

interface RestaurantProps {
  id: string;
  name: string;
  image: string;
  address: string;
  rating: number;
}

interface RestaurantCardProps {
  data: RestaurantProps;
}

const RestaurantCard = (props: RestaurantCardProps) => {
  return (
    <IonItem routerLink={`/restaurant/${props.data.id}`}>
      <IonCard>
        <img src={props.data.image} alt={props.data.id} />
        <IonCardHeader>
          <IonCardSubtitle>{props.data.rating}</IonCardSubtitle>
          <IonCardTitle>{props.data.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>{props.data.address}</IonCardContent>
      </IonCard>
    </IonItem>
  );
};

export default RestaurantCard;
