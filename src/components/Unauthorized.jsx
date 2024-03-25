import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "16px", color: "#FF6347" }}>
        Unauthorized
      </h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
        You do not have access to the requested page.
      </p>
      <div>
        <button
          onClick={goBack}
          style={{
            padding: "12px 24px",
            background: "purple",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;
