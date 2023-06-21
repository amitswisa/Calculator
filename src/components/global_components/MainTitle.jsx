import "../../style/MainTitle.css";

// eslint-disable-next-line react/prop-types
const MainTitle = ({ title }) => {
  return (
    <h1 className="mainTitle">
      <span data-text={title}>{title}</span>
    </h1>
  );
};

export default MainTitle;
