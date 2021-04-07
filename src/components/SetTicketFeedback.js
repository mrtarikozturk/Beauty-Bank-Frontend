import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../context/AppContext";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(10),
      padding: theme.spacing(3),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: "95%",
  },
  formInputs: {
    display: "flex",
    flexDirection: "row",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    minWidth: "100%",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  profile_image: {
    display: "flex",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
}));

const SetTicketFeedback = ({ selectedTicket, handleClose }) => {
  // constants
  const classes = useStyles();
  const { user } = useContext(AppContext);

  //useStates
  const [fed, setFed] = useState(null);
  const [file, setFile] = useState(null);
  const [fedImages, setFedImages] = useState(null);

  // validation obj
  const validationSchema = yup.object().shape({
    content: yup
      .string()
      .required("This field is required")
      .min(100, "Must be at least 100 characters")
      .max(1500, "Must be a maximum of 1500 characters"),
  });

  async function onSubmit(values) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
      body: JSON.stringify({
        content: values.content,
      }),
    };

    const response = await fetch(selectedTicket.feedback_url, requestOptions);
    const data = await response.json();
    setFed(data);
  }

  const initialValues = {
    content: "",
  };

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleUploadImage = async (event) => {
    let fileObj = [];
    let fileArray = [];
    let images = [];
    fileObj.push(event.target.files);

    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
      images.push(fileObj[0][i]);
    }

    setFile(fileArray);
    setFedImages(images);
  };

  const handleUpload = async (event) => {
    for (let i = 0; i < fedImages.length; i++) {
      let form_data = await new FormData();
      await form_data.append("image", fedImages[i]);
      // TODO: API degisecek
      axios
        .post(
          `https://bbank-backend-app.herokuapp.com/ticket/feedback-imageupload/${fed?.id}`,
          form_data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user?.tokens?.access}`,
            },
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    handleClose();
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <form
              className={classes.form}
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <div className={classes.formInputs}>
                <Grid item xs={12}>
                  <TextField
                    label="Set Ticket Feedback Content"
                    name="content"
                    autoComplete="cnt"
                    required
                    fullWidth
                    {...formik.getFieldProps("content")}
                    error={formik.touched.content && formik.errors.content}
                    helperText={formik.touched.content && formik.errors.content}
                  />
                </Grid>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Set Ticket Feedback
              </Button>
            </form>
            {fed && (
              <>
                <Typography variant="body2" color="textSecondary" component="p">
                  {fed.content}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  {file?.map((imgUrl) => (
                    <Avatar
                      alt={"feedback_images"}
                      src={imgUrl}
                      className={classes.large}
                    />
                  ))}
                </div>
                {!file ? (
                  <Grid item xs={6} className={classes.profile_image}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleUploadImage}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                        component="span"
                      />
                    </label>
                  </Grid>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 10, textAlign: "center" }}
                    onClick={handleUpload}
                  >
                    Upload Image
                  </Button>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
};

export { SetTicketFeedback };
