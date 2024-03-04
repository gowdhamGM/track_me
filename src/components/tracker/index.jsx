import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Paper, Box, AppBar, Toolbar} from "@mui/material";
import Select from "react-select";
import StepperComponent from "./Stepper.jsx";
import axios from "axios";
import "./Tracker.css";

const Tracker = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [selectedTenant, setSelectedTenant] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [selectedValues, setSelectedValues] = useState("");
  const [isStepperView, setIsStepperView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleChange = (selectedOption) => {
    setSelectedService(selectedOption.value);
  };

  const data1 = {
    createExchange: [
      {
        name: "checkIMEI",
        status: "Success",
        reason: "",
      },
      {
        name: "checkGSMA",
        status: "Success",
        reason: "",
      },
      {
        name: "checkDuplicateIMEI",
        status: "Success",
        reason: "",
      },
      {
        name: "createExchangeSavedInDB",
        status: "Success",
        reason: "",
      },
    ],
    orderCreateEvent: [
        {name: "queuedMessage",
        status: "Success",
        reason: "",
      },
      {
        name: "messageHistoryProcess",
        status: "Success",
        reason: "",
      },
      {
        name: "getExchangeDetails",
        status: "Failed",
        reason: "Access issue",
      },
      {
        name: "getOrderFromHybris",
        status: "Success",
        reason: "",
      },
      {
        name: "creatingTradeInProcess(MTR)",
        status: "Success",
        reason: "",
      },
      {
        name: "orderStatusUpdate",
        status: "Success",
        reason: "",
      },
    ],
    orderDeliveredEvent: [
      {
        name: "queuedMessage",
        status: "Success",
        reason: "",
      },
      {
        name: "messageHistoryProcess",
        status: "Success",
        reason: "Access issue",
      },
      {
        name: "getExchangeDetails",
        status: "Success",
        reason: "",
      },
      // {
      //   name: "getOrderFromHybris",
      //   status: "Success",
      //   reason: "",
      // },
      // {
      //   name: "confirmTradeInProcess(MTR)",
      //   status: "Failed",
      //   reason:
      //     "Internal Server Error : An error occurred (HY000): SQLSTATE[HY000]: General error: 1364 Field 'site_id' doesn't have a default value",
      // },
    ],
  };


  const handleOrderIdChange = (selectedOption) => {
    setSelectedOrderId(selectedOption.value);

    setIsStepperView(false);
  };

  const handleTenantChange = (selectedOption) => {
    setSelectedTenant(selectedOption.value);
  };

  const handleSubmit = () => {
    setIsStepperView(true);
  };

  const services = [
    { value: "", label: "--- Select ---" },
    { value: "in-store", label: "In-Store" },
    { value: "msa", label: "MSA" },
    { value: "others", label: "Others" },
  ];

  const tenants = [
    { value: "", label: "--- Select ---" },
    { value: "gbr", label: "GBR" },
    { value: "vnm", label: "VNM" },
    { value: "ind", label: "IND" },
  ];

  const orderIds = [
    { value: "", label: "--- Select ---" },
    {
      value: "096c4ad8-dc5a-471c-8b6a-90442744341e",
      label: "096c4ad8-dc5a-471c-8b6a-90442744341e",
    },
    {
      value: "ct6c4ad8-dc5a-471c-8b6a-90442744341e",
      label: "ct6c4ad8-dc5a-471c-8b6a-90442744341e",
    },
  ];

  useEffect(() => {
    setServiceList(services);
  }, []);

  return (
  <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Track Me
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className="container">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1" align="center" gutterBottom>
                Services
              </Typography>
              <Select
                value={services.find((option) => option.value === selectedService)}
                onChange={handleChange}
                options={serviceList}
                placeholder="Select Service"
              />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" align="center" gutterBottom>
                Tenants
              </Typography>
              <Select
                value={tenants.find((option) => option.value === selectedTenant)}
                onChange={handleTenantChange}
                options={tenants}
                placeholder="Select Tenant"
              />
            </Grid>
            {selectedService === "msa" && (
              <Grid item xs={3}>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Order IDs
                </Typography>
                <Select
                  value={orderIds.find(
                    (option) => option.value === selectedOrderId
                  )}
                  onChange={handleOrderIdChange}
                  options={orderIds}
                  placeholder="Select Order ID"
                />
              </Grid>
            )}
            {selectedService === "in-store" && (
              <Grid item xs={3}>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Reservation IDs
                </Typography>
                <Select
                  value={orderIds.find(
                    (option) => option.value === selectedOrderId
                  )}
                  onChange={handleOrderIdChange}
                  options={orderIds}
                  placeholder="Select Order ID"
                />
              </Grid>
            )}
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                style={{ width: "200px" }}
              >
                Submit
              </Button>
            </Grid>
            {true ? (
              <Grid item xs={12}>
                   <Typography variant="h5" align="center" gutterBottom>
                    Status
                  </Typography>
                  <Paper elevation={3} sx={{ backgroundColor: '#f5f5f5' }}>
                    <Box p={2}>
                      <StepperComponent data={data1} />
                    </Box>
                  </Paper>
                </Grid>
            ) : <p>Please select the inputs</p>}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Tracker;
