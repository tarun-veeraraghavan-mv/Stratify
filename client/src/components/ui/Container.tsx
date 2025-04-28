export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1200px] mx-auto my-5 px-[32px]">{children}</div>
  );
}
