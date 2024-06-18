import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    const regex = /^(3[01]|[12][0-9]|[1-9])?$/;

    if (value === "" || regex.test(value)) {
      setInputValue(value);
      setIsError(false);
    } else {
      setInputValue(""); // Limpia el input si el valor no es válido
      setIsError(true);
    }
  };

  const handleBlur = () => {
    if (inputValue && (inputValue < 1 || inputValue > 31)) {
      setInputValue(""); // Limpia el input si el valor está fuera de rango
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  return (
    <>
      <div>
        <h1>Age Calculator App</h1>

        <div className="container">
          <div className="row">
            <div className="mb-3 position-relative">
              {isError && (
                <div
                  className="tooltip bs-tooltip-top"
                  style={{
                    position: "absolute",
                    top: "-35px",
                    left: "0",
                    zIndex: "9999",
                    backgroundColor: "rgba(255,0,0,0.85)",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Debes ingresar un número entre 1 y 31
                </div>
              )}
              <label htmlFor="formGroupExampleInput" className="form-label">
                Day
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
              ></input>
            </div>

            <div class="mb-3">
              <label for="formGroupExampleInput" className="form-label">
                Month
              </label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                placeholder="Example input placeholder"
              ></input>
            </div>

            <div class="mb-3">
              <label for="formGroupExampleInput" className="form-label">
                Year
              </label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                placeholder="Example input placeholder"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
