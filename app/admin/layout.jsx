import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "SAM'S HARDWARE — ADMIN",
    description: "Admin dashboard for Sam's Hardware",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
