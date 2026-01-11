import DashboardLayout from "@/layouts/admin-layout";
import VisitorListPage from "@/templates/admin/visitor-list";
import { fetchVisitors } from "@/lib/api-service/visitor";

interface Props {
  searchParams: {
    page?: string;
    pageSize?: string;
  };
}

export default async function AdminVisitorList({ searchParams }: Props) {
  const { page, pageSize } = await searchParams;

  const currentPage = Number(page ?? 1);
  const limit = Number(pageSize ?? 10);

  const visitorsResponse = await fetchVisitors(currentPage, limit);

  return (
    <DashboardLayout>
      <VisitorListPage
        visitor={visitorsResponse.data}
        page={currentPage}
        pageSize={limit}
      />
    </DashboardLayout>
  );
}
