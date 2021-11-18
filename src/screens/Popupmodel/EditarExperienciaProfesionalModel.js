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
  TextArea,
} from "semantic-ui-react";
import DatePicker from "react-date-picker";
import moment from "moment";
import ApiEndPoint from "../../utils/apiEndPoints";
import {
  setDefaultHeader,
  apiCall,
  successToast,
  errorToast,
} from "../../utils/httpClient";

export default function EditarExperienciaProfesionalModel(props) {
  const { editData, setEditData, getProfessionalExperienceData, setIsLoading } =
    props;

  const [selectStartDate, setSelectStartDate] = useState("");
  const [selectEndDate, setSelectEndDate] = useState("");
  const [identityDocuments, setIdentityDocuments] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    editData?.start_date &&
      setSelectStartDate(
        new Date(moment(editData.start_date, "DD-MM-YYYY").format())
      );
    editData?.finish_date &&
      setSelectEndDate(
        new Date(moment(editData.finish_date, "DD-MM-YYYY").format())
      );
  }, [editData]);

  // const onDocumentFile = (event) => {
  //     setIdentityDocument(event.target.files[0]);
  // };

  function formValidation(item) {
    let formErrors = {};
    let formIsValid = true;

    if (!editData.project_name) {
      formIsValid = false;
      formErrors["project_name"] = true;
    }
    if (!editData.position) {
      formIsValid = false;
      formErrors["position"] = true;
    }
    if (!editData.principal_functions) {
      formIsValid = false;
      formErrors["principal_functions"] = true;
    }
    if (!selectStartDate) {
      formIsValid = false;
      formErrors["start_date"] = true;
    }
    if (!selectEndDate) {
      formIsValid = false;
      formErrors["end_date"] = true;
    }
    setFormErrors(formErrors);
    // console.log("formIsValid: ", formIsValid);
    return formIsValid;
  }

  async function formUpdateData() {
    if (formValidation()) {
      setIsLoading(true);
      let formdataSave = new FormData();
      formdataSave.append(
        "professional_experience_id",
        editData.professional_experience_id
      );
      formdataSave.append("resume_id", editData.resume_id);
      formdataSave.append("project_name", editData.project_name);
      formdataSave.append("position", editData.position);
      formdataSave.append("principal_functions", editData.principal_functions);
      formdataSave.append(
        "start_date",
        moment(selectStartDate).format("DD-MM-YYYY")
      );
      formdataSave.append(
        "finish_date",
        moment(selectEndDate).format("DD-MM-YYYY")
      );
      formdataSave.append("document", identityDocuments);
      const header = { "Content-Type": "multipart/form-data" };
      const { data } = await apiCall(
        "POST",
        ApiEndPoint.UPDATEPROFESSIONALEXPERIENCE,
        formdataSave,
        header
      );
      if (data.status == 200) {
        setIsLoading(false);
        getProfessionalExperienceData();
        props.setEditEduOpen(false);
        successToast(data.message);
      } else {
        errorToast(data.message);
        setIsLoading(false);
      }
    }
  }

  async function handelClickPhotoImg() {
    // photoClickBtn.current?.click()
    document.getElementById("photoSelected").click();
  }
  const onFilechanges = (event) => {
    setIdentityDocuments(event.target.files[0]);
  };
  function cleanField() {
    setEditData({
      ...editData,
      project_name: "",
      position: "",
      principal_functions: "",
      start_date: new Date(),
      finish_date: new Date(),
      certification: "",
    });
    setSelectStartDate(new Date());
    setSelectEndDate(new Date());
    setIdentityDocuments({});
    return true;
  }
  return (
    <div>
      <Modal
        onClose={() => (
          props.setEditEduOpen(false), getProfessionalExperienceData()
        )}
        onOpen={() => props.setEditEduOpen(true)}
        open={props.editEduOpen}
        className="model--div"
      >
        <Modal.Content className="model--containt">
          <Grid className="model--headr">
            <Grid.Column floated="left" width={10}>
              <Header as="h4" className="jura--form-heading" floated="left">
                {" "}
                Editar Experiencia Profesional -{" "}
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
                onClick={() => (
                  props.setEditEduOpen(false), getProfessionalExperienceData(0)
                )}
              >
                X{" "}
              </p>
            </Grid.Column>
          </Grid>

          <Grid style={{ width: "100%", margin: 0 }}>
            <Grid.Column style={{ maxWidth: "99%" }}>
              <Form size="large">
                <Grid columns={4}>
                  <Grid.Row>
                    <Grid.Column>
                      <label>Nombre entidad / Proyecto</label>
                      <Form.Input
                        labelPosition="right"
                        placeholder=""
                        width={60}
                        value={editData?.project_name}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            project_name: e.target.value,
                          })
                        }
                        error={
                          !editData?.project_name && formErrors?.project_name
                        }
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <label>Fecha de inicio</label>
                      <DatePicker
                        onChange={setSelectStartDate}
                        value={selectStartDate}
                        className="date_pkr date_pkr_edit"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <label>Fecha de terminación</label>
                      <DatePicker
                        onChange={setSelectEndDate}
                        value={selectEndDate}
                        className="date_pkr date_pkr_edit"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <label>Cargo / Rol desempeñado</label>
                      <Form.Input
                        type="text"
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            position: e.target.value,
                          })
                        }
                        value={editData?.position}
                        required={true}
                        error={!editData?.position && formErrors?.position}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form className="form--dec-input">
                        <label>Funciones principales</label>
                        <Form.TextArea
                          placeholder=""
                          rows={4}
                          rowsMax={4}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              principal_functions: e.target.value,
                            })
                          }
                          value={editData?.principal_functions}
                          required={true}
                          error={
                            !editData?.principal_functions &&
                            formErrors?.principal_functions
                          }
                        />
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form className="form--dec-input">
                        <Input
                          type="file"
                          id="photoSelected"
                          onChange={(e) => onFilechanges(e)}
                          style={{ display: "none" }}
                        />

                        {/* <Input type="file" onChange={onImageChange} className="filetype" id="group_image" /> */}

                        <label>
                          Adjuntar foto - <small>Opcional</small>
                        </label>
                        <div
                          onClick={() => handelClickPhotoImg()}
                          className="curser-pointer"
                        >
                          <Input
                            label={{ basic: true, content: "Adjuntar" }}
                            labelPosition="right"
                            placeholder=""
                            value={
                              identityDocuments?.name
                                ? identityDocuments?.name
                                : editData?.certification
                            }
                            className="usr--img-input"
                            style={{width:'90%'}}
                          />
                        </div>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid className="form--buton-box form--education mt-1">
                        {/* <span className="link-font-text">Cancelar</span> */}
                        <span
                          onClick={cleanField}
                          href="#"
                          className="link-font-text curser-pointer"
                        >
                          Limpiar campos
                        </span>
                        <Button
                          onClick={() => formUpdateData()}
                          content="Guardar Cambios"
                          className="btn btn-primary fm--btn"
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
