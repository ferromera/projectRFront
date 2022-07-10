import { usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";

export default function LoadingIndicator(props) {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && (
            <div
                style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px 0"
                }}
            >
                <ThreeDots
                    type="ThreeDots"
                    color="#1976d2"
                    height="50"
                    width="50"
                />
            </div>
        )
    );
}
