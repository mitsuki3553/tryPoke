import { FontAwesomeIcon, faSearchPlus } from "src/components";

export const SearchButton = (props) => {
  const { offset, until, limit, getPoke, onLoad } = props;

  return (
    <div>
      <button
        disabled={!offset || !until || limit === 0 || onLoad}
        onClick={() => getPoke()}
        className={
          offset > 0 && limit > 0 && offset <= until && !onLoad
            ? "block w-32 my-2 mx-auto border border-green-700 rounded-md bg-green-700 text-white "
            : "block w-32 my-2 mx-auto border border-green-700 rounded-md bg-green-700 text-white opacity-20 "
        }
      >
        <FontAwesomeIcon icon={faSearchPlus} />
        <span
          style={{
            fontFamily: "pokemon-font",
            fontSize: "16px",
            marginLeft: "8px",
          }}
        >
          ひょうじ
        </span>
      </button>
    </div>
  );
};
