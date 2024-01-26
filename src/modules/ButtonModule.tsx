import { appName } from "@appConfig";
import { ModuleProps } from "@models";
import { useState } from "react";

const ButtonModule = ({ recordActionForAuditing }: ModuleProps) => {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        recordActionForAuditing({
            action: "Increase the Button Count",
            payload: {
                prev: count,
                current: count + 1,
            },
        });
        setCount((val) => val + 1);
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
            }}
        >
            <button onClick={increaseCount}>
                remotes/{appName}: {count}
            </button>
        </div>
    );
};

export default ButtonModule;
