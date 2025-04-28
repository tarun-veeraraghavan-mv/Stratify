import Link from "next/link";

export default function Navbar() {
  return (
    <div className="px-[32px] py-[18px]  flex justify-between border-b-2 bg-blue-100 border-gray-300">
      <p className="font-bold text-2xl">Stratify</p>
      <ul className="flex gap-5">
        <li className="text-lg text-gray-500 font-bold hover:text-blue-700">
          <Link href="/main/courses">Courses</Link>
        </li>
        <li className="text-lg text-gray-500 font-bold hover:text-blue-700">
          <Link href="/main/todos">Todos</Link>
        </li>
        <li className="text-lg text-gray-500 font-bold hover:text-blue-700">
          <Link href="/main/achievements">Achievements</Link>
        </li>
        <li className="text-lg text-gray-500 font-bold hover:text-blue-700">
          <Link href="/main/contacts">Contacts</Link>
        </li>
      </ul>
    </div>
  );
}
