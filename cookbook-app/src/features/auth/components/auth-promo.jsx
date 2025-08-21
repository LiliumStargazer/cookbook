export default function AuthPromo({ title, description, titleClassName, descriptionClassName }) {
  return (
    <div style={{ maxWidth: 1000, padding: '48px 32px 48px 64px' }}>
      <h1
        className={titleClassName}
        style={{ fontWeight: 700, fontSize: '2.5rem', marginBottom: 32 }}
      >
        {title}
      </h1>
      <p
        className={descriptionClassName}
        style={{ fontSize: '1.3rem', color: '#fff', lineHeight: 1.6, marginBottom: 0 }}
      >
        {description}
      </p>
    </div>
  );
}
