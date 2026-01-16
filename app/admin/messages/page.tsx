import DashboardLayout from "@/layouts/admin-layout";
import ChatPage from "@/templates/admin/chat";

import { fetchConversationList } from "@/lib/api-service/chat";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function AdminMessagesPage({ searchParams }: Props) {
  const { page } = await searchParams;

  const currentPage = Number(page ?? 1);
  const conversationListResponse = await fetchConversationList(currentPage);

  return (
    <DashboardLayout>
      <ChatPage
        conversationList={conversationListResponse.results.flat() || []}
        total_count={conversationListResponse.count || 0}
        page={currentPage}
      />
    </DashboardLayout>
  );
}
