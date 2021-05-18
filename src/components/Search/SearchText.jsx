export const SearchText = (props) => {
  const { offset, until, isOffset, isUntil } = props;
  return (
    <div style={{ fontFamily: "pokemon-font" }}>
      <span>ずかんNo.</span>
      <input
        type="text"
        className="bg-black text-white p-2 rounded-md w-16 mr-2 outline-none"
        value={offset}
        onChange={(e) => isOffset(e)}
      />
      <span>からNo.</span>
      <input
        type="text"
        className="bg-black text-white p-2 rounded-md w-16 mr-2 outline-none"
        value={until}
        onChange={(e) => isUntil(e)}
      />
      <span>までのポケモン</span>
    </div>
  );
};
