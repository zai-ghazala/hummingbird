import * as React from "react";
import right from "../assets/hummingbird--right.png";

export default function Splash() {
    return (
        <div id="splash">
            <p>
        <span className="word animate">hummingbird</span><br/><br/><br/>hope is the thing with feathers<br/>
    drag & drop poem kit
        <img
        src={right}/>
        </p>
        </div>
    );
};
