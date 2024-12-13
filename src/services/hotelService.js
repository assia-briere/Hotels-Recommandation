import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Adresse de l'API Flask

// Fonction pour obtenir les hôtels filtrés
export const getHotels = async (hotelClass, locality) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotels`, {
      params: {
        hotel_class: hotelClass,
        locality: locality,
      },
    });
    return response.data; // Retourne les données JSON
  } catch (error) {
    console.error('Erreur lors de la récupération des hôtels:', error);
    throw error;
  }
};
