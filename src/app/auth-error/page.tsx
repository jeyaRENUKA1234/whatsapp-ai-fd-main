export default function AuthErrorPage({ searchParams }: any) {
  const error = searchParams?.error ?? "Unknown error";

  return (
    <div style={{ padding: "60px", textAlign: "center", color: "white" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Authentication Error
      </h1>

      <p style={{ fontSize: "18px", opacity: 0.8 }}>
        Something went wrong during Google Login.
      </p>

      <p style={{ marginTop: "20px" }}>
        <strong>Error:</strong> {error}
      </p>

      <a
        href="/"
        style={{
          marginTop: "30px",
          display: "inline-block",
          padding: "12px 20px",
          background: "#4285F4",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Go Back
      </a>
    </div>
  );
}
