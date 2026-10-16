export default function Container({ className = "", children, as: Tag = "div" }) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
