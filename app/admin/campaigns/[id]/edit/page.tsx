// import Form from "@/app/ui/invoices/edit-form";
// import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
// import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/campaigns/breadcrumbs";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    // const [invoice, customers] = await Promise.all([
    //     fetchInvoiceById(id),
    //     fetchCustomers(),
    // ]);
    // if (!invoice) {
    //     return notFound();
    // }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Campaigns", href: "/admin/campaigns" },
                    {
                        label: "Edit Campaign",
                        href: `/admin/campaigns/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            Hello, {id}
            {/* <Form invoice={invoice} customers={customers} /> */}
        </main>
    );
}
