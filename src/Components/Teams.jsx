import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer"
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import view from "../images/eye.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Teams() {
  const [data, setData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [name, setTeamName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [open, setOpen] = useState(false);
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playerAge, setPlayerAge] = useState("");
  const [playerShirtNumber, setPlayerShirtNumber] = useState("");
  const [playerIdentityNumber, setPlayerIdentityNumber] = useState("");
  const [playerRole, setPlayerRole] = useState("Batsmen");
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [specificOpen, setSpecificOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [imageUrl, setCountryImageURL] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const tokenForHeader = localStorage.getItem("user-info");
  console.log("tokenForHeader", tokenForHeader);

  useEffect(() => {
    fetchData();
  }, [tokenForHeader]);

  let parseToken = JSON.parse(tokenForHeader);
  console.log("parseToken", parseToken);

  async function fetchData() {
    try {
      console.log("token", parseToken);
      if (parseToken) {
        const response = await axios.get(
          "http://100.80.80.84:3000/identity/getAllTeams",
          {
            headers: {
              token: `${parseToken}`,
            },
          }
        );
        console.log("Response data:", response.data);
        setData(response.data);
        localStorage.setItem("teamData", JSON.stringify(response.data));
        const teamIds = response.data.map((team) => team.id);
        localStorage.setItem("teamids", JSON.stringify(teamIds));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createTeam(event) {
    console.log("Next btn clicked");
    event.preventDefault();
    let item = { name, countryname: countryName,imageUrl };
    console.log(name, countryName,imageUrl);

    try {
      toast.success("Team Added Successfully");
      if (parseToken) {
        let result = await axios.post(
          "http://100.80.80.84:3000/identity/addTeam",
          item,
          {
            headers: {
              token: `${parseToken}`,
            },
          }
        );
        console.log("result", result.data);
        setOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error during team creation", error);
    }
  }

  async function addPlayer(event) {
    event.preventDefault();
    let player = {
      name: playerName,
      age: playerAge,
      shirtNo: playerShirtNumber,
      role: playerRole,
      identityNo: playerIdentityNumber,
    };

    try {
      if (parseToken) {
        let result = await axios.post(
          `http://100.80.80.84:3000/identity/addPlayer/${selectedTeamId}`,
          player,
          {
            headers: {
              token: `${parseToken}`,
            },
          }
        );
        console.log("result", result.data);
        toast.success("Player Added Successfully");
        setPlayerModalOpen(false);
      }
    } catch (error) {
      toast.error("Player Addition Failed");
      console.error("Error during adding player", error);
    }
  }

  async function getPlayers(id) {
    try {
      console.log("token", parseToken);
      if (parseToken) {
        const response = await axios.get(
          `http://100.80.80.84:3000/identity/getTeamById/${id}`,
          {
            headers: {
              token: `${parseToken}`,
            },
          }
        );
        if (response.data) {
          setPlayers(response.data);
          // setData(response.data);
          // setSpecificOpen(true);
        } else {
          console.error("Unexpected response structure", response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = (playerId, player) => {
    console.log('handleUpdate called with:', playerId, player);
    setSelectedPlayerId(playerId);
    setPlayerName(player.name);
    setPlayerAge(player.meta.age);
    setPlayerShirtNumber(player.meta.shirtNo);
    setPlayerRole(player.meta.role);
    setUpdateModal(true);
  };

  async function updatePlayer (event){
    event.preventDefault();

    let item = {
      name: playerName,
      age: playerAge,
      shirtNo: playerShirtNumber,
      role: playerRole,
    };

    console.log("item in update", item);
    try {
      await axios.put(
        `http://100.80.80.84:3000/identity/updatePlayer/${selectedPlayerId}`,
        item,
        {
          headers: {
            token: `${parseToken}`,
          },
        }
      );
      toast.success("Data Updated Successfully!");
      getPlayers(selectedTeamId);
      setUpdateModal(false);
    } catch (error) {
      toast.error("Error While Updation");
      getPlayers(selectedTeamId);
      setUpdateModal(false);
      console.log("Error during update", error);
    }
  };

  
    let [currentPage, setCurrentPage] = useState(1);
    let totalRows = players.length;
    console.log("totalRows", totalRows);
    let rowsPerPage = 7;
    let playerpages = [];
    let lastIndex = currentPage * rowsPerPage;
    let lastPage = Math.ceil(totalRows / rowsPerPage);
    let firstIndex = lastIndex - rowsPerPage;
    let currentEntries = players.slice(firstIndex, lastIndex);
  
    for (let i = 1; i <= lastPage; i++) {
      playerpages.push(i);
    }
  
    function handlePageChange(pageNumber) {
      setCurrentPage(pageNumber);
    }
  
    function handleNext() {
      if (currentPage < lastPage) {
        setCurrentPage(currentPage + 1);
      }
    }
  
    function handlePre() {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }

  return (
    <div>
      <NavBar/>
      <h2 className="team-heading">All Teams</h2>
      <div className="add-team-btn-div">
        <button className="add-team-btn" onClick={() => setOpen(true)}>
          Add New Team
        </button>
      </div>
      <table className="table-styling">
        <thead className="table-styling">
          <tr>
            <th>ID</th>
            <th>Team Name</th>
            <th>Country Flag</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-styling">
          {data.map((item, index) => (
            <tr className="table-styling" key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td ><img className="team-flag" src={item.meta.imageUrl} alt="" /></td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setSelectedTeamId(item.id);
                    setPlayerModalOpen(true);
                  }}
                >
                  Add Players
                </button>
                <button
                  onClick={() => {
                    setSelectedTeamId(item.id);
                    getPlayers(item.id);
                    setSpecificOpen(true);
                  }}
                  className="view-btn"
                >
                  <img className="view-img" src={view} alt="view" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
      <ToastContainer />

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
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
              <h5 className="main-heading-modal">Add Team</h5>
              <form>
                <div className="form-section">
                  <div className="form-section1-users">
                    <label htmlFor="team-name">Team Name</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="team-name"
                      onChange={(e) => setTeamName(e.target.value)}
                      required
                    />
                    <br />
                    <label htmlFor="country-name">Country Name</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="country-name"
                      onChange={(e) => setCountryName(e.target.value)}
                      required
                    />
                    <br />
                    <label htmlFor="country-name">Country Flag</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="country-name"
                      onChange={(e) => setCountryImageURL(e.target.value)}
                      required
                    />
                    <br />
                  </div>
                  <br />
                  <div className="btn-div">
                    <button
                      onClick={createTeam}
                      type="submit"
                      className="btn btn-success"
                    >
                      Add Team
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
        open={playerModalOpen}
        onClose={() => setPlayerModalOpen(false)}
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
              <h5 className="main-heading-modal">Add Player</h5>
              <form>
                <div className="form-section">
                  <div className="form-section1-users">
                    <label htmlFor="player-name">Player Name</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="player-name"
                      onChange={(e) => setPlayerName(e.target.value)}
                      required
                    />
                    <br />
                    <label htmlFor="player-age">Player Age</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="number"
                      id="player-age"
                      min={16}
                      required
                      onChange={(e) => setPlayerAge(e.target.value)}
                    />
                    <br />
                    <label htmlFor="player-shirt-number">Shirt Number</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="number"
                      id="player-shirt-number"
                      onChange={(e) => setPlayerShirtNumber(e.target.value)}
                      required
                    />
                    <br />
                    <label htmlFor="player-role">Role</label>
                    <br />
                    <select
                      onChange={(e) => setPlayerRole(e.target.value)}
                      name=""
                      id=""
                      >
                      required
                      <option value="Batsmen">Batsmen</option>
                      <option value="Bowler">Bowler</option>
                      <option value="All-rounder">All Rounder</option>
                    </select>
                  </div>
                  <br />
                  <label htmlFor="player-identity-number">
                    Identity Number
                  </label>
                  <br />
                  <input
                    className="input-bar-team"
                    type="text"
                    id="player-identity-number"
                    onChange={(e) => setPlayerIdentityNumber(e.target.value)}
                    required
                  />
                  <div className="btn-div">
                    <button
                      onClick={addPlayer}
                      type="submit"
                      className="btn btn-success"
                    >
                      Add Player
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
        open={specificOpen}
        onClose={() => setSpecificOpen(false)}
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
          <div className="modal-style">
      <h5 className="main-heading-modal">Players</h5>
      <table className="table-styling tb-style">
        <thead className="table-styling">
          <tr>
            <th>ID</th>
            <th>Player Name</th>
            <th>Age</th>
            <th>Role</th>
            <th>Shirt Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-styling">
          {currentEntries.map((player, index) => {
            console.log('player:', player);
            return (
              <tr className="table-styling" key={index}>
                <td>{firstIndex + index + 1}</td>
                <td>{player.name}</td>
                <td>{player.meta?.age}</td>
                <td>{player.meta?.role}</td>
                <td>{player.meta?.shirtNo}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(player.id, player)}
                    className="update-modal-btn"
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <BootstrapPagination>
        <BootstrapPagination.Prev onClick={handlePre} disabled={currentPage === 1} />
        {playerpages.map((number) => (
          <BootstrapPagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </BootstrapPagination.Item>
        ))}
        <BootstrapPagination.Next onClick={handleNext} disabled={currentPage === lastPage} />
      </BootstrapPagination>
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
              <h5 className="main-heading-modal">Update Player</h5>
              <form>
                <div className="form-section">
                  <div className="form-section1-users">
                    <label htmlFor="team-name">Player Name</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="team-name"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      required
                    />
                    <br />
                    <label htmlFor="country-name">Player Age</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="country-name"
                      value={playerAge}
                      onChange={(e) => setPlayerAge(e.target.value)}
                      required
                    />
                    <br />
                    <label htmlFor="country-name">Player Role</label>
                    <br />
                    <select
                      value={playerRole}
                      onChange={(e) => setPlayerRole(e.target.value)}
                      name=""
                      id=""
                      >
                      required
                      <option value="Batsmen">Batsmen</option>
                      <option value="Bowler">Bowler</option>
                      <option value="All-rounder">All Rounder</option>
                    </select>
                    <br />
                    <label htmlFor="country-name">Player Shirt Number</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="country-name"
                      value={playerShirtNumber}
                      onChange={(e) => setPlayerShirtNumber(e.target.value)}
                      required
                    />
                    <br />
                  </div>
                  <br />
                  <div className="btn-div">
                    <button
                      onClick={updatePlayer}
                      type="submit"
                      className="btn btn-success"
                    >
                      Update Player
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Sheet>
      </Modal>


      <Footer/>
    </div>
  );
}
export default Teams;
