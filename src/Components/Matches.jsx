import React, { useState, useEffect } from "react";
import Modal from "@mui/joy/Modal";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "react-bootstrap/Card";
import { FaEdit } from "react-icons/fa";
import BootstrapPagination from "react-bootstrap/Pagination";

function Matches() {
  const [data, setData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [umpires, setUmpires] = useState([]);
  const [venues, setVenues] = useState([]);
  const [matchModal, setMatchModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [team1, setTeam1] = useState("");
  const [team1Id, setTeam1Id] = useState("");
  const [team2, setTeam2] = useState("");
  const [team2Id, setTeam2Id] = useState("");
  const [umpire1, setUmpire1] = useState("");
  const [umpire2, setUmpire2] = useState("");
  const [umpire3, setUmpire3] = useState("");
  const [venue, setVenue] = useState("");
  const [dateAndTime, setDateTime] = useState("");
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [imageUrl, setVenueImageURL] = useState("");

  const tokenForHeader = localStorage.getItem("user-info");
  let parsedToken;

  try {
    parsedToken = JSON.parse(tokenForHeader);
  } catch (error) {
    console.error("Error parsing token:", error);
  }

  useEffect(() => {
    if (parsedToken) {
      getAllTeams();
      getAllUmpires();
      getAllVenues();
      getMatches();
    }
  }, [parsedToken]);

  async function getAllTeams() {
    try {
      const response = await axios.get(
        "http://100.80.80.84:3000/identity/getAllTeams",
        {
          headers: { token: `${parsedToken}` },
        }
      );
      setTeams(response.data || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  }

  async function getMatches() {
    try {
      if (parsedToken) {
        const response = await axios.get(
          "http://100.80.80.84:3000/identity/getAllMatches",
          {
            headers: { token: `${parsedToken}` },
          }
        );
        setData(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
      setData([]); 
    }
  }

  async function getAllUmpires() {
    try {
      const response = await axios.get(
        "http://100.80.80.84:3000/identity/getAllEmpires",
        {
          headers: { token: `${parsedToken}` },
        }
      );
      setUmpires(response.data.identity || []);
    } catch (error) {
      console.error("Error fetching umpires:", error);
    }
  }

  async function getAllVenues() {
    try {
      const response = await axios.get(
        "http://100.80.80.84:3000/identity/getAllVenue",
        {
          headers: { token: `${parsedToken}` },
        }
      );
      setVenues(response.data.identity || []);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  }

  async function scheduleMatch(e) {
    e.preventDefault();

    const matchData = {
      team1,
      team2,
      umpire1,
      umpire2,
      umpire3,
      venue,
      dateAndTime,
    };

    try {
      const response = await axios.post(
        "http://100.80.80.84:3000/identity/addMatch",
        matchData,
        {
          headers: { token: `${parsedToken}` },
        }
      );

      if (response) {
        setData(response.data);
        setMatchModal(false);
        toast.success("Match scheduled successfully!");
        getMatches();
      } else {
        toast.error("Failed to schedule match. Please try again.");
      }
    } catch (error) {
      console.error("Error scheduling match:", error);
      toast.error(
        "An error occurred while scheduling the match. Please try again."
      );
    }
  }

  function handleUpdate(matchid, match) {
    setSelectedMatchId(matchid);
    setTeam1(match.team1);
    setTeam2(match.team2);
    setTeam1Id(match.team1.id);
    setTeam2Id(match.team2.id);
    setUmpire1(match.umpire1);
    setUmpire2(match.umpire2);
    setUmpire3(match.umpire3);
    setVenue(match.venue);
    setDateTime(new Date(match.dateAndTime).toISOString().slice(0, 16));
    setUpdateModal(true);
  }

  async function updateMatch(event) {
    event.preventDefault();
    let item = {
      team1,
      team2,
      umpire1,
      umpire2,
      umpire3,
      venue,
      dateAndTime,
    };
    console.log("item in update", item);
    try {
      await axios.put(
        `http://100.80.80.84:3000/identity/updateMatch/${selectedMatchId}`,
        item,
        {
          headers: {
            token: `${parsedToken}`,
          },
        }
      );
      toast.success("Data Updated Successfully!");
      getMatches();
      setUpdateModal(false);
    } catch (error) {
      toast.error("Error While Updation");
      getMatches();
      setUpdateModal(false);
      console.log("Error during update", error);
    }
  }

  return (
    <>
      <Navbar />
      <h2 className="team-heading">All Matches</h2>
      <div className="add-team-btn-div">
        <button className="add-team-btn" onClick={() => setMatchModal(true)}>
          Schedule New Match
        </button>
      </div>
      <ToastContainer />
      <div className="match-container">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((match, index) => (
          <Card className="card" key={index} style={{ width: "18rem" }}>
            <Card.Title
              className="card-text-heading-2"
              style={{ marginTop: "7px", fontWeight: "bold" }}
            >
              Match: {match.team1Id.name} vs {match.team2Id.name}
            </Card.Title>
            <Card.Img className="card-image2" src={match.venueId.meta.imageUrl} />
            <Card.Body>
              <Card.Title>
                Date and Time:<strong> {new Date(match.dateAndTime).toLocaleString()}</strong>
                <br />
                Umpire1: <strong>{match.umpire1Id.name}</strong>
                <br />
                Umpire2: <strong>{match.umpire2Id.name}</strong>
                <br />
                Umpire3: <strong>{match.umpire3Id.name}</strong>
                <br />
                Venue: <strong>{match.venueId.name}</strong>
                <br />
              </Card.Title>
              <FaEdit
                onClick={() => handleUpdate(match.id, match)}
                style={{ color: "gray", width: "30px", height: "29px" }}
              />
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No matches available</p>
      )}
    </div>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={matchModal}
        onClose={() => setMatchModal(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <div className="container">
             <div>
               <h5 className="main-heading-modal">Schedule Match</h5>
               <form onSubmit={scheduleMatch}>
                 <div className="form-section">
                   <label htmlFor="team1">Team 1</label>
                   <br />
                   <select
                    className="input-bar-team"
                    id="team1"
                    onChange={(e) => {
                      setTeam1(e.target.value);
                      setTeam2("");
                    }}
                    required
                  >
                    <option value="">Select Team 1</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                  <br />

                  <label htmlFor="team2">Team 2</label>
                  <br />
                  <select
                    className="input-bar-team"
                    id="team2"
                    onChange={(e) => setTeam2(e.target.value)}
                    required
                    disabled={!team1}
                  >
                    <option value="">Select Team 2</option>
                    {teams
                      .filter((team) => team.id !== parseInt(team1))
                      .map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </select>
                  <br />

                  <label htmlFor="umpire1">Umpire 1</label>
                  <br />
                  <select
                    className="input-bar-team"
                    id="umpire1"
                    onChange={(e) => setUmpire1(e.target.value)}
                    required
                  >
                    <option value="">Select Umpire 1</option>
                    {umpires.map((umpire) => (
                      <option key={umpire.id} value={umpire.id}>
                        {umpire.name}
                      </option>
                    ))}
                  </select>
                  <br />

                  <label htmlFor="umpire2">Umpire 2</label>
                  <br />
                  <select
                    className="input-bar-team"
                    id="umpire2"
                    onChange={(e) => setUmpire2(e.target.value)}
                    required
                    disabled={!umpire1}
                  >
                    <option value="">Select Umpire 2</option>
                    {umpires
                      .filter((umpire) => umpire.id !== parseInt(umpire1))
                      .map((umpire) => (
                        <option key={umpire.id} value={umpire.id}>
                          {umpire.name}
                        </option>
                      ))}
                  </select>
                  <br />

                  <label htmlFor="umpire3">Umpire 3</label>
                  <br />
                  <select
                    className="input-bar-team"
                    id="umpire3"
                    onChange={(e) => setUmpire3(e.target.value)}
                    required
                    disabled={!umpire2}
                  >
                    <option value="">Select Umpire 3</option>
                    {umpires
                      .filter(
                        (umpire) =>
                          umpire.id !== parseInt(umpire1) &&
                          umpire.id !== parseInt(umpire2)
                      )
                      .map((umpire) => (
                        <option key={umpire.id} value={umpire.id}>
                          {umpire.name}
                        </option>
                      ))}
                  </select>
                  <br />

                  <label htmlFor="venue">Venue</label>
                  <br />
                  <select
                    className="input-bar-team"
                    id="venue"
                    onChange={(e) => setVenue(e.target.value)}
                    required
                  >
                    <option value="">Select Venue</option>
                    {venues.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue.name}
                      </option>
                    ))}
                  </select>
                  <br />

                  <label htmlFor="dateAndTime">Date and Time</label>
                  <br />
                  <input
                    type="datetime-local"
                    id="dateAndTime"
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                    className="input-bar-team"
                  />
                  <br />
                  <div className="add-team-btn-div">
                    <button className="add-team-btn" type="submit">
                      Schedule Match
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Sheet>
      </Modal>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={updateModal}
        onClose={() => setUpdateModal(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 900,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <div className="container">
            <div>
              <h5 className="main-heading-modal">Update Match</h5>
              <form onSubmit={scheduleMatch}>
                <div className="form-section">
                  <label htmlFor="team1">Team 1</label>
                  <br />
                  <select
                    className="input-bar-team"
                    id="team1"
                    value={team1}
                    onChange={(e) => {
                      setTeam1(e.target.value);
                      setTeam2("");
                    }}
                    required
                    disabled
                  >
                    <option value="">Select Team 1</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                  <br />

                  <label htmlFor="team2">Team 2</label>
                  <br />
                  <select
                    className="input-bar-team"
                    id="team2"
                    value={team2}
                    onChange={(e) => setTeam2(e.target.value)}
                    required
                    disabled
                  >
                    <option value="">Select Team 2</option>
                    {teams
                      .filter((team) => team.id !== parseInt(team1))
                      .map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </select>
                  <br />

                  <label htmlFor="umpire1">Umpire 1</label>
                  <br />
                  <select
                    className="input-bar-team"
                    id="umpire1"
                    value={umpire1}
                    onChange={(e) => setUmpire1(e.target.value)}
                    required
                  >
                    <option value="">Select Umpire 1</option>
                    {umpires.map((umpire) => (
                      <option key={umpire.id} value={umpire.id}>
                        {umpire.name}
                      </option>
                    ))}
                  </select>
                  <br />

                  <label htmlFor="umpire2">Umpire 2</label>
                  <br />
                  <select
                    className="input-bar-team"
                    id="umpire2"
                    value={umpire2}
                    onChange={(e) => setUmpire2(e.target.value)}
                    required
                    disabled={!umpire1}
                  >
                    <option value="">Select Umpire 2</option>
                    {umpires
                      .filter((umpire) => umpire.id !== parseInt(umpire1))
                      .map((umpire) => (
                        <option key={umpire.id} value={umpire.id}>
                          {umpire.name}
                        </option>
                      ))}
                  </select>
                  <br />

                  <label htmlFor="umpire3">Umpire 3</label>
                  <br />
                  <select
                    className="input-bar-team"
                    id="umpire3"
                    value={umpire3}
                    onChange={(e) => setUmpire3(e.target.value)}
                    required
                    disabled={!umpire2}
                  >
                    <option value="">Select Umpire 3</option>
                    {umpires
                      .filter(
                        (umpire) =>
                          umpire.id !== parseInt(umpire1) &&
                          umpire.id !== parseInt(umpire2)
                      )
                      .map((umpire) => (
                        <option key={umpire.id} value={umpire.id}>
                          {umpire.name}
                        </option>
                      ))}
                  </select>
                  <br />

                  <label htmlFor="venue">Venue</label>
                  <br />
                  <select
                    className="input-bar-team"
                    id="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    required
                  >
                    <option value="">Select Venue</option>
                    {venues.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue.name}
                      </option>
                    ))}
                  </select>
                  <br />

                  <label htmlFor="dateAndTime">Date and Time</label>
                  <br />
                  <input
                    type="datetime-local"
                    id="dateAndTime"
                    value={dateAndTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                    className="input-bar-team"
                  />
                  <br />
                  <div className="add-team-btn-div">
                    <button className="add-team-btn" type="submit" onClick={updateMatch}>
                      Update Match
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Sheet>
      </Modal>

      
      <Footer />
    </>
  );
}

export default Matches;
