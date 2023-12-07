import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Relief Hub: Auth",
    description: "Authentication for Relief Hub App",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <main>{children}</main>;
};

export default Layout;
