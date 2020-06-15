import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Modal,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import AddProducts from "../AddProducts/AddProducts";

const ProductsList = (props) => {
  const { categories, filterPrice, sorting, dataList } = props;
  const [data, setData] = useState(dataList);
  const [page, setPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState(dataList.slice(0, 9));
  const [open, setOpen] = useState(false);
  const [list, setList] = useState({});
  const [index, setIndex] = useState();

  // console.log(dataList, "check");

  useEffect(() => {
    // alert(dataList);
    setData(dataList);
    // setPage(1);
    // setCurrentPageData(data.slice(0, 9));
  }, [dataList]);

  console.log("sorted", dataList);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onPageChange = (event, value) => {
    setPage(value);
    const currentData = dataList.slice((value - 1) * 9, value * 9);
    setCurrentPageData(currentData);
  };

  console.log(data.length, "length");

  const editHandler = (d, i) => {
    setList(d);
    setIndex(i);
    setOpen(true);
  };

  return (
    <div>
      <div>
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
          <AddProducts
            handleClose={handleClose}
            editable={true}
            list={list}
            index={index}
          />
        </Modal>
      </div>
      <div
        style={{
          flex: 1,
          height: "100%",
          width: 1330,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {categories === ""
          ? currentPageData.map((d, index) => {
              return (
                <div
                  class="card col-sm-3 col-md-3 col-lg-3"
                  style={{ width: "100%", margin: 10 }}
                >
                  <a onClick={() => editHandler(d, index)}>
                    <img
                      // src={require(`../../assets/${d.img_url}`)}
                      src={
                        d.blob
                          ? d.img_url
                          : require(`../../assets/${d.img_url}`)
                      }
                      class="card-img-top img-fluid"
                      style={{ width: "100%", height: "16rem" }}
                    />
                    <div class="card-body ">
                      <h5
                        class="card-title justify-content-center"
                        style={{ textAlign: "center" }}
                      >
                        {d.productName}
                      </h5>
                      <p
                        class="card-text"
                        style={{
                          textAlign: "center",
                          textDecorationLine: d.saleRate
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {Number(d.rate).toFixed(2) + "$"}
                      </p>
                      <p
                        class="card-text"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {d.saleRate
                          ? Number(d.saleRate).toFixed(2) + "$"
                          : null}
                      </p>
                    </div>
                  </a>
                </div>
              );
            })
          : currentPageData
              .filter(
                (d) =>
                  d.category === categories ||
                  (d.rate && d.saleRate === filterPrice)
                // ||
                // (sorting === "price High to low" ? alert(sorting) : null)
              )
              .map((d, index) => {
                return (
                  <div
                    class="card col-sm-3 col-md-3 col-lg-3"
                    style={{ width: "100%", margin: 10 }}
                  >
                    <a onClick={() => editHandler(d, index)}>
                      <img
                        // src={require(`../../assets/${d.img_url}`)}
                        src={
                          d.blob
                            ? d.img_url
                            : require(`../../assets/${d.img_url}`)
                        }
                        class="card-img-top img-fluid"
                        style={{ width: "100%", height: "16rem" }}
                      />
                      <div class="card-body ">
                        <h5
                          class="card-title justify-content-center"
                          style={{ textAlign: "center" }}
                        >
                          {d.productName}
                        </h5>
                        <p
                          class="card-text"
                          style={{
                            textAlign: "center",
                            textDecorationLine: d.saleRate
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {Number(d.rate).toFixed(2) + "$"}
                        </p>
                        <p
                          class="card-text"
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {d.saleRate
                            ? Number(d.saleRate).toFixed(2) + "$"
                            : null}
                        </p>
                      </div>
                    </a>
                  </div>
                );
              })}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(dataList.length / 9)}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ProductsList;
