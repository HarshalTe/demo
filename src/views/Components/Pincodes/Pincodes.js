import React from "react";
import { connect } from "react-redux";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Compoenets
import PincodeMasterTable from "./PincodesTable";

//*Actions
import { searchPincodes } from "../../../Redux/Creators/PincodeCreators";
import { getDropdownsList } from "../../../Redux/Creators/DropdownCreators";


function Pincodes(props) {
  const token = props.login?.login?.token;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("dataaa");
    let data = {
      token: token,
    };
    props.getDropdownsList(data);
  };

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      search: searchTerm,
    };
    // props.searchPincodes(data, token);
  };

  const handleSearchEnter = (event) => {
    const data = {
      search: searchTerm,
    };
    if (event.key == "Enter") {
      setFilter(searchTerm)
    }
    return;
  };
  return (
    <div className="container-fluid">
      <br />
      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
          <Row>
            <Col md={6}><strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Pincodes Master</strong></Col>

            <Col md={6}>
              <TextField
                fullWidth
                type="search"
                variant="outlined"
                margin="normal"
                size="small"
                label="search"
                onChange={(event) => handleChangeSearch(event)}
                onKeyDown={(event) => handleSearchEnter(event)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="search"
                        color={searchTerm == "" ? "default" : "success"}
                        // onClick={() => handleSearch()}
                        onClick={() => setFilter(searchTerm)}
                        style={{ padding: "0px" }}
                      >
                        <SearchSharpIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div>
            <PincodeMasterTable searchTerm={filter} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchPincodes: (data, token) => dispatch(searchPincodes(data, token)),
    getDropdownsList: (data) => dispatch(getDropdownsList(data)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pincodes);
