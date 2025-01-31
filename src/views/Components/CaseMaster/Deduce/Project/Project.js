import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Button, CardBody, CardHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@material-ui/core";

//*Actions
// import { searchExternalData } from "../../../Redux/Creators/ExternalDataCreators";

//*Components
// import Table
import ProjectTable from "./ProjectTable";

function Project(props) {
  const token = props.login?.login?.token;
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    // props.searchExternalData(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      //   props.searchExternalData(data);
    }
    return;
  };

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <div className="container-fluid">
      <br />

      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1">
          <Row>
            <Col md={6} className="pl-3 pt-3">
              <Typography variant="h4">Project</Typography>
            </Col>
            <Col md={6}>
              <TextField
                fullWidth
                type="search"
                variant="outlined"
                margin="normal"
                size="small"
                label="search"
                // onChange={(event) => handleChangeSearch(event)}
                // onKeyDown={(event) => handleSearchEnter(event)}
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
          <ProjectTable />
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
    // searchExternalData: (data) => dispatch(searchExternalData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
