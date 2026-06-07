export default function InsuranceWidget({ onClose }) {
  const handleBuyInsurance = (plan) => {
    alert(`${plan} plan selected. Redirecting to checkout...`);
    // In a real app, this would redirect to a checkout page or open a modal
    console.log(`User selected ${plan} insurance plan`);
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(200,184,255,0.1) 0%, rgba(139,125,232,0.05) 100%)",
      border: "1px solid rgba(200,184,255,0.2)",
      borderRadius: "var(--radius)",
      padding: "24px",
      marginBottom: "20px",
      animation: "fadeUp 0.3s ease both"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #c8b8ff, #8b7de8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}>
          <svg viewBox="0 0 24 24" style={{ width: "20px", height: "20px", fill: "#0e0e11" }}>
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-primary)", margin: 0 }}>
            Insurance Protection
          </h3>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
            Secure your future today
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "20px",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s ease"
            }}
            onMouseEnter={(e) => { e.target.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.target.style.color = "var(--text-secondary)"; }}>
            ×
          </button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        {/* Basic Plan */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(200,184,255,0.1)",
          borderRadius: "var(--radius-sm)",
          padding: "14px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          _hover: { background: "rgba(200,184,255,0.08)" }
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(200,184,255,0.08)";
          e.currentTarget.style.borderColor = "rgba(200,184,255,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
          e.currentTarget.style.borderColor = "rgba(200,184,255,0.1)";
        }}>
          <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--accent)", margin: "0 0 6px 0" }}>
            Basic
          </p>
          <p style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 8px 0" }}>
            $9.99
          </p>
          <p style={{ fontSize: "11px", color: "var(--text-secondary)", margin: "0 0 10px 0" }}>
            per month
          </p>
          <button
            onClick={() => handleBuyInsurance("Basic")}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "rgba(200,184,255,0.15)",
              border: "1px solid rgba(200,184,255,0.3)",
              borderRadius: "6px",
              color: "var(--accent)",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(200,184,255,0.25)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(200,184,255,0.15)";
            }}>
            Learn More
          </button>
        </div>

        {/* Premium Plan */}
        <div style={{
          background: "rgba(200,184,255,0.08)",
          border: "1px solid rgba(200,184,255,0.3)",
          borderRadius: "var(--radius-sm)",
          padding: "14px",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(200,184,255,0.12)";
          e.currentTarget.style.borderColor = "rgba(200,184,255,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(200,184,255,0.08)";
          e.currentTarget.style.borderColor = "rgba(200,184,255,0.3)";
        }}>
          <div style={{
            position: "absolute",
            top: "-10px",
            right: "10px",
            background: "linear-gradient(135deg, #c8b8ff, #8b7de8)",
            color: "#0e0e11",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.05em"
          }}>
            POPULAR
          </div>
          <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--accent)", margin: "0 0 6px 0" }}>
            Premium
          </p>
          <p style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 8px 0" }}>
            $19.99
          </p>
          <p style={{ fontSize: "11px", color: "var(--text-secondary)", margin: "0 0 10px 0" }}>
            per month
          </p>
          <button
            onClick={() => handleBuyInsurance("Premium")}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "linear-gradient(135deg, #c8b8ff, #8b7de8)",
              border: "none",
              borderRadius: "6px",
              color: "#0e0e11",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 12px rgba(200,184,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}>
            Get Premium
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={() => console.log("View details")}
          style={{
            flex: 1,
            padding: "10px 16px",
            background: "transparent",
            border: "1px solid rgba(200,184,255,0.2)",
            borderRadius: "var(--radius-sm)",
            color: "var(--accent)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(200,184,255,0.08)";
            e.target.style.borderColor = "rgba(200,184,255,0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.borderColor = "rgba(200,184,255,0.2)";
          }}>
          View Details
        </button>
        <button
          onClick={() => console.log("Compare plans")}
          style={{
            flex: 1,
            padding: "10px 16px",
            background: "transparent",
            border: "1px solid rgba(200,184,255,0.2)",
            borderRadius: "var(--radius-sm)",
            color: "var(--accent)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(200,184,255,0.08)";
            e.target.style.borderColor = "rgba(200,184,255,0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.borderColor = "rgba(200,184,255,0.2)";
          }}>
          Compare Plans
        </button>
      </div>
    </div>
  );
}
