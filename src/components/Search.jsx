import { FontAwesomeIcon, faSearchPlus } from "src/components";
import { SearchText } from "src/components";
import { SearchButton } from "src/components";

export const Search = (props) => {
  const { offset, until, limit, isOffset, isUntil, getPoke } = props;
  return (
    <div className="text-center">
      <SearchText
        offset={offset}
        until={until}
        isOffset={isOffset}
        isUntil={isUntil}
      />

      <div
        className="my-3 text-sm text-blue-700"
        style={{ fontFamily: "pokemon-font" }}
      >
        ※ No. 898 までだよ！
      </div>
      <SearchButton
        offset={offset}
        until={until}
        limit={limit}
        getPoke={getPoke}
      />
    </div>
  );
};
