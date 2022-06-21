import * as React from "react";
import right from "../assets/hummingbird--right.png";

export default function Splash() {
    return (
        <div id="splash">
            <p>
        <span className="word">hummingbird</span><br/>hope is the thing with feathers<br/>
    drag and drop poem kit
        <img
        className="bird bird--right slide-in-elliptic-top-fwd"
        src={right}/>
        </p>
        </div>
    );
};
