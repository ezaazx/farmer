import { FaHeart, FaComment } from 'react-icons/fa';

export default function PostCard({ userId, imageUrl, diagnosis }) {
  return (
    <div className="bg-gray-200 rounded-xl p-4 my-4 shadow-md w-full max-w-md mx-auto">
      <h3 className="font-semibold mb-2">User {userId}</h3>
      <img src={imageUrl} alt="Plant" className="w-full h-48 object-cover rounded-md mb-2" />
      <p className="text-sm text-gray-700">{diagnosis}</p>
      <div className="flex space-x-4 text-gray-600 mt-2">
        <FaHeart className="hover:text-red-500 cursor-pointer" />
        <FaComment className="hover:text-blue-500 cursor-pointer" />
      </div>
    </div>
  );
}
