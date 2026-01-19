interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
      <h2 className="text-red-800 font-semibold mb-2">
        ⚠️ 오류가 발생했습니다
      </h2>
      <p className="text-red-700">{message}</p>
    </div>
  );
}
