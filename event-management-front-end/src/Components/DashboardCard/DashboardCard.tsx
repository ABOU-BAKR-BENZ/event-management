import "./DashboardCard.css";

const DashboardCard = ({
  number,
  title,
  imageName,
}: {
  number: string;
  title: string;
  imageName: string;
}) => {
  return (
    <div className="dashboardCard">
      <div className="dashboardCardtextContent">
        <h1>
          {parseInt(number.split(" ")[0]) || "0"} {number.split(" ")[1]}
        </h1>
        <p>{title}</p>
      </div>
      <img
        src={require(`../../Assets/Icons/${imageName}`)}
        alt="Packages Number Icon"
        className="dashboardCardIcon"
      />
    </div>
  );
};

export default DashboardCard;
