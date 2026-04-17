import React from "react";

interface Props {
  onCallDoctor: () => void;
  onVideoCall: () => void;
}

const DoctorActions: React.FC<Props> = ({
  onCallDoctor,
  onVideoCall,
}) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={onCallDoctor}
        className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Call Doctor
      </button>

      <button
        onClick={onVideoCall}
        className="flex-1 bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
      >
        Video Call
      </button>
    </div>
  );
};

export default DoctorActions;
