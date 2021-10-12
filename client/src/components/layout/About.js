import React from "react";
import sapir from "../../img/sapir.jpeg";
import adva from "../../img/adva.jpg";

const about = () => {
    return(
        
        <div>
            <img src={sapir} alt="sapir" className="img" />
            <img src={adva} alt="adva" className="img" />
            <h3>Welcome to GlobalPal</h3>
            <br></br>
            <p>Hi, we are adva and sapir. we are a fourth year 
                software engineering student at SCE, 
                and you are watching our final project.</p>
            <br></br>
            <h3>our mission</h3>
            <br></br>
            <p>GlobalPal  is a social networking platform,
                Which specializes in finding suitable 
                partners for online learning, and in addition provides a tailored and convenient work environment 
                for online learning between partners and learning groups.
            </p>
        </div>
        
        
    )
};

export default about;