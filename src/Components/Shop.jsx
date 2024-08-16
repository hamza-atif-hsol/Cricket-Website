import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "react-bootstrap/Card";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination as BootstrapPagination } from 'react-bootstrap';

function Shop() {
  const [data, setData] = useState([]);
  const [shopModal, setShopModal] = useState(false);
  const [shop2Modal, setShop2Modal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [name, setShirtName] = useState("");
  const [description, setShirtDescription] = useState("");

  const tokenForHeader = localStorage.getItem("user-info");
  const parsedToken = tokenForHeader ? JSON.parse(tokenForHeader) : null;

  useEffect(() => {
    if (parsedToken) {
      getShop();
    }
  }, [parsedToken]);

  async function createShop(event) {
    event.preventDefault();
    const item = {
      name,
      description,
    };
    try {
      if (parsedToken) {
        const result = await axios.post(
          `http://100.80.80.84:3000/identity/addEmpire`,
          item,
          {
            headers: {
              token: `${parsedToken}`,
            },
          }
        );
        console.log("result", result.data);
        toast.success("Shirt Added Successfully");
        setShopModal(false);
        getShop();
      }
    } catch (error) {
      toast.error("Shirt Addition Failed");
      console.error("Error during adding umpire", error);
    }
  }

  async function getShop() {
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
        const fetchedData = response.data;
        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else {
          console.error("Fetched data is not an array:", fetchedData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleOrder() {
    setShopModal(true);
  }

  function handleModal() {
    setShop2Modal(true);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const totalRows = data.length;
  console.log("totalRows", totalRows);
  const rowsPerPage = 7;
  const playerpages = [];
  const lastIndex = currentPage * rowsPerPage;
  const lastPage = Math.ceil(totalRows / rowsPerPage);
  const firstIndex = lastIndex - rowsPerPage;
  //   let currentEntries = data.slice(firstIndex, lastIndex);


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
    <>
      <Navbar />
      <h2 className="team-heading">Welcome to Shops</h2>
      <div className="add-team-btn-div">
        <button onClick={handleModal} className="add-team-btn">
          View Orders
        </button>
      </div>

      <ToastContainer />

      <div className="umpire-container">
        {data.map((item, index) => (
          <Card className="card" key={index} style={{ width: "18rem" }}>
            <Card.Img
              className="card-image"
              variant="top"
              src={item.meta.imageUrl}
            />
            <Card.Body>
              <Card.Title className="card-text-heading">{item.name}</Card.Title>
              <Card.Text className="card-text">
                {item.meta.description}
              </Card.Text>
              <div className="react-icon">
                <button onClick={() => handleOrder(item.id, item)}>Add Order</button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={shopModal}
        onClose={() => setShopModal(false)}
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
              <h5 className="main-heading-modal">Product Detail</h5>
              <form onSubmit={createShop}>
                <div className="form-section">
                  <div className="form-section1-users">
                    <label htmlFor="umpire-name">Product Title</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="umpire-name"
                      onChange={(e) => setShirtName(e.target.value)}
                      required
                      disabled
                    />
                    <br />
                    <label htmlFor="umpire-description">
                      Product Description
                    </label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="umpire-description"
                      onChange={(e) => setShirtDescription(e.target.value)}
                      required
                    />
                    <br />
                  </div>
                  <br />
                  <div className="btn-div">
                    <button type="submit" className="btn btn-success">
                      Create Order
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
        open={shop2Modal}
        onClose={() => setShop2Modal(false)}
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
            <h5 className="main-heading-modal">Products</h5>
            <table className="table-styling tb-style">
              <thead className="table-styling">
                <tr>
                  <th>ID</th>
                  <th>Product Title</th>
                  <th>Product Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="table-styling">
                {data.map((player, index) => {
                  console.log('player:', player);
                  return (
                    <tr className="table-styling" key={index}>
                      <td>{firstIndex + index + 1}</td>
                      <td>{player.name}</td>
                      <td>{player.meta?.age}</td>
                      <td>{player.meta?.status}</td>
                      <td>
                        <button
                          // onClick={() => handleUpdate(player.id, player)}
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
              <h5 className="main-heading-modal">Update Product</h5>
              <form>
                <div className="form-section">
                  <div className="form-section1-users">
                    <label htmlFor="team-name">Product Name</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="team-name"
                      value={name}
                      onChange={(e) => setShirtName(e.target.value)}
                      disabled
                    />
                    <br />
                    <label htmlFor="country-name">Product Description</label>
                    <br />
                    <input
                      className="input-bar-team"
                      type="text"
                      id="country-name"
                      value={description}
                      onChange={(e) => setShirtDescription(e.target.value)}
                      required
                    />
                    <br />
                  </div>
                  <br />
                  <div className="btn-div">
                    <button
                      onClick={createShop}
                      type="submit"
                      className="btn btn-success"
                    >
                      Buy Now
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

export default Shop;
