export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1200px] mx-auto my-0 px-[32px] py-3">{children}</div>
  );
}
