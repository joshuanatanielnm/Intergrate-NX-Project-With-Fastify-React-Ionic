interface RestaurantProps {
  id: string;
  name: string;
  image: string;
  address: string;
  rating: number;
}

const restaurant:RestaurantProps[] = [
  {
    id: 'first place',
    image: '/assets/image.jpg',
    rating: Math.random(),
    name: 'MCD Juanda',
    address:
      'Jl. Raya Pabean No.6, Dabean, Pabean, Kec. Sedati, Kabupaten Sidoarjo, Jawa Timur 61253',
  },
  {
    id: 'second place',
    image: '/assets/image.jpg',
    rating: Math.random(),
    name: 'KFC Pondok Candra',
    address:
      'Jl. Raya Pabean No.6, Dabean, Pabean, Kec. Sedati, Kabupaten Sidoarjo, Jawa Timur 61253',
  },
  {
    id: 'third place',
    image: '/assets/image.jpg',
    rating: Math.random(),
    name: 'Primarasa',
    address:
      'Jl. Raya Pabean No.6, Dabean, Pabean, Kec. Sedati, Kabupaten Sidoarjo, Jawa Timur 61253',
  },
];

export const getAllRestaurant = () => restaurant;
export const getRestaurant = (id:string) => restaurant.find((restaurant) => restaurant.id === id);
