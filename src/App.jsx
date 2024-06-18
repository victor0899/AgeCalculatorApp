import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format, parse } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, index) => currentYear - index
  );

  const getMaxDaysForMonth = (month, year) => {
    if (!month || !year) {
      return 31; // Valor por defecto para evitar errores
    }

    const monthNumber = parseInt(month);
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    switch (monthNumber) {
      case 2:
        return isLeapYear ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
        return 31;
    }
  };

  const calculateAge = (birthDate, currentDate) => {
    let ageYears = 0;
    let ageMonths = 0;
    let ageDays = 0;

    if (currentDate > birthDate) {
      ageYears = currentDate.getFullYear() - birthDate.getFullYear();
      ageMonths = currentDate.getMonth() - birthDate.getMonth();
      ageDays = currentDate.getDate() - birthDate.getDate();

      if (ageDays < 0) {
        const tempDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        );
        ageDays += tempDate.getDate();
        ageMonths--;
      }

      if (ageMonths < 0) {
        ageMonths += 12;
        ageYears--;
      }
    }

    return { years: ageYears, months: ageMonths, days: ageDays };
  };

  const handleChangeDay = (e) => {
    const dayValue = e.target.value;
    setValue("day", dayValue);

    const { month, year } = getValues();
    updateAge(month, dayValue, year);
  };

  const handleChangeMonth = (e) => {
    const monthValue = e.target.value;
    setValue("month", monthValue);

    const { day, year } = getValues();
    updateAge(monthValue, day, year);
  };

  const handleChangeYear = (e) => {
    const yearValue = e.target.value;
    setValue("year", yearValue);

    const { month, day } = getValues();
    updateAge(month, day, yearValue);
  };

  const updateAge = (month, day, year) => {
    const birthDate = parse(
      `${year}-${month}-${day}`,
      "yyyy-MM-dd",
      new Date()
    );
    const currentDate = new Date();
    const age = calculateAge(birthDate, currentDate);
    setAge(age);
  };

  return (
    <>
      <div>
        <h1>Age Calculator App</h1>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form>
                <div className="form-group">
                  <label htmlFor="dayInput" className="form-label">
                    Day
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.day ? "is-invalid" : ""}`}
                    id="dayInput"
                    {...register("day", {
                      required: "Por favor ingresa un día.",
                      validate: {
                        validDay: (value) => {
                          const maxDays = getMaxDaysForMonth(
                            getValues("month"),
                            getValues("year")
                          );
                          return (
                            !isNaN(parseInt(value)) &&
                            parseInt(value) >= 1 &&
                            parseInt(value) <= maxDays
                          );
                        },
                      },
                    })}
                    onChange={handleChangeDay}
                  />
                  {errors.day && (
                    <div className="invalid-feedback">{errors.day.message}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="monthInput" className="form-label">
                    Month
                  </label>
                  <select
                    className={`form-control ${
                      errors.month ? "is-invalid" : ""
                    }`}
                    id="monthInput"
                    {...register("month", {
                      required: "Por favor selecciona un mes.",
                    })}
                    onChange={handleChangeMonth}
                  >
                    <option value="">Select a month...</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  {errors.month && (
                    <div className="invalid-feedback">
                      {errors.month.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="yearInput" className="form-label">
                    Year
                  </label>
                  <select
                    className={`form-control ${
                      errors.year ? "is-invalid" : ""
                    }`}
                    id="yearInput"
                    {...register("year", {
                      required: "Por favor selecciona un año.",
                    })}
                    onChange={handleChangeYear}
                  >
                    <option value="">Select a year...</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.year && (
                    <div className="invalid-feedback">
                      {errors.year.message}
                    </div>
                  )}
                </div>
              </form>

              <div className="age-result">
                <p>
                  {`Tu edad es de ${age.years} años, ${age.months} meses y ${age.days} días.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
