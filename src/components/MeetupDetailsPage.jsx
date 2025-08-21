import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Header from "../pages/Header";

const MeetupDetailsPage = () => {
  const { data, loading, error } = useFetch(
    "https://backend-neog.vercel.app/events"
  );

  const { eachEventId } = useParams();
  const eachEventData = data
    ? data.find((event) => event._id == eachEventId)
    : "";
  // console.log(eachEventData);

  return (
    <>
      <div>
        <Header />
        <div className="bg-body-tertiary">
          <div className="container">
            <div className="d-flex ms-auto">
              <div className="col-md-8 pr-5 mr-4">
                <h1>{eachEventData.title}</h1>
                <p>
                  Hosted By: <br />
                  <b>{eachEventData.host}</b>
                </p>
                <img
                  src={eachEventData.thumbnail}
                  alt="card-Image"
                  className="img-fluid"
                />
                <h2>Details:</h2>
                <p>{eachEventData.description}</p>
                <h2>Additional Information:</h2>
                <p>
                  <b>Dress Code:</b> {eachEventData.dressCode}
                </p>
                <p>
                  <b>Age Restriction: </b> {eachEventData.ageRestriction}
                </p>
                <h2>Event Tags:</h2>
                {eachEventData?.tags?.map((tag, index) => (
                  <button key={index} className="btn btn-danger m-2">
                    {tag}
                  </button>
                ))}
              </div>
              <div className="mx-5 pl-4  ">
                <div className="px-4">
                  <div className="card shadow-sm p-4 mb-3">
                    <p className="mb-4">
                      &#128338; {eachEventData.date} to <br />{" "}
                      {eachEventData.date2}
                    </p>
                    <p className="mb-4">&#128205; {eachEventData.venue}</p>
                    <p className="mt-2">₹ {eachEventData.price}</p>
                  </div>
                  <h2>Speakers: ({eachEventData?.speakers?.length})</h2>
                  {eachEventData?.speakers?.map((eventSpeaker, index) => (
                    <>
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={eachEventData.speakersImage[index]}
                          alt={eventSpeaker}
                          className="rounded-circle me-3"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <p className="mb-1 fw-bold">{eventSpeaker}</p>
                          <p className="mb-0 text-muted">
                            {eachEventData.speakersOccupation[index]}
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
                  <div className="text-center ">
                    <button className="btn btn-danger px-5 mt-4">RSVP</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MeetupDetailsPage;
