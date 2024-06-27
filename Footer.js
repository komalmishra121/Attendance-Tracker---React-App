export default function Footer() {
    return (
      <header className="footer">
        <span>
          Made with <span style={{ color: "red" }}>❤</span> by Pranjal Pratap
          Singh
        </span>
        <span>For Students of PSIT (unofficial) </span>
        <a href="https://github.com/yyppsk">
          <span>
            <i
              className="fa-brands fa-github fa-fade fa-xl"
              style={{ color: "#8b93a2" }}
            ></i>
            {"  "}
            &nbsp; Github
          </span>
        </a>
        <a href="https://www.linkedin.com/in/yyppsk/">
          <span>
            <i
              className="fa-brands fa-linkedin-in fa-fade fa-xl"
              style={{ color: "#8b93a2" }}
            ></i>
            &nbsp; Linkedin
          </span>
        </a>
      </header>
    );
  }