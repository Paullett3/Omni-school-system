/**
 * COMPONENT: StudentCard
 * HUMAN NOTE: This uses a "Card" layout which is better for mobile 
 * than a wide table that gets cut off.
 */
import { User, GraduationCap, Trash2 } from 'lucide-react';

const StudentCard = ({ student, onDelete }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        {/* Profile Avatar Placeholder */}
        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
          <User size={24} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-slate-800 text-lg">{student.name}</h3>
          <p className="text-sm text-slate-500 flex items-center">
            <GraduationCap size={14} className="mr-1" /> Class: {student.room}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => onDelete(student.id)}
          className="text-red-400 hover:text-red-600 p-2 transition-colors"
          title="Delete Student"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      {/* Human Touch: A quick "Status" badge */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
          Active
        </span>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default StudentCard;