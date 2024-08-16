import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer"
import Card from "react-bootstrap/Card";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";

function Venue() {
  const [data, setData] = useState([]);
  const [umpireModal, setUmpireModal] = useState(false);
  const [name, setUmpireName] = useState("");
  const [stadium, setVenueStadium] = useState("");
  const [imageUrl, setUmpireImageURL] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedUmpireId, setSelectedUmpireId] = useState(null);
  const [parsedToken, setParsedToken] = useState(null);

  useEffect(() => {
    const tokenForHeader = localStorage.getItem("user-info");
    if (tokenForHeader) {
      setParsedToken(JSON.parse(tokenForHeader));
    }
  }, []);

  useEffect(() => {
    if (parsedToken) {
      getVenue();
    }
  }, [parsedToken]);

  async function addVenue(event) {
    event.preventDefault();
    let item = {
      name,
      stadium,
      imageUrl,
    };
    try {
      if (parsedToken) {
        let result = await axios.post(
          `http://100.80.80.84:3000/identity/addVenue`,
          item,
          {
            headers: {
              token: `${parsedToken}`,
            },
          }
        );
        console.log("result", result.data);
        toast.success("Venue Added Successfully");
        setUmpireModal(false);
        getVenue();
      }
    } catch (error) {
      toast.error("Venue Addition Failed");
      console.error("Error during adding umpire", error);
    }
  }

  async function getVenue() {
    try {
      console.log("token", parsedToken);
      if (parsedToken) {
        const response = await axios.get(
          `http://100.80.80.84:3000/identity/getAllVenue`,
          {
            headers: {
              token: `${parsedToken}`,
            },
          }
        );
        setData(response.data.identity);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateVenue(event) {
    event.preventDefault();
    let item = {
      name,
      stadium,
      imageUrl,
    };
    console.log("item in update", item);
    try {
      await axios.put(
        `http://100.80.80.84:3000/identity/updateVenue/${selectedUmpireId}`,
        item,
        {
          headers: {
            token: `${parsedToken}`,
          },
        }
      );
      toast.success("Data Updated Successfully!");
      getVenue();
      setUpdateModal(false);
    } catch (error) {
      toast.error("Error While Updation");
      getVenue();
      setUpdateModal(false);
      console.log("Error during update", error);
    }
  }

  function handleUpdate(umpireid, umpire) {
    setSelectedUmpireId(umpireid);
    setUmpireName(umpire.name);
    setVenueStadium(umpire.meta.stadium);
    setUmpireImageURL(umpire.meta.imageUrl);
    setUpdateModal(true);
  }

  function handleModal() {
    setUmpireModal(true);
  }

  return (
    <>
      <NavBar />
      <h2 className="team-heading">All Venue's</h2>
      <div className="add-team-btn-div">
        <button onClick={handleModal} className="add-team-btn">
          Add New Venue
        </button>
      </div>
      <ToastContainer />
      <div className="umpire-container">
        {data.map((item, index) => (
          <Card className="card" key={index} style={{ width: "18rem" }}>
            <Card.Img  className="card-image" variant="top" src={item.meta.imageUrl} />
            <Card.Body>
              <Card.Title className="card-text">{item.name}</Card.Title>
              <Card.Text className="card-text">{item.meta.stadium}</Card.Text>
              <div className="react-icon">
              <FaEdit
                onClick={() => handleUpdate(item.id, item)}
                style={{ color: "black", width: "30px", height: "29px", }}
              />
              </div>
              
            </Card.Body>
          </Card>
        ))}
      </div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={umpireModal}
        onClose={() => setUmpireModal(false)}
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
              <h5 className="main-heading-modal">Add Venue</h5>
              <form onSubmit={addVenue}>
                <div className="form-section">
                  <div className="form-section1-users">
                    <label htmlFor="umpire-name">Country Name</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="umpire-name"
                      onChange={(e) => setUmpireName(e.target.value)}
                      required
                    />
                    <br />
                    <label htmlFor="umpire-stadium">Stadium Name</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="umpire-stadium"
                      onChange={(e) => setVenueStadium(e.target.value)}
                      required
                    />
                    <br />
                    <label htmlFor="umpire-image-url">Stadium Image URL</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="umpire-image-url"
                      onChange={(e) => setUmpireImageURL(e.target.value)}
                      required
                    />
                    <br />
                  </div>
                  
                  <br />
                  <br />
                  <div className="btn-div">
                    <button type="submit" className="btn btn-success">
                      Add Stadium
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
              <h5 className="main-heading-modal">Update Stadium</h5>
              <form>
                <div className="form-section">
                  <div className="form-section1-users">
                    <label htmlFor="team-name">Country Name</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="team-name"
                      value={name}
                      onChange={(e) => setUmpireName(e.target.value)}
                      disabled
                    />
                    <br />
                    <label htmlFor="country-name">Stadium Description</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="country-name"
                      value={stadium}
                      onChange={(e) => setVenueStadium(e.target.value)}
                      required
                    />
                    <br />
                    <label htmlFor="country-name">Stadium Image URL</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="country-name"
                      value={imageUrl}
                      onChange={(e) => setUmpireImageURL(e.target.value)}
                      required
                    />
                    <br />
                  </div>
                  <br />
                  <div className="btn-div">
                    <button
                      onClick={updateVenue}
                      type="submit"
                      className="btn btn-success"
                    >
                      Update Venue
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Sheet>
      </Modal>
      <Footer/>
    </>
  )
}

export default Venue
