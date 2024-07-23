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
  }, []);

  const handleVersionChange = (e) => {
    const selectedVersion = e.target.value;
    setVersion(selectedVersion);

    if (selectedVersion === "dev") {
      setEnvironments([]);
    } else if (urls[selectedVersion]) {
      setEnvironments(Object.keys(urls[selectedVersion]));
    } else {
      setEnvironments([]);
    }
    setEnvironment("");
  };

  const handleEnvironmentChange = (e) => {
    setEnvironment(e.target.value);
  };

  const handleLaunch = () => {
    if (version === "dev") {
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
            <option value="">Select Version</option>
            <option value="dev">dev</option>
            <option value="cit">cit</option>
            <option value="sit">sit</option>
            <option value="l&u">l&u</option>
          </select>
        </div>
        <div className="dropdown">
          <label htmlFor="environment">Environment: </label>
          <select
            id="environment"
            value={environment}
            onChange={handleEnvironmentChange}
            disabled={version === "dev" || environments.length === 0}
          >
            <option value="">Select Environment</option>
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
        disabled={!version || (version !== "dev" && !environment)}
      >
        Launch
      </button>
    </div>
  );
}

export default App;
