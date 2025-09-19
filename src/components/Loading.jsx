const Loading = ({msg}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="text-center text-gray-500">
        {msg}
      </div>
    </div>
  );
};

export default Loading;
