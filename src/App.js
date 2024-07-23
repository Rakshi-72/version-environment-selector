import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [version, setVersion] = useState("");
  const [environment, setEnvironment] = useState("");
  const [environments, setEnvironments] = useState([]);
  const [urls, setUrls] = useState({});

  useEffect(() => {
    fetch("/urls.json")
      .then((response) => response.json())
      .then((data) => setUrls(data))
      .catch((error) => console.error("Error fetching URLs:", error));
    setVersion("DEV");
  }, []);

  const handleVersionChange = (event) => {
    const selectedVersion = event.target.value;
    setVersion(selectedVersion);

    if (selectedVersion === "DEV") {
      setEnvironments([]);
    } else if (urls[selectedVersion]) {
      setEnvironments(Object.keys(urls[selectedVersion]));
    } else {
      setEnvironments([]);
    }
    setEnvironment("");
  };

  const handleEnvironmentChange = (event) => {
    setEnvironment(event.target.value);
  };

  const handleLaunch = () => {
    if (version === "DEV") {
      window.open("http://localhost:3000", "_blank");
    } else if (urls[version] && urls[version][environment]) {
      window.open(urls[version][environment], "_blank");
    } else {
      alert("URL not found for the selected version and environment");
    }
  };

  return (
    <div className="App">
      <h1>Select Version and Environment</h1>
      <div className="dropdown-container">
        <div className="dropdown">
          <label htmlFor="version">Version: </label>
          <select id="version" value={version} onChange={handleVersionChange}>
            <option value="DEV">DEV</option>
            <option value="CIT">CIT</option>
            <option value="SIT">SIT</option>
            <option value="L&U">L&U</option>
          </select>
        </div>
        <div className="dropdown">
          <label htmlFor="environment">Environment: </label>
          <select
            id="environment"
            value={environment}
            onChange={handleEnvironmentChange}
            disabled={version === "DEV" || environments.length === 0}
          >
            {version === "DEV" && <option value="">NO OPTION</option>}
            <option value="">SELECT VERSION</option>
            {environments.map((env) => (
              <option key={env} value={env}>
                {env}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleLaunch}
        disabled={!version || (version !== "DEV" && !environment)}
      >
        Launch
      </button>
    </div>
  );
}

export default App;
