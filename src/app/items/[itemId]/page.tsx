import { fetchTodo } from "@/app/actions";
import ItemContainerContent from "@/components/features/item/ItemContainerContent";
import { Container } from "@/components/layouts/Container";
import { PageLayout } from "@/components/layouts/PageLayout";

interface ItemDetailPageProps {
  params: Promise<{
    itemId: string;
  }>;
}

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const { itemId } = await params;
  const { data, error } = await fetchTodo(Number(itemId));

  return (
    <PageLayout>
      <Container className="py-6 bg-white px-4 md:px-6 lg:px-[100px] overflow-y-auto">
        <ItemContainerContent data={data} error={error} />
      </Container>
    </PageLayout>
  );
}
