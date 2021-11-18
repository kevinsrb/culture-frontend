import React, { useEffect, useState } from "react";
import {
  Header,
  Container,
  Form,
  Input,
  Button,
  Grid,
  Segment,
  Divider,
  Radio,
  Modal,
  Link,
} from "semantic-ui-react";

import ApiEndPoint from "../../utils/apiEndPoints";
import { setDefaultHeader, apiCall, successToast, errorToast } from "../../utils/httpClient";

import DatePicker from "react-date-picker";
import moment from "moment";

export default function EditEducationjurados(props) {
  const {
    editData,
    masterData,
    setEditData,
    getFormalEducationData,
    setIsLoading,
  } = props;
  const masterFilter = (type) =>
    (masterData && masterData.filter((item) => item.type == type)) || [];

  const [openDropdown, setOpenDropdown] = useState("");
  const [placeEducation, setPlaceEducation] = useState("");
  const [placeTown, setPlaceTown] = useState("");
  const [resumeData, setResumeData] = useState({});
  const [valueda, setvalueda] = useState("");
  const [selectDate, setSelectDate] = useState(new Date());
  const [identityDocumentFile, setIdentityDocumentFile] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
 
  useEffect(() => {
    setResumeDetail();
  }, []);

  async function setResumeDetail() {
    const resData = await localStorage.getItem("resumeData");
    const val = JSON.parse(resData);
    console.log("val: ", val);
    await setResumeData(val);
  }

  async function handelDropdown(type) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }

  async function handleSelectChange(type, item) {
    if (type == "education") {
      setEditData({
        ...editData,
        education_level: item.id,
      });
    }
    if (type == "town") {
      setEditData({
        ...editData,
        town: item.city_id,
      });
    }

    setvalueda(item.value);
    setOpenDropdown("");
  }
  const onDocumentFile = (event) => {
    console.log("event: ", event);
    setIdentityDocumentFile(event.target.files[0]);
    console.log("event.target.files[0]: viren==> ", event.target.files[0]);
  };
  function formValidation(item) {
    let formErrors = {};
    let formIsValid = true;

    if (!editData.education_level) {
      formIsValid = false;
      formErrors["education_level"] = "Nivel de educación. is required !";
    }
    if (!editData.qualification) {
      formIsValid = false;
      formErrors["qualification"] = "Título is required !";
    }
    if (!editData.educational_institution) {
      formIsValid = false;
      formErrors["educational_institution"] =
        "Institución educativa is required !";
    }
    if (!editData.town) {
      formIsValid = false;
      formErrors["town"] = "Ciudad is required !";
    }
    if (!editData.graduate_status) {
      formIsValid = false;
      formErrors["graduate_status"] = "¿Graduado is required !";
    }
    if (!editData.date_graduation) {
      formIsValid = false;
      formErrors["date_graduation"] = "Fecha de graduación is required !";
    }
    // if (!identityDocumentFile || !editData.certification) {
    //   formIsValid = false;
    //   formErrors["document"] = "Adjuntar diploma / certificación is required !";
    // }
    setFormErrors(formErrors);
    return formIsValid;
  }
  async function formUpdate() {
    if (formValidation()) {
      setIsLoading(true);
      let formdataSave = new FormData();
      formdataSave.append("education_id", editData.education_id);
      formdataSave.append("resume_id", editData.resume_id);
      formdataSave.append("education_level", editData.education_level);
      formdataSave.append("qualification", editData.qualification);
      formdataSave.append(
        "educational_institution",
        editData.educational_institution
      );
      formdataSave.append("town", editData.town);
      formdataSave.append("graduate_status", editData.graduate_status);
      formdataSave.append(
        "date_graduation",
        moment(selectDate).format("DD-MM-YYYY")
      );
      formdataSave.append("document", identityDocumentFile);
      const header = { "Content-Type": "multipart/form-data" };

      const { data } = await apiCall(
        "POST",
        ApiEndPoint.UPDATEFORMALEDUCATION,
        formdataSave,
        header
      );
      if (data.status == 200) {
        setIsLoading(false);
        getFormalEducationData(0);
        props.setEditEduOpen(false);
        successToast(data.message);
        //  window.location.reload();
      } else {
        setIsLoading(false);
        errorToast(data.message)
      }
    }
  }
  
  function cleanEditDetails(params) {
    setEditData({
      ...editData,
      education_level: 0,
      qualification: "",
      educational_institution: "",
      town: "",
      graduate_status: 1,
      date_graduation: new Date(),
      certification: "",
      education_level_text: "",
    });
    setSelectDate(new Date());
    setIdentityDocumentFile({});
    setPlaceEducation("");
    setPlaceTown();
  }
  async function handelClickPhotoImg() {
    document.getElementById("identityDocumentFile").click();
  }
  return (
    <div>
      <Modal
        onClose={() => props.setEditEduOpen(false)}
        onOpen={() => props.setEditEduOpen(true)}
        open={props.editEduOpen}
        className="model--div"
        >
        <Modal.Content className="model--containt">
          <Grid className="model--headr">
            <Grid.Column floated="left" width={10}>
              <Header as="h4" className="jura--form-heading" floated="left">
                Editar Educación Formal -{" "}
                <small>Todos los campos son obligatorios</small>
              </Header>
            </Grid.Column>
            <Grid.Column
              floated="right text-right"
              width={5}
              style={{ textAlign: "right" }}
            >
              <p
                className="model--close-icon"
                onClick={() => {
                  getFormalEducationData(0);props.setEditEduOpen(false); 
                }}
                  >
                X{" "}
              </p>
            </Grid.Column>
          </Grid>
          <Grid style={{ width: "100%", margin: 0 }}>
            <Grid.Column style={{ maxWidth: "99%" }}>
              <Form size="large">
                <Divider clearing />
                <Grid columns={4}>
                  <Grid.Row>
                    <Grid.Column style={{ display: "flex" }}>
                      <Form className="form--dec-input">
                        <label>Nivel de educación</label>
                        <Form.Field>
                          <Form.Select
                            placeholder={
                              placeEducation == ""
                                ? editData?.education_level_text
                                : placeEducation
                            }
                            onClick={() => handelDropdown("education")}
                            className="select--val"
                            required={true}
                            error={
                              !editData.education_level &&
                              formErrors?.education_level
                            }
                          />
                          {openDropdown && openDropdown == "education" ? (
                            <Grid columns={1} className="select__box">
                              <Grid.Row>
                                <Grid.Column className="select__box_clm">
                                  <Grid>
                                    {masterFilter("education").map(
                                      (item, i) => {
                                        return (
                                          <p
                                            key={i}
                                            className={`form-slct ${
                                              editData?.education_level ==
                                              item.id
                                                ? "active"
                                                : ""
                                            }`}
                                          >
                                            <p
                                              className="form-slct_text"
                                              onClick={() => (
                                                setPlaceEducation(item.text),
                                                handleSelectChange(
                                                  "education",
                                                  item
                                                )
                                              )}
                                            >
                                              {item.text}{" "}
                                            </p>
                                          </p>
                                        );
                                      }
                                    )}
                                  </Grid>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          ) : (
                            ""
                          )}
                        </Form.Field>
                      </Form>
                    </Grid.Column>
                    <Grid.Column>
                      <label>Título</label>
                      <Form.Input
                        fluid
                        placeholder=""
                        value={editData?.qualification}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            qualification: e.target.value,
                          })
                        }
                        name="numero_documento"
                        type="text"
                        required={true}
                        error={
                          !editData.qualification && formErrors?.qualification
                        }
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <label>Institución educativa</label>
                      <Form.Input
                        fluid
                        placeholder=""
                        value={editData?.educational_institution}
                        name="numero_documento"
                        type="text"
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            educational_institution: e.target.value,
                          })
                        }
                        required={true}
                        error={
                          !editData.educational_institution &&
                          formErrors?.educational_institution
                        }
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form className="form--dec-input">
                        <label>Ciudad</label>
                        <Form.Field>
                          <Form.Select
                            placeholder={
                              placeTown != "" ? placeTown : editData?.town_name
                            }
                            onClick={() => handelDropdown("town")}
                            className="select--val"
                            error={!editData.town && formErrors?.town}
                          />
                          {openDropdown && openDropdown == "town" ? (
                            <Grid columns={1} className="select__box">
                              <Grid.Row>
                                <Grid.Column className="select__box_clm">
                                  <Grid>
                                    {props.citiesData &&
                                      props.citiesData.length &&
                                      props.citiesData.map((item, i) => {
                                        return (
                                          <p
                                            key={i}
                                            onClick={() => {
                                              handleSelectChange("town", item);
                                              setPlaceTown(item.city_name);
                                            }}
                                            className={`form-slct ${
                                              item.city_id == editData?.town
                                                ? "active"
                                                : ""
                                            }`}
                                          >
                                            <p className="form-slct_text">
                                              {item.city_name}
                                            </p>
                                          </p>
                                        );
                                      })}
                                  </Grid>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          ) : (
                            ""
                          )}
                        </Form.Field>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column style={{ display: "flex" }}>
                            <Form className="form--dec-input">
                              <label>¿Graduado?</label>
                              <Radio
                                name="aa"
                                value="1"
                                label="Si"
                                className="form--radi-btn"
                                onClick={() =>
                                  setEditData({
                                    ...editData,
                                    graduate_status: 1,
                                  })
                                }
                                checked={
                                  editData.graduate_status == 1 ? true : false
                                }
                              />
                              <Radio
                                name="aa"
                                value="2"
                                label="No"
                                className="form--radi-btn"
                                onClick={(e) =>
                                  setEditData({
                                    ...editData,
                                    graduate_status: 2,
                                  })
                                }
                                checked={
                                  editData.graduate_status == 2 ? true : false
                                }
                              />
                            </Form>
                          </Grid.Column>
                          <Grid.Column>
                            <label>Título</label>
                            <DatePicker
                              /* onChange={(e)=>setSelectDate(e.target.value)} */
                              onChange={setSelectDate}
                              value={selectDate}
                              className="date_pkr date_pkr_edit"
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                    <Grid.Column>
                      <Form className="form--dec-input">
                        <label>Adjuntar diploma / certificación</label>
                        <Input
                          type="file"
                          id="identityDocumentFile"
                          onChange={(e) => onDocumentFile(e)}
                          style={{ display: "none" }}
                        />
                        <div
                          onClick={() => handelClickPhotoImg()}
                          className="curser-pointer"
                        >
                          <Input
                            label={{ basic: true, content: "Adjuntar" }}
                            labelPosition="right"
                            placeholder=""
                            value={
                              identityDocumentFile?.name
                                ? identityDocumentFile?.name
                                : editData?.certification
                            }
                            className="usr--img-input"
                            width={60}
                            style={{width:'81%'}}
                          />
                        </div>
                      </Form>
                      {formErrors && formErrors.document && (
                        <small className="text-red">
                          {formErrors.document}
                        </small>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider clearing />
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid className="form--buton-box form--education mt-1">
                        {/* <span
                          onClick={() => props.setEditEduOpen(false)}
                          className=""
                        >
                          Cancelar
                        </span> */}
                        <span
                          onClick={cleanEditDetails}
                          className="link--educat curser-pointer"
                        >
                          Limpiar campos
                        </span>
                        <Button
                          content="Guardar Cambios"
                          className="btn btn-primary"
                          onClick={() => formUpdate()}
                        />
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    </div>
  );
}
