import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";

const SideBar = ({ isOpen, toggle }) => {
  const navigate = useNavigate();
  const containerStyles = `fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out bg-white ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`;

  return (
    <div className={containerStyles} style={{ width: "256px" }}>
      <Button
        onClick={toggle}
        className="absolute right-0 top-0 p-4"
        aria-label="close-button"
      >
        Close
      </Button>
      <nav>
        <a
          href="/"
          className="block p-4 text-black hover:bg-gray-50"
          aria-label="home-button"
        >
          Home
        </a>
        <a
          href="/userinfo"
          className="block p-4 text-black hover:bg-gray-50"
          aria-label="my-profile-button"
        >
          My Profile
        </a>
        {localStorage.getItem("token") && (
          <Button
            as="button"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("Refresh-Token");
              alert("You have successfully logged out.");
              navigate("/login");
              window.location.reload();
            }}
            className="block p-4 text-black hover:bg-gray-50"
            aria-label="logout-button"
          >
            Logout
          </Button>
        )}

        <a href="#" className="block p-4 text-black hover:bg-gray-50">
          Contact
        </a>
      </nav>
    </div>
  );
};

export default SideBar;
