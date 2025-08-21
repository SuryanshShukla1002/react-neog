import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Header from "../pages/Header";

const MeetupDetailsPage = () => {
  const { data, loading, error } = useFetch(
    "https://backend-neog.vercel.app/events"
  );
  const { eachEventId } = useParams();
  const eachEventData = data
    ? data.find((event) => event._id === eachEventId)
    : null;

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error fetching event details</p>;
  if (!eachEventData) return <p>Event not found</p>;

  return (
    <>
      <Header />
      <div className="bg-body-tertiary py-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 pe-md-4">
              <h1>{eachEventData.title}</h1>
              <p>
                Hosted By: <b>{eachEventData.host}</b>
              </p>
              <img
                src={eachEventData.thumbnail}
                alt={eachEventData.title}
                className="img-fluid mb-3"
                style={{
                  objectFit: "cover",
                  width: "80%",
                  maxHeight: "400px",
                }}
              />
              <h2>Details:</h2>
              <p style={{ width: "80%" }}>{eachEventData.description}</p>
              <h2>Additional Information:</h2>
              <p>
                <b>Dress Code:</b> {eachEventData.dressCode}
              </p>
              <p>
                <b>Age Restriction:</b> {eachEventData.ageRestriction}
              </p>
              <h2>Event Tags:</h2>
              {eachEventData?.tags?.map((tag, index) => (
                <span key={index} className="badge bg-danger me-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>

            {/* Right sidebar */}
            <div className="col-12 col-md-4 ps-md-4">
              <div className="card shadow-sm p-3 mb-4">
                <p className="mb-2">
                  &#128338; {eachEventData.date} to {eachEventData.date2}
                </p>
                <p className="mb-2">&#128205; {eachEventData.venue}</p>
                <p>₹ {eachEventData.price}</p>
              </div>

              <h2>Speakers ({eachEventData?.speakers?.length})</h2>
              {eachEventData?.speakers?.map((speaker, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <img
                    src={eachEventData.speakersImage[index]}
                    alt={speaker}
                    className="rounded-circle me-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <p className="mb-0 fw-bold">{speaker}</p>
                    <p className="mb-0 text-muted">
                      {eachEventData.speakersOccupation[index]}
                    </p>
                  </div>
                </div>
              ))}
              <div className="d-grid">
                <button className="btn btn-danger mt-3">RSVP</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetupDetailsPage;
