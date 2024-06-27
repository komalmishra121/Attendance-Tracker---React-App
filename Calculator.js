import { useState } from "react";
let percentageHigh = false;
export default function Calculator() {
  const [Academic, setAcademic] = useState("");
  const [absent, setAbsent] = useState("");
  const [delegation, setDelegation] = useState("");
  const [totalPercentage, settotalPercentage] = useState(0);
  const [futureTotalLectures, setFutureTotalLectures] = useState("");
  const [totalPossibleAbsents, settotalPossibleAbsents] = useState(0);
  const [totalPossibleDelegations, settotalPossibleDelegations] = useState(0);
  const [futureDelegation, setfutureDelegation] = useState("");
  const [errorMessageFormOne, setErrorMessageOne] = useState("");
  const [errorMessageFormTwo, setErrorMessageTwo] = useState("");
  function handleSumbit(e) {
    e.preventDefault();
    // Validate input and show error message if necessary
    if (isNaN(Academic) || isNaN(absent) || isNaN(delegation)) {
      setErrorMessageOne("Please enter valid numbers.");
      return;
    }
    setErrorMessageOne("");
    // const percentage =
    //   100 - (((absent - delegation) / Academic) * 100).toFixed(2);
    settotalPercentage(
      100 - (((absent - delegation) / Academic) * 100).toFixed(2)
    );
    // console.log(totalPercentage);
  }

  function calculateMaxAbsences(e) {
    e.preventDefault();
    // Validate input and show error message if necessary
    if (isNaN(futureTotalLectures) || isNaN(futureDelegation)) {
      setErrorMessageTwo("Please enter valid numbers.");
      return;
    }
    setErrorMessageTwo("");
    const targetPercentage = 90;
    let currentTotalAbsent = absent;
    let currentDelegation = delegation;
    if (totalPercentage > targetPercentage) {
      //the current percentage after I check if total percentage is greater than 90,
      //even then I need to make sure the "future possible extra academic days" are considered
      let currentPercentage =
        100 -
        ((currentTotalAbsent - futureDelegation) / futureTotalLectures) * 100;
      console.log(currentPercentage);

      while (currentPercentage > targetPercentage) {
        currentTotalAbsent++;
        currentPercentage =
          100 -
          ((currentTotalAbsent - futureDelegation) / futureTotalLectures) * 100;
      }
      percentageHigh = true;
      // Over 90, With added extra days in case they exist absents
      console.log(currentTotalAbsent);

      settotalPossibleAbsents(currentTotalAbsent - absent);
    } else {
      let currentPercentage =
        100 -
        ((currentTotalAbsent - futureDelegation) / futureTotalLectures) * 100;
      console.log(currentPercentage);
      // now when originally the percentage of user was lower than 90, but the user
      //prompts some future academic to be as high, that currentPercentage becomes above 90
      //then absent should be calculated
      if (currentPercentage > targetPercentage) {
        while (currentPercentage > targetPercentage) {
          currentTotalAbsent++;
          currentPercentage =
            100 -
            ((currentTotalAbsent - futureDelegation) / futureTotalLectures) *
              100;
        }
        console.log(currentTotalAbsent - absent);
        percentageHigh = true;
        settotalPossibleAbsents(currentTotalAbsent - absent);
      } else {
        //Case : when the current percentage of user even after future academics
        //is lower than 90, now delegation should be calculated
        while (currentPercentage <= targetPercentage) {
          currentDelegation++;
          currentPercentage =
            100 -
            ((currentTotalAbsent - currentDelegation) / futureTotalLectures) *
              100;
        }
        percentageHigh = false;
        settotalPossibleDelegations(currentDelegation - delegation);
        console.log(currentDelegation);
      }
    }
  }

  return (
    <section className="calculator-body">
      <div className="main">
        <div>
          <form className="interface" onSubmit={handleSumbit}>
            <input
              type="text"
              placeholder="Total Academic Lectures"
              className="present"
              value={Academic}
              onChange={(e) => setAcademic(e.target.value)}
            />
            <input
              type="text"
              placeholder="Total Absent Lectures"
              className="absent"
              value={absent}
              onChange={(e) => setAbsent(e.target.value)}
            />
            <input
              type="text"
              placeholder="OA Delegation Lectures"
              className="delegation"
              value={delegation}
              onChange={(e) => setDelegation(e.target.value)}
            />
            <button>Calculate</button>
            <span className="error">
              {errorMessageFormOne && (
                <div className="error-message">{errorMessageFormOne}</div>
              )}
            </span>
          </form>
        </div>
        <div className="result">
          <p className="percentage">
            {totalPercentage === 95 || totalPercentage > 90 ? (
              <span>
                {totalPercentage.toFixed(2)}%<br></br> You are good to go! 🚀🦺
              </span>
            ) : totalPercentage < 90 && totalPercentage >= 80 ? (
              <span>
                {totalPercentage.toFixed(2)}%<br></br> Woof! You are just on the
                safe side! 🏳💚
              </span>
            ) : totalPercentage < 70 && totalPercentage > 30 ? (
              <span>
                {totalPercentage.toFixed(2)}% <br></br> 🚩Run for your
                fines!!🚩🚩🚩
              </span>
            ) : totalPercentage < 30 ? (
              <span>
                {totalPercentage.toFixed(2)}%<br></br> Are you for real ?🚩🚩🚩
              </span>
            ) : (
              <span>
                {totalPercentage.toFixed(2)}%<br></br> You are in trouble!🚩
              </span>
            )}
          </p>
        </div>
        <form className="interface" onSubmit={calculateMaxAbsences}>
          <p className="daysLeft-heading">
            <strong>
              Calculate how many holidays you can take before fine.
            </strong>
          </p>
          <input
            type="text"
            placeholder="Future Total Academic Lectures"
            className="present"
            value={futureTotalLectures}
            onChange={(e) => setFutureTotalLectures(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Future OA Delegation"
            className="delegation"
            value={futureDelegation}
            onChange={(e) => setfutureDelegation(Number(e.target.value))}
          />
          <button className="absentPossible-btn">Calculate</button>
          <span className="error">
            {errorMessageFormTwo && (
              <div className="error-message">{errorMessageFormTwo}</div>
            )}
          </span>
        </form>

        <div className="result absentPossible-container">
          <p className="absentPossible">
            <span>
              {percentageHigh
                ? `Nearly ${Math.abs(
                    totalPossibleAbsents
                  )} Absents Possible (${Math.ceil(
                    totalPossibleAbsents / 8
                  )} Days) 🚀🦺`
                : `Nearly take ${Math.abs(
                    totalPossibleDelegations
                  )} Delegations for 90% 🦺`}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}