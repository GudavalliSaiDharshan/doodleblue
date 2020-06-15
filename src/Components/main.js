import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Modal,
  FormControl,
  Select,
  MenuItem,
  ListItem,
  List,
  Menu,
  ListItemText,
  Divider,
  Slider,
  createMuiTheme,
  MuiThemeProvider,
  ListItemAvatar,
  Avatar,
  Box,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import "../Components/main.css";
import AddProducts from "./AddProducts/AddProducts";
import CancelIcon from "@material-ui/icons/Cancel";
import ProductsList from "./ProductsList/ProductsList";
import { dataList } from "../data";

const Main = () => {
  const [open, setOpen] = useState(false);
  const [sorting, setSorting] = useState("select");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState([20, 100]);
  const [data, setData] = useState(dataList);

  useEffect(() => {
    if (sorting === "price High to low") {
      console.log(sorting);
      setData(dataList.sort((a, b) => b.rate - a.rate));
    } else if (sorting === "price Low to High") {
      setData(dataList.sort((a, b) => a.rate - b.rate));
    } else {
      setData(dataList);
    }
  }, [sorting]);
  console.log(data, "sorting");

  const handleValue = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setSorting(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: 30 }}>
      <div>
        <Typography style={{ fontSize: 30, float: "left" }}>
          Products
        </Typography>
        <Button
          className="addBtn"
          style={{ color: "white", fontSize: 20 }}
          onClick={handleOpen}
        >
          Add Product
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          title={
            <img
              src="https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png"
              style={{
                cursor: "pointer",
                float: "right",
                marginTop: "5px",
                width: "20px",
              }}
            />
          }
          //   children={<AddProducts />}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
          }}
        >
          <AddProducts handleClose={handleClose} />
        </Modal>
      </div>
      <div
        style={{
          clear: "both",
          float: "right",
          marginTop: "4%",
          width: "90%",
        }}
      >
        <div style={{ float: "right", width: "15%" }}>
          <FormControl variant="outlined" style={{ width: "100%" }}>
            <Select
              id="demo-simple-select"
              placeholder="Select"
              inputProps={{ "aria-label": "Without label" }}
              value={sorting}
              onChange={handleChange}
              defaultValue="select"
            >
              <MenuItem value="select" disabled>
                Select
              </MenuItem>
              <MenuItem value="price High to low">Price High to low</MenuItem>
              <MenuItem value="price Low to High">Price Low to High</MenuItem>
              <MenuItem value="default sorting">Default sorting</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            clear: "both",
            float: "right",
            marginTop: "1%",
            width: "96%",
          }}
        >
          <ProductsList
            categories={category}
            filterPrice={value}
            sorting={sorting}
            // sortingHandler={sortingHandler}
            dataList={data}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "4%",
          width: "10%",
          float: "left",
        }}
      >
        <Typography
          style={{ fontSize: 10, color: "gray", fontWeight: "bolder" }}
        >
          CATEGORIES
        </Typography>
        <List
          style={{
            marginTop: "4%",
            fontSize: 10,
          }}
        >
          <ListItem button>
            <ListItemText
              style={{ fontSize: 10, marginLeft: "-10%" }}
              primary="Shoes"
              onClick={() => setCategory("shoes")}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              style={{ fontSize: 10, marginLeft: "-10%" }}
              primary="T-Shirts"
              onClick={() => setCategory("t-shirts")}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              style={{ fontSize: 10, marginLeft: "-10%" }}
              primary="Other"
              onClick={() => setCategory("other")}
            />
          </ListItem>
          <Divider />
        </List>
        <div style={{ marginTop: "16%" }}>
          <Typography
            id="range-slider"
            gutterBottom
            style={{ fontSize: 10, color: "gray", fontWeight: "bolder" }}
          >
            FILTER BY PRICE
          </Typography>
          {/* <MuiThemeProvider muiTheme={muiTheme}> */}
          <Slider
            // style={{ width: "10%", color: "#e1e1e1" }}
            value={value}
            onChange={handleValue}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            // getAriaValueText={valuetext}
          />
          {/* <div> */}
          <Button
            style={{ background: "#f85e5e", color: "white" }}
            onClick={() => setCategory("shoes")}
          >
            Filter
          </Button>
          <div style={{ float: "right" }}>
            <Typography style={{ fontSize: 10, color: "gray" }}>
              Price : ${value[0]}-${value[1]}
            </Typography>
          </div>
          {/* </div> */}
          {/* </MuiThemeProvider> */}
        </div>
        <div style={{ marginTop: "14%" }}>
          <Typography
            style={{ fontSize: 10, color: "gray", fontWeight: "bolder" }}
          >
            TOP PRODUCTS
          </Typography>
          <List>
            {dataList
              .filter((d) => d.top_Products === true)
              .map((d, index) => {
                console.log(index);
                return (
                  <ListItem
                    alignItems="flex-start"
                    style={{ marginLeft: "-10%" }}
                    // key={index + 1}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        src={
                          d.blob ? d.img_url : require(`../assets/${d.img_url}`)
                        }
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={d.productName}
                      secondary={
                        <Rating
                          name="read-only"
                          value={index === 2 ? 4 : 5}
                          readOnly
                          style={{ width: 1 }}
                          size="small"
                        />
                      }
                    />
                  </ListItem>
                );
              })}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Main;
