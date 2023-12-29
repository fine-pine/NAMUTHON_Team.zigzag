export default function StatusChip({ status }) {
  switch (status) {
    case 0:
      return (
        <div className="px-3 rounded-full border-solid border-2 border-ornage-500">
          접수 대기
        </div>
      );
    case 1:
      return (
        <div className="px-3 rounded-full border-solid border-2 border-yellow-500">
          수거 대기
        </div>
      );
    case 2:
      return (
        <div className="px-3 rounded-full border-solid border-2 border-indigo-500">
          입금 대기
        </div>
      );
    case 3:
      return (
        <div className="px-3 rounded-full border-solid border-2 border-green-500">
          입금완료
        </div>
      );
  }
}
