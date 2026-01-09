import DashboardLayout from "@/layouts/admin-layout";
import ChatPage from "@/templates/admin/chat";

import { fetchConversationList } from "@/lib/api-service/chat";

export default async function AdminMessagesPage() {
  const conversationListResponse = await fetchConversationList();
  return (
    <DashboardLayout>
      <ChatPage
        conversationList={conversationListResponse.results.flat() || []}
        total_count={conversationListResponse.count || 0}
      />
    </DashboardLayout>
  );
}
