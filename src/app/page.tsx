'use client'
import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Search, 
  Star, 
  CheckCircle, 
  CreditCard,
  Filter
} from 'lucide-react';

const hotels = [
  {
    id: 1,
    name: "Emerald Coast Resort",
    location: "Costa Rica",
    rating: 4.8,
    price: 450,
    features: ["Eco-Friendly", "Rainforest View", "Sustainability"],
    image: "/api/placeholder/400/250"
  },
  {
    id: 2,
    name: "Urban Oasis Hotel",
    location: "Barcelona",
    rating: 4.5,
    price: 350,
    features: ["Rooftop Garden", "Art Deco", "Local Experience"],
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    name: "Desert Bloom Retreat",
    location: "Morocco",
    rating: 4.7,
    price: 380,
    features: ["Traditional Design", "Wellness Spa", "Cultural Immersion"],
    image: "/api/placeholder/400/250"
  }
];

export default function HotelBookingPage() {
  const [searchParams, setSearchParams] = useState({
    hotelName: '',
    location: '',
    minRating: 0,
    hotelClass: ''
  });

  const [filteredHotels, setFilteredHotels] = useState(hotels);

  const handleSearchChange = (e:any) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    const filtered = hotels.filter(hotel => 
      (searchParams.hotelName === '' || hotel.name.toLowerCase().includes(searchParams.hotelName.toLowerCase())) &&
      (searchParams.location === '' || hotel.location.toLowerCase().includes(searchParams.location.toLowerCase())) &&
      (searchParams.minRating === 0 || hotel.rating >= searchParams.minRating)
    );
    setFilteredHotels(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-teal-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-8 h-8 mr-2"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.576.6 1.011 1.2l-8.067-8.067a1.125 1.125 0 00-1.59 0L4.902 12.504c.297-.49.814-1.128.957-1.272L12 5.432z" />
            </svg>
            WanderWise
          </div>
          <nav className="space-x-6">
            <a href="#" className="text-white hover:text-amber-200 transition">Destinations</a>
            <a href="#" className="text-white hover:text-amber-200 transition">Experiences</a>
            <a href="#" className="text-white hover:text-amber-200 transition">About</a>
            <a href="#" className="text-white hover:text-amber-200 transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-white text-center mb-8">
            Recherchez votre hôtel parfait
          </h1>
          
          <div className="bg-white rounded-xl shadow-2xl p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex items-center border-r pr-4">
                <MapPin className="text-emerald-600 mr-3" />
                <input 
                  type="text" 
                  name="hotelName"
                  placeholder="Nom de l'hôtel" 
                  value={searchParams.hotelName}
                  onChange={handleSearchChange}
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="flex items-center border-r pr-4">
                <MapPin className="text-emerald-600 mr-3" />
                <input 
                  type="text" 
                  name="location"
                  placeholder="Destination" 
                  value={searchParams.location}
                  onChange={handleSearchChange}
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="flex items-center border-r pr-4">
                <Star className="text-emerald-600 mr-3" />
                <select 
                  name="minRating"
                  value={searchParams.minRating}
                  onChange={handleSearchChange}
                  className="w-full focus:outline-none"
                >
                  <option value={0}>Toutes les notes</option>
                  <option value={3}>3+ étoiles</option>
                  <option value={4}>4+ étoiles</option>
                  <option value={4.5}>4.5+ étoiles</option>
                </select>
              </div>
              <div className="flex items-center">
                <Users className="text-emerald-600 mr-3" />
                <select className="w-full focus:outline-none">
                  <option>2 Voyageurs</option>
                  <option>1 Voyageur</option>
                  <option>3 Voyageurs</option>
                  <option>4 Voyageurs</option>
                </select>
              </div>
            </div>
            <button 
              onClick={applyFilters}
              className="w-full mt-4 bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition flex items-center justify-center"
            >
              <Search className="mr-2" /> Rechercher des hôtels
            </button>
          </div>
        </div>
      </div>

      {/* Featured Hotels */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-emerald-800">
          Expériences de voyage sélectionnées
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div 
              key={hotel.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl"
            >
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-emerald-800">{hotel.name}</h3>
                  <div className="flex items-center">
                    <Star className="text-amber-400 fill-amber-400 mr-1" />
                    <span className="text-emerald-700">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-teal-700 mb-4">
                  <MapPin className="mr-2 text-emerald-600" size={20} />
                  {hotel.location}
                </div>
                <div className="flex space-x-2 mb-4">
                  {hotel.features.map((feature) => (
                    <span 
                      key={feature} 
                      className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-emerald-700">
                    {hotel.price}€/nuit
                  </div>
                  <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reste du code inchangé */}
      {/* Why Choose Us */}
      <div className="bg-gradient-to-br from-teal-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-800">
            Pourquoi voyager avec WanderWise
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl text-center shadow-lg transform transition hover:scale-105">
              <CheckCircle className="mx-auto text-emerald-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3 text-emerald-800">Expériences uniques</h3>
              <p className="text-teal-700">
                Destinations soigneusement sélectionnées qui racontent une histoire et créent des souvenirs durables.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-lg transform transition hover:scale-105">
              <CreditCard className="mx-auto text-emerald-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3 text-emerald-800">Réservations sécurisées</h3>
              <p className="text-teal-700">
                Tarification transparente et transactions sécurisées pour une planification sans souci.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-lg transform transition hover:scale-105">
              <Users className="mx-auto text-emerald-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3 text-emerald-800">Support global</h3>
              <p className="text-teal-700">
                Support aux voyageurs 24/7 pour vous guider tout au long de votre voyage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-6 h-6 mr-2"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.576.6 1.011 1.2l-8.067-8.067a1.125 1.125 0 00-1.59 0L4.902 12.504c.297-.49.814-1.128.957-1.272L12 5.432z" />
                </svg>
                WanderWise
              </h4>
              <p className="text-teal-100">
                Connecter les voyageurs à des expériences extraordinaires à travers le monde.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Explorer</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-teal-200 hover:text-white">Destinations</a></li>
                <li><a href="#" className="text-teal-200 hover:text-white">Expériences</a></li>
                <li><a href="#" className="text-teal-200 hover:text-white">Guides de voyage</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-teal-200 hover:text-white">Centre d'aide</a></li>
                <li><a href="#" className="text-teal-200 hover:text-white">Nous contacter</a></li>
                <li><a href="#" className="text-teal-200 hover:text-white">Politique de confidentialité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connecter</h4>
              <p className="text-teal-200">
                Email: hello@wanderwise.com
                <br />
                Téléphone: +1 (555) 987-6543
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}