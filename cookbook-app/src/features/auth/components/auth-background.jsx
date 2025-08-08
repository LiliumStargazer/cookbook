import React from "react";

export default function AuthBackground({ children, className = "" }) {
    return (
        <div
            className={`min-vh-100 vw-100 ${className}`}
            style={{
                background: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
                backgroundImage: 'url(/src/assets/food-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(0px)',
            }}
        >
            <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", justifyContent: "center" }}>
                {children}
            </div>
        </div>
    );
}
