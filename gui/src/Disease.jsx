import React, { useEffect, useState } from "react";
import "./Disease.css";
import diseaseList from "./data/diseaseList.json";
import Navbar from "./Navbar.jsx";

function Disease() {
    const [imageImports, setImageImports] = useState({});

    useEffect(() => {
        const importImages = async () => {
            const imports = {};
            await Promise.all(
                diseaseList.diseaseList.map(async (item) => {
                    try {
                        const module = await import(
                            `./data/${item.image_path}`
                        );
                        imports[item.image_path] = module.default;
                    } catch (error) {
                        console.error(
                            `Failed to import image: ${item.image_path}`,
                            error
                        );
                    }
                })
            );
            setImageImports(imports);
        };

        importImages();
    }, []);

    return (
        <div className="container">
            <Navbar />
            <h1>Disease GUI</h1>
            <div className="diseases">
                {diseaseList.diseaseList.map((item, index) => (
                    <div className="list" key={index}>
                        <img
                            style={{ width: "100%" }}
                            src={imageImports[item.image_path]}
                            alt={`Plant #${item.plant_id}`}
                        />
                        <p>Prediction: {item.prediction}</p>
                        <p>Content: {item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Disease;
