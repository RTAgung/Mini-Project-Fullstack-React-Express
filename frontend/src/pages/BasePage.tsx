import { ReactElement } from "react";
import { Footer } from "../components/Footer";
import { TopNavigation } from "../components/TopNavigation";

function BasePage({ children }: Readonly<{ children: ReactElement }>) {
    return (
        <div className="min-h-screen flex flex-col">
            <TopNavigation />
            <main className="flex-1 mt-16">
                <div className="max-w-3xl mx-auto px-4 py-12">{children}</div>
            </main>
            <Footer />
        </div>
    );
}

export default BasePage;
