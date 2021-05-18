import { FontAwesomeIcon, faGithub } from "src/components";

export const Header = () => {
  return (
    <header className="text-center mt-4">
      <div>
        <div
          style={{
            fontFamily: "pokemon-font",
            fontSize: "2rem",
            color: "gray",
          }}
        >
          ポケモンリスト
        </div>
      </div>
      <div className="text-right p-4 underline">
        <a href="https://github.com/mitsuki3553/tryPoke" target="_blank">
          <FontAwesomeIcon
            icon={faGithub}
            size="1x"
            style={{
              backgroundColor: "white",
              borderRadius: "9999px",
            }}
          />
          <span
            className="ml-1 text-blue-700"
            style={{ fontFamily: "pokemon-font", fontSize: "12px" }}
          >
            github
          </span>
        </a>
      </div>
    </header>
  );
};
