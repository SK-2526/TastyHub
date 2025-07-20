  // import { useEffect, useState } from 'react';
  // import RestaurantCard from './RestaurantCard';
  // import Shimmer from './Shimmer';

  // const Body = () => {
  //   // * React Hook -> A normal JavaScript function which is given to us by React (or) Normal JS utility functions
  //   // * useState() - Super Powerful variable
  //   // * useEffect() -

  //   // * State Variable - Super Powerful variable
  //   const [listOfRestaurants, setListOfRestaurants] = useState([]);
  //   const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  //   const [searchText, setSearchText] = useState('');

  //   // * Whenever a state variable updates or changes, react triggers a reconciliation cycle(re-renders the component)

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //     const data = await fetch(
  //   'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.624480699999999&page_type=DESKTOP_WEB_LISTING'
  // );
  //     const json = await data.json();

  //       const cards = json?.data?.cards;
  //   console.log("Cards:", cards);

  //   const possibleCard = cards?.find(
  //     (card) =>
  //       card?.card?.card?.gridElements?.infoWithStyle?.restaurants
  //   );

  //   const restaurants =
  //     possibleCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;

  //   console.log("✅ Extracted Restaurants:", restaurants);
  //     setListOfRestaurants(restaurants || []);
  //     setFilteredRestaurant(restaurants || []);
      

  //     // console.log("Restaurants List: ", restaurants);

  //     // * optional chaining
  //     // setListOfRestaurants(json.data.cards[2].data.data.cards);
    
  //   }; 

  //   // * Conditional Rendering
  //   // if (listOfRestaurants.length === 0) {
  //   //   return <Shimmer />;
  //   // }

  //   return listOfRestaurants.length === 0 ? (
  //     <Shimmer />
  //   ) : (
  //     <div className="body">
  //       {/* <div className="search-container">
  //         <input type="text" placeholder="Search Food or Restaurant" />
  //         <button>Search</button>
  //       </div> */}
  //       <div className="filter">
  //         <div className="search">
  //           <input
  //             type="text"
  //             placeholder="Search a restaurant you want..."
  //             className="searchBox"
  //             value={searchText}
  //             onChange={(e) => {
  //               setSearchText(e.target.value);
  //             }}
  //           />
  //           <button
  //             onClick={() => {
  //               // * Filter th restaurant cards and update the UI
  //               // * searchText
  //               console.log(searchText);

  //               const filteredRestaurant = listOfRestaurants.filter((res) =>
  //                 res.info.name.toLowerCase().includes(searchText.toLowerCase())
  //               );

  //               setFilteredRestaurant(filteredRestaurant);
  //             }}
  //           >
  //             Search
  //           </button>
  //         </div>
  //         <button
  //           className="filter-btn"
  //           onClick={() => {
  //             // * Filter logic
  //             const filteredList = listOfRestaurants.filter(
  //               (res) => res.info.avgRating > 4
  //             );

  //             setFilteredRestaurant(filteredList);
  //           }}
  //         >
  //           Top Rated Restaurants
  //         </button>
  //       </div>
  //       <div className="res-container">
  //         {/* // * looping through the <RestaurentCard /> components Using Array.map() method */}

  //         {filteredRestaurant.map((restaurant) => (
  //           <RestaurantCard key={restaurant.info.id} resData={restaurant} />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // export default Body;

  import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.624480699999999&page_type=DESKTOP_WEB_LISTING" //Real SWIGGY API  
      );
      const json = await response.json();

      const cards = json?.data?.cards;
      const restaurantDataCard = cards?.find(
        (card) =>
          card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const restaurants =
        restaurantDataCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      setListOfRestaurants(restaurants || []);
      setFilteredRestaurant(restaurants || []);
    } catch (err) {
      console.error("Failed to fetch Swiggy data", err);
    }
  };

  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filtered);
  };

  const handleTopRated = () => {
    const filtered = listOfRestaurants.filter(
      (res) => res.info.avgRating >= 4.2
    );
    setFilteredRestaurant(filtered);
  };

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search a restaurant you want..."
            className="searchBox"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <button className="filter-btn" onClick={handleTopRated}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container" style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard
            key={restaurant.info.id}
            resData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;

