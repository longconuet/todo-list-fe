function TodoStats({ totalTasks, completedTasks, unfinishedTasks }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
      <div className="p-4 rounded-lg shadow-md bg-blue-100">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-2xl">{totalTasks}</p>
      </div>
      <div className="p-4 rounded-lg shadow-md bg-green-100">
        <p className="text-lg font-semibold">Completed</p>
        <p className="text-2xl">{completedTasks}</p>
      </div>
      <div className="p-4 rounded-lg shadow-md bg-red-100">
        <p className="text-lg font-semibold">Unfinished</p>
        <p className="text-2xl">{unfinishedTasks}</p>
      </div>
    </div>
  );
}

export default TodoStats;
