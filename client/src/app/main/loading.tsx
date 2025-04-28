import "./loading-styles.css";

export default function loading() {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="loader"></div>
    </div>
  );
}
