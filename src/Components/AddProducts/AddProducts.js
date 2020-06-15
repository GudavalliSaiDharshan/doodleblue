import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  FormControl,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  Checkbox,
  withStyles,
  Button,
  Divider,
  IconButton,
  CardActions,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import "../AddProducts/AddProducts.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { dataList } from "../../data";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const AddProducts = (props) => {
  // const [age, setAge] = useState("");
  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState("select");
  const [productTitle, setProductTitle] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [blob, setBlob] = useState();

  const { handleClose, dataArr, editable, list, index } = props;

  // console.log(list, "list");

  useEffect(() => {
    if (list) {
      console.log(list);
      setCategory(list.category);
      setProductTitle(list.productName);
      setPrice(list.rate);
      setChecked(list.top_Products);
      setSelectedFile(list.img_url);
      setBlob(list.blob);
    }
  }, [dataList]);

  console.log(blob);
  console.log(typeof selectedFile);
  const handleChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const handleChecked = (e) => {
    setChecked(!checked);
  };

  const fileChangedHandler = (e) => {
    // console.log(file);
    setSelectedFile(e.target.files[0]);
  };

  const saveHandler = () => {
    var url = URL.createObjectURL(selectedFile);
    console.log(url, "s");
    if (
      category &&
      productTitle &&
      price &&
      selectedFile &&
      checked !== ("" || null)
    ) {
      var newList = {
        category: category,
        img_url: url,
        rate: price,
        productName: productTitle,
        blob: true,
        top_Products: checked,
      };

      dataArr.push(newList);
      dataList.push(newList);
      handleClose();
    } else {
      alert("fill all the details");
    }
  };

  const editHandler = () => {
    var url = URL.createObjectURL(selectedFile);
    console.log(url, "s");
    if (
      category &&
      productTitle &&
      price &&
      selectedFile &&
      checked !== ("" || null)
    ) {
      var newList = {
        category: category,
        img_url: url,
        rate: price,
        productName: productTitle,
        blob: true,
        top_Products: checked,
      };
      console.log(newList);
      dataArr[index] = newList;
      handleClose();
    }
    // window.location.reload();
  };

  return (
    <Card style={{ width: "20%", padding: "2%" }}>
      <CardHeader
        title={editable ? "Edit Product" : "Add Product"}
        style={{ textAlign: "center" }}
        action={
          <IconButton aria-label="settings">
            <CancelIcon onClick={handleClose} />
          </IconButton>
        }
      />
      <CardContent>
        <div>
          <Typography>Product Category</Typography>
          <FormControl
            variant="outlined"
            style={{ width: "100%", height: "30%" }}
          >
            <Select
              id="demo-simple-select"
              placeholder="Select"
              inputProps={{ "aria-label": "Without label" }}
              value={category}
              onChange={handleChange}
              defaultValue="select"
            >
              <MenuItem value="select" disabled>
                Select
              </MenuItem>
              <MenuItem value="shoes">Shoes</MenuItem>
              <MenuItem value="t-shirts">T-Shirts</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ marginTop: "4%" }}>
          <Typography>Product Title</Typography>
          <FormControl
            style={{
              width: "100%",
            }}
          >
            <TextField
              id="productTitle"
              placeholder="Enter product title"
              variant="outlined"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </FormControl>
        </div>
        <div style={{ marginTop: "4%" }}>
          <Typography>Price</Typography>
          <FormControl
            style={{
              width: "100%",
            }}
          >
            <TextField
              id="productTitle"
              placeholder="Enter price"
              variant="outlined"
              value={price}
              //   error={validFirstName}
              //   helperText={validFirstName ? "please fill in your name!" : " "}
              //   onBlur={validateFirstName}
              onChange={(e) => setPrice(e.target.value)}
              //   style={{
              //     background: "silver",
              //     opacity: 0.3,
              //   }}
            />
          </FormControl>
        </div>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={checked}
              onChange={handleChecked}
              name="checkedG"
            />
          }
          label="Top Products"
        />
        <div>
          <Typography>Upload Product Image</Typography>
          <input
            accept="image/*"
            style={{
              display: "none",
            }}
            id="raised-button-file"
            onChange={fileChangedHandler}
            // multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="outlined"
              component="span"
              className="upload"
              style={{
                color: "#FF6666",
                borderColor: "#FF6666",
              }}
            >
              Upload
            </Button>
          </label>
        </div>
        <Divider style={{ marginTop: "4%" }} />
        <div
          style={{
            marginTop: "4%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            style={{ background: "#e1e1e1", width: "30%" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="btn"
            style={{
              color: "white",
              width: "30%",
            }}
            onClick={editable ? editHandler : saveHandler}
          >
            {editable ? "Update" : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddProducts;
