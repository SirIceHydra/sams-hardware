import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "SAM'S HARDWARE — STORE",
    description: "Store dashboard for Sam's Hardware",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
