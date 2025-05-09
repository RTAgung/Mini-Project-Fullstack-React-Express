import { Lock, Terminal } from "lucide-react";
import BasePage from "./BasePage";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const isLogin = false;
    const handleButtonClick = () => {
        if (isLogin) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    return (
        <BasePage>
            <div className="cyber-card w-full p-6">
                <div className="relative p-10">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src="/assets/phindojo-logo.png"
                            alt="Phin Dojo Logo"
                            className="h-16 w-16"
                        />
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
                            Welcome to{" "}
                            <span className="text-green-500">Phin</span>
                            <span className="text-cyber">Dojo</span>
                        </h1>
                        <p className="text-gray-400 text-center">
                            Training Platform
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-cyber/20 p-2 rounded-full">
                                <Terminal />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">
                                    Test Your Knowledge
                                </h3>
                                <p className="text-gray-400">
                                    Answer multiple-choice questions about
                                    concepts.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-cyber/20 p-2 rounded-full">
                                <Lock />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">
                                    Learn from Explanations
                                </h3>
                                <p className="text-gray-400">
                                    Get detailed explanations for each answer to
                                    improve your understanding.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => handleButtonClick()}
                            className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 bg-cyber hover:bg-cyber-dark text-white px-6 py-6 text-lg"
                        >
                            Start Your Training
                        </button>
                    </div>
                </div>
            </div>
        </BasePage>
    );
}
export default Home;
