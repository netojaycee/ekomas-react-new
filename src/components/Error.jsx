import { Link } from "react-router-dom";

const Error = () => {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "16px" }}>Oops!</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
        Page Not Found
      </p>
      <div>
        <Link
          to="/"
          style={{
            padding: "12px 24px",
            background: "purple",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontSize: "1.2rem",
          }}
        >
          Visit Our Homepage
        </Link>
      </div>
    </article>
  );
};

export default Error;
