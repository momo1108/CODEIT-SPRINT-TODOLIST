import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { PlusIcon } from "@/components/icons/PlusIcon";

export function TodoToolbar() {
  return (
    <div className="flex items-center gap-4 border-b border-slate-200">
      {/* 검색 입력 */}
      <div className="flex-1">
        <Input placeholder="할 일을 입력해주세요" />
      </div>

      {/* 추가 버튼 */}
      <Button
        icon={<PlusIcon isEmpty={false} />}
        label="추가하기"
        variant="add-empty"
      >
        <PlusIcon className="h-4 w-4 stroke-slate-900" />
        추가하기
      </Button>
    </div>
  );
}
