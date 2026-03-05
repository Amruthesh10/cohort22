import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onClick = () => {} }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {

    // restart camera if it was stopped
    if (!videoRef.current?.srcObject) {
        await init({ landmarkerRef, videoRef, streamRef });

        // ensure video plays
        await new Promise(resolve => setTimeout(resolve, 600))
        await videoRef.current.play();
    }

    const expression = detect({ landmarkerRef, videoRef, setExpression });

    console.log(expression);
    onClick(expression);

    // stop camera after detection
    if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
            .getTracks()
            .forEach((track) => track.stop());

        videoRef.current.srcObject = null;
    }
}

    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
            />
            <h2>{expression}</h2>
            <button className="button" onClick={handleClick}>Detect expression</button>
        </div>
    );
}