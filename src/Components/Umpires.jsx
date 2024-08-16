import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"
import Card from "react-bootstrap/Card";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";

function Umpires() {
  const [data, setData] = useState([]);
  const [umpireModal, setUmpireModal] = useState(false);
  const [name, setUmpireName] = useState("");
  const [description, setUmpireDescription] = useState("");
  const [imageUrl, setUmpireImageURL] = useState("");
  const [identityNo, setUmpireIdentityNo] = useState("");
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
      getUmpire();
    }
  }, [parsedToken]);

  async function addUmpire(event) {
    event.preventDefault();
    let item = {
      name,
      description,
      imageUrl,
      identityNo,
    };
    try {
      if (parsedToken) {
        let result = await axios.post(
          `http://100.80.80.84:3000/identity/addEmpire`,
          item,
          {
            headers: {
              token: `${parsedToken}`,
            },
          }
        );
        console.log("result", result.data);
        toast.success("Umpire Added Successfully");
        setUmpireModal(false);
        getUmpire();
      }
    } catch (error) {
      toast.error("Umpire Addition Failed");
      console.error("Error during adding umpire", error);
    }
  }

  async function getUmpire() {
    try {
      console.log("token", parsedToken);
      if (parsedToken) {
        const response = await axios.get(
          `http://100.80.80.84:3000/identity/getAllEmpires`,
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

  async function updateUmpire(event) {
    event.preventDefault();
    let item = {
      name,
      description,
      imageUrl,
    };
    console.log("item in update", item);
    try {
      await axios.put(
        `http://100.80.80.84:3000/identity/updateEmpire/${selectedUmpireId}`,
        item,
        {
          headers: {
            token: `${parsedToken}`,
          },
        }
      );
      toast.success("Data Updated Successfully!");
      getUmpire();
      setUpdateModal(false);
    } catch (error) {
      toast.error("Error While Updation");
      getUmpire();
      setUpdateModal(false);
      console.log("Error during update", error);
    }
  }

  function handleUpdate(umpireid, umpire) {
    setSelectedUmpireId(umpireid);
    setUmpireName(umpire.name);
    setUmpireDescription(umpire.meta.description);
    setUmpireImageURL(umpire.meta.imageUrl);
    setUpdateModal(true);
  }

  function handleModal() {
    setUmpireModal(true);
  }

  return (
    <>
      <Navbar />
      <h2 className="team-heading">All Umpires</h2>
      <div className="add-team-btn-div">
        <button onClick={handleModal} className="add-team-btn">
          Add New Umpire
        </button>
      </div>
      <ToastContainer />
      <div className="umpire-container">
        {data.map((item, index) => (
          <Card className="card" key={index} style={{ width: "18rem" }}>
            <Card.Img className="card-image" variant="top" src={item.meta.imageUrl} />
            <Card.Body>
              <Card.Title className="card-text-heading">{item.name}</Card.Title>
              <Card.Text className="card-text">{item.meta.description}</Card.Text>
              <div className="react-icon">
              <FaEdit
                onClick={() => handleUpdate(item.id, item)}
                style={{ color: "gray", width: "30px", height: "29px", }}
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
              <h5 className="main-heading-modal">Add Umpire</h5>
              <form onSubmit={addUmpire}>
                <div className="form-section">
                  <div className="form-section1-users">
                    <label htmlFor="umpire-name">Umpire Name</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="umpire-name"
                      onChange={(e) => setUmpireName(e.target.value)}
                      required
                    />
                    <br />
                    <label htmlFor="umpire-description">Umpire Description</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="umpire-description"
                      onChange={(e) => setUmpireDescription(e.target.value)}
                      required
                    />
                    <br />
                    <label htmlFor="umpire-image-url">Umpire Image URL</label>
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
                  <label htmlFor="umpire-identity-no">Identity Number</label>
                  <br />
                  <input
                    className="input-bar-team"
                    type="text"
                    id="umpire-identity-no"
                    onChange={(e) => setUmpireIdentityNo(e.target.value)}
                    required
                  />
                  <br />
                  <br />
                  <div className="btn-div">
                    <button type="submit" className="btn btn-success">
                      Add Umpire
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
              <h5 className="main-heading-modal">Update Umpire</h5>
              <form>
                <div className="form-section">
                  <div className="form-section1-users">
                    <label htmlFor="team-name">Umpire Name</label>
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
                    <label htmlFor="country-name">Umpire Description</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="country-name"
                      value={description}
                      onChange={(e) => setUmpireDescription(e.target.value)}
                      required
                    />
                    <br />
                    <label htmlFor="country-name">Umpire Image URL</label>
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
                      onClick={updateUmpire}
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
    </>
  );
}

export default Umpires;
