import { useState } from "react";
import Header from "../pages/Header";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const MeetupHome = () => {
  const { data, loading, error } = useFetch(
    "https://backend-neog.vercel.app/events"
  );
  const [eventTypedata, setEventTypedata] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data
    ?.filter((event) =>
      eventTypedata === "All" ? true : event.eventType === eventTypedata
    )
    .filter((event) => {
      const query = searchQuery.toLowerCase();
      const titleMatch = event.title.toLowerCase().includes(query);
      const tagsMatch = event.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      );
      return titleMatch || tagsMatch;
    });

  // ✅ Improved loading UI
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-center fs-5 m-3">Loading events...</p>
      </div>
    );

  if (error) return <p className="text-center mt-5">Error fetching events</p>;

  return (
    <>
      <div>
        <Header onSearch={(query) => setSearchQuery(query)} />
        <div className="bg-body-tertiary">
          <div className="container">
            <nav className="navbar bg-body-tertiary">
              <div className="container d-flex justify-content-between align-items-center">
                <h1 className="mb-0">Meetup Events</h1>
                <select
                  className="form-select w-auto"
                  onChange={(e) => setEventTypedata(e.target.value)}
                >
                  <option value="All">Search Event type</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="All">Both</option>
                </select>
              </div>
            </nav>

            <div className="row">
              {filteredData?.map((event) => (
                <div className="col-md-4 mb-4" key={event._id}>
                  <div className="card">
                    <Link to={`/eachEvent/${event._id}`}>
                      <img
                        src={event.thumbnail}
                        className="card-img"
                        alt={event.title}
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                      <div className="card-img-overlay">
                        <span className="btn btn-light px-4">
                          {event.eventType}
                        </span>
                      </div>
                    </Link>
                  </div>
                  <p className="fw-normal mb-0">{event.date}</p>
                  <h3 className="card-title mb-5">{event.title}</h3>
                </div>
              ))}

              {/* ✅ Improved "No events found" UI */}
              {filteredData?.length === 0 && (
                <div className="d-flex justify-content-center align-items-center vh-50">
                  <p className="text-center fs-5 m-3">No events found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetupHome;
