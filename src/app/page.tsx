import { TodoList } from "@/components/features/TodoList";
import { TodoToolbar } from "@/components/features/TodoToolbar";
import { Container } from "@/components/layouts/Container";
import { PageLayout } from "@/components/layouts/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <Container className="pt-6 bg-white">
        <TodoToolbar />
        <TodoList todos={[]} />
      </Container>
    </PageLayout>
  );
}
