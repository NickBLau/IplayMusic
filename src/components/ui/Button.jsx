export default function Button({ title, color }) {
  return (
    <button
      type="submit"
      className={`uppercase p-5 my-6 rounded-full border-4 font-bold tracking-wide bg-white block w-full ${color}`}
    >
      {title}
    </button>
  );
}
