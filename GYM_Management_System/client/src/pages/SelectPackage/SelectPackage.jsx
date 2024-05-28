import { useNavigate } from 'react-router-dom';

function SelectPackage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: "url('Images/background1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Package Types
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px", // Space between the two cards
          }}
        >
          <div
            style={{
              width: "300px",
              height: "450px",
              backgroundColor: "rgba(211, 211, 211, 0.7)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h5
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Promotional Packages
            </h5>
            <p
              style={{
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              Jumpstart your fitness goals with our special offer: a customized
              4-week plan plus full access to all classes and facilities at a
              promotional rate. Perfect for beginners!
            </p>
            <button
              onClick={() => navigate('/promotion')}
              style={{
                padding: "10px 30px",
                backgroundColor: "white",
                color: "black",
                borderRadius: "5px",
                alignSelf: "center",
              }}
            >
              Buy Now
            </button>
          </div>

          <div
            style={{
              width: "300px",
              height: "450px",
              backgroundColor: "rgba(211, 211, 211, 0.7)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h5
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Standard Packages
            </h5>
            <p
              style={{
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              Embrace a holistic fitness journey with unlimited access to gym
              facilities, group classes, and personalized workouts. Ideal for
              those committed to regular fitness routines.
            </p>
            <button
              onClick={() => navigate('/standard')}
              style={{
                padding: "10px 30px",
                backgroundColor: "white",
                color: "black",
                borderRadius: "5px",
                alignSelf: "center",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectPackage;
