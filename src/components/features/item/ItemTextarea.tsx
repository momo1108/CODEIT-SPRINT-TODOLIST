import { UpdateTodoItemDto } from "@/app/types";

export function ItemTextarea({
  formData,
  handleMemoChange,
}: {
  formData: UpdateTodoItemDto;
  handleMemoChange: (memo: string) => void;
}) {
  return (
    <div
      className="flex-1 h-[311px] relative rounded-[24px] overflow-hidden"
      style={{
        backgroundImage: "url(/images/memo.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 font-extrabold text-amber-800 pointer-events-none z-10">
        Memo
      </div>
      <textarea
        value={formData.memo}
        onChange={(e) => handleMemoChange(e.target.value)}
        placeholder="설명을 입력하세요"
        className="w-full h-[239px] px-6 mt-14 mb-4 focus:outline-none text-center bg-transparent resize-none"
      />
    </div>
  );
}
