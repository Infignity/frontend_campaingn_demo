import Analytics from "./AnalyticPage";
import HomeView from "./HomeView";
import ThirdPage from "./ThirdPage";

export function getStepContent(stepIndex: any) {
    switch (stepIndex) {
        case 0:
            return (
                <div>
                    <HomeView />
                </div>
            );
        case 1:
            return (
                <div>
                    <Analytics />
                </div>

            );
        case 2:
            return (
                <div>
                    <ThirdPage />
                </div>
            );
        default:
            return 'Unknown stepIndex';
    }
}