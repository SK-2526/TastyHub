
const RestaurantCard = ({ resData }) => {
  if (!resData?.info) return null;

  const {
    name,
    cuisines,
    cloudinaryImageId,
    avgRating,
    costForTwo,
    sla,
  } = resData.info;

  const IMG_CDN = "https://media-assets.swiggy.com/swiggy/image/upload/";

  const imageUrl = cloudinaryImageId
    ? `${IMG_CDN}${cloudinaryImageId}`
    : "https://via.placeholder.com/264x288?text=Image+Unavailable";

  return (
    <div
      className="res-card"
      style={{
        backgroundColor: "#f0f0f0",
        width: "250px",
        padding: "10px",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
      <img
        className="res-logo"
        src={imageUrl}
        alt={name}
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://via.placeholder.com/264x288?text=Image+Unavailable";
        }}
      />
      <div className="res-card-content">
        <h3>{name}</h3>
        <p>{cuisines?.join(", ")}</p>
        <p>⭐ {avgRating}</p>
        <p>₹{costForTwo / 100} FOR TWO</p>
        <p>{sla?.deliveryTime} minutes</p>
      </div>
    </div>
  );
};

export default RestaurantCard;

