import React from "react";

const RecruiterHome=()=>{
    return(
        <div style={{ 
                margin: "20px", 
                width: "100%",
                borderRadius: "5px",
                boxShadow: "1px 2px 9px gray",
            }}
        >
            <img
                src="../../assets/apple-bg.jpeg"
                alt="apple"
                style={{
                    width: "100%",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px"
                    // maxWidth: "100%",
                    // height: "200px",
                    // objectFit: "cover",
                    // objectPosition: "center",
                }}
            />
            <div 

            >
                <div>
                    <img
                        src="../../assets/apple-logo.jpeg"
                        alt="apple"
                        style={{
                            height: "100px",
                            width: "100px",
                            borderRadius: "5px",
                            transform: "translate(50px, -50px)"
                        }}
                    />
                </div>
                <div>
                    <h1 style={{
                        marginLeft: "50px"
                    }}
                    >
                        Apple
                    </h1>
                    <p style={{
                            marginLeft: "50px",
                            color: "gray"
                        }}
                    >Computers and Electronics Manufacturing Cupertino, California</p>
                </div>
                <div
                    style={{
                        border: "1px solid gray",
                        borderRadius: "5px",
                        margin: "0 20px 0 50px"
                    }}
                >
                    <div 
                        style={{
                            margin: "20px"
                        }}
                    >
                        <h2> New Notifications</h2>
                        <ul style={{listStyleType: "none", marginLeft: "-20px"}}>
                            <li>
                                <a
                                    href="matched"
                                    style={{textDecoration: "none"}}
                                >
                                    Matched Profiles
                                </a>
                            </li>
                            <li>
                                <a
                                    href="request"
                                    style={{textDecoration: "none"}}
                                >
                                    Request Accepted
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecruiterHome;