import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  "Images Added",
  "Images Uploaded",
  "Getting Results",
  "Generating Report",
  "Text Report Generated",
  "Done",
];

export default function HorizontalLinearAlternativeLabelStepper({
  activeStep,
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{
          "& .MuiStepConnector-line": {
            borderColor: "grey",
          },
          "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
            borderColor: "green",
          },
          "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
            borderColor: "green",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: "grey",
                  "&.Mui-active": {
                    color: "green",
                  },
                  "&.Mui-completed": {
                    color: "green",
                  },
                },
              }}
              sx={{
                "& .MuiStepLabel-label": {
                  color: "white",
                },
                "& .MuiStepLabel-label.Mui-active": {
                  color: "white",
                },
                "& .MuiStepLabel-label.Mui-completed": {
                  color: "white",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
