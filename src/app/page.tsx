import { TodoList } from "@/components/features/home/TodoList";
import { TodoToolbar } from "@/components/features/home/TodoToolbar";
import { Container } from "@/components/layouts/Container";
import { PageLayout } from "@/components/layouts/PageLayout";
import { fetchTodos } from "./actions";
import { ErrorAlert } from "@/components/ui/ErrorAlert";

export default async function Home() {
  const { data, error } = await fetchTodos();

  return (
    <PageLayout>
      <Container className="pt-6 px-4 md:px-6 flex flex-col gap-6 md:gap-10">
        {error ? (
          <ErrorAlert message={error} />
        ) : data ? (
          <>
            <TodoToolbar initialTodos={data} />
            <TodoList initialTodos={data} />
          </>
        ) : (
          <ErrorAlert message="데이터를 불러올 수 없습니다." />
        )}
      </Container>
    </PageLayout>
  );
}
