export default function Header() {
    return (
      <header className="header">
        <div className="main heading">What's my attendence? 🧮</div>
        <div className="sub heading">
          Be safe. Be calculative.{" "}
          <sub style={{ fontSize: "small" }}>
            <em>by Pranjal</em>
          </sub>
        </div>
        <span className="documentation-container">
          <a href="https://github.com/yyppsk/Attendence-Calculator-PSIT/wiki">
            <span className="documentation">Documentation</span>
          </a>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <a href="https://github.com/yyppsk/Attendence-Calculator-PSIT/issues">
            <span className="gitissue">
              <i className="fa-solid fa-code-branch fa-fade fa-sm"></i> issues
            </span>
          </a>
        </span>
        <span>
          <a href="https://www.hitwebcounter.com">
            <img
              src="https://hitwebcounter.com/counter/counter.php?page=9481729&style=0006&nbdigits=9&type=page&initCount=0"
              title="Counter Widget"
              alt="Visit counter For Websites"
              border="0"
              style={{ marginTop: "1.2rem" }}
            />
          </a>
        </span>
      </header>
    );
  }