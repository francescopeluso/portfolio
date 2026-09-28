type SocialCardProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SocialCard({ eyebrow, title, description }: SocialCardProps) {
  return (
    <div
      style={{
        alignItems: "stretch",
        background: "#232322",
        color: "#eeece3",
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundImage: "radial-gradient(#77756f 1.25px, transparent 1.25px)",
          backgroundSize: "13px 13px",
          borderRight: "1px solid #4a4945",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "54px 48px",
          width: "29%",
        }}
      >
        <span style={{ fontFamily: "monospace", fontSize: 18, letterSpacing: 1.5 }}>
          francesco peluso
        </span>
        <svg aria-hidden="true" height="118" viewBox="0 0 64 64" width="118">
          <path
            d="M32 2C35 20 41 27 62 32C41 37 35 44 32 62C29 44 23 37 2 32C23 27 29 20 32 2Z"
            fill="#eeece3"
          />
        </svg>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 70px 62px",
          width: "71%",
        }}
      >
        <span
          style={{
            color: "#aaa79e",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontFamily: "serif", fontSize: title.length > 34 ? 64 : 78, lineHeight: 0.98 }}>
            {title}
          </div>
          <div style={{ color: "#bbb8ae", fontFamily: "monospace", fontSize: 22, lineHeight: 1.45, maxWidth: 710 }}>
            {description}
          </div>
        </div>
        <span style={{ fontFamily: "monospace", fontSize: 17, letterSpacing: 1 }}>
          artificial intelligence · software engineering
        </span>
      </div>
    </div>
  );
}
