import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer"
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import BootstrapPagination from "react-bootstrap/Pagination";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Players() {
  const [data, setData] = useState([]);
  const [name, setTeamName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [open, setOpen] = useState(false);
  const [specificOpen, setSpecificOpen] = useState(false);

  const tokenForHeader = localStorage.getItem("user-info");
  console.log("tokenForHeader", tokenForHeader);

  let teamId = localStorage.getItem("teamData").id;

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
          "http://100.80.80.84:3000/identity/getAllPlayers",
          {
            headers: {
              token: `${parseToken}`,
            },
          }
        );
        setData(response.data.identity);
        console.log("setData", response.data.identity);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createPlayer(event) {
    console.log("Next btn clicked");
    event.preventDefault();
    let item = { name, countryName };
    console.log(name, countryName);

    try {
      if (parseToken) {
        let result = await axios.post(
          "http://localhost:3000/identity/addPlayer/${id}",
          item,
          {
            headers: {
              token: `${parseToken}`,
            },
          }
        );
        console.log("result", result.data);
        toast.success("Player Added Successfully");
        setOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error during adding player", error);
    }
  }

  async function getPlayers(event) {
    event.preventDefault();
    let teamId = localStorage.getItem("teamData").id;
    try {
      if (parseToken) {
        const response = await axios.get(
          `http://100.80.80.84:3000/identity/getTeamById/${teamId}`,
          {
            headers: {
              token: `${parseToken}`,
            },
          }
        );
        setData(response.data.identity);
        console.log("setData", response.data.identity);
      }
    } catch (error) {
      console.log(error);
    }
  }
  let [currentPage,setcurrentPage]=useState(1);
  let totalrows = data.length;
  console.log("totalrows",totalrows)
  let rowsperpage = 8;
  let pages = [];
  let lastindex = currentPage * rowsperpage;
  let lastpage=Math.ceil(totalrows/rowsperpage);
  let firstindex = lastindex - rowsperpage;
  let currentEntries = data.slice(firstindex, lastindex);

  for (let i = 1; i <= Math.ceil(totalrows / rowsperpage); i++) {

    pages.push(i);
  }

  function handlePageChange(pageNumbers){
    setcurrentPage(pageNumbers);
  }

  function handleNext(){
    if (currentPage == lastpage) {
      <BootstrapPagination.Next disabled/>
    }
    else{
      setcurrentPage(currentPage + 1);
    }
  }
  function handlePre(){
    if (currentPage >= firstindex) {
      <BootstrapPagination.Prev disabled/>
    }
    else{
      setcurrentPage(currentPage - 1);
    }
  }

  return (
    <div>
      <NavBar />
      <h2 className="team-heading">All Players</h2>

      <table className="table-styling">
        <thead className="table-styling">
          <tr>
            <th>ID</th>
            <th>Player Name</th>
            <th>Age</th>
            <th>Role</th>
            <th>Shirt Number</th>
          </tr>
        </thead>
        <tbody className="table-styling">
          {currentEntries.map((item, index) => (
            <tr className="table-styling" key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.meta.age}</td>
              <td>{item.meta.role}</td>
              <td>{item.meta.shirtNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <BootstrapPagination>
          <BootstrapPagination.Prev onClick={handlePre} />
          {pages.map((number) => (
            <BootstrapPagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </BootstrapPagination.Item>
          ))}
          <BootstrapPagination.Next onClick={handleNext} />
        </BootstrapPagination>
      </div>
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
              <h5 className="main-heading">Add Player</h5>
              <form>
                <div className="form-section">
                  <div className="form-section1-users">
                    <label htmlFor="first-name">Player Name</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="first-name"
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                    <br />
                    <label htmlFor="last-name">Country Name</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="last-name"
                      onChange={(e) => setCountryName(e.target.value)}
                    />
                    <br />
                  </div>
                  <br />
                  <div className="btn-div">
                    <button
                      onClick={createPlayer}
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
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <div className="container">
            <div>
              <h5 className="main-heading">Get Players</h5>
              <form>
                <div className="form-section">
                  <div className="form-section1-users">
                    <label htmlFor="first-name">Team Name</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="first-name"
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                    <br />
                  </div>
                  <br />
                  <div className="btn-div">
                    <button
                      onClick={getPlayers}
                      type="submit"
                      className="btn btn-success"
                    >
                      Get Player
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

export default Players;
