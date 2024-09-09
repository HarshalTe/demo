import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Button, CardBody, CardHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Actions
import { searchNegativeProjectsData } from "../../../Redux/Creators/NegativeProjectsCreators";

//*Components
import NegativeProjectsTable from "./NegativeProjectsTable";

function NpaProjectsMaster(props) {
  const token = props.login?.login?.token;
  const [searchTerm, setSearchTerm] = useState("");

  //* Search
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    props.searchNegativeProjectsData(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      props.searchNegativeProjectsData(data);
    }
    return;
  };
  //*Search End
  return (
    <div className="container-fluid">
      <br />
      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
          <Row>
            <Col md={6}>
            <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">NPA Project Master</strong>

            </Col>
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
                        onClick={() => handleSearch()}
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
        <CardBody className="p-0">
          <div>
            <NegativeProjectsTable />
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
    searchNegativeProjectsData: (data) =>
      dispatch(searchNegativeProjectsData(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NpaProjectsMaster);
